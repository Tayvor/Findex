from flask import Blueprint, request, jsonify
from app.models import db, Thread, Image, Comment, Like, User
from flask_login import current_user
from app.forms.thread_form import ThreadForm
from app.api.s3_bucket import remove_file_from_s3
from datetime import datetime

thread_routes = Blueprint('thread', __name__)


# GET COMMUNITY THREADS
@thread_routes.get('/<int:community_id>')
def get_threads(community_id):
  get_threads = db.select(Thread).filter_by(community_id=community_id).join(Thread.user)
  threads = db.session.execute(get_threads).scalars()

  thread_list = [thread.to_dict() for thread in threads]
  return thread_list


# CREATE THREAD
@thread_routes.post('/create')
def create_thread():
  thread_form = ThreadForm()
  thread_form['csrf_token'].data = request.cookies['csrf_token']

  if thread_form.validate_on_submit():
    curr_date = datetime.utcnow()

    new_thread = Thread(
      title = thread_form.data['title'],
      description = thread_form.data['description'],
      user_id = current_user.id,
      community_id = thread_form.data['community_id'],
      created_at = curr_date
    )

    db.session.add(new_thread)
    db.session.commit()

    thread_with_user = {
      'id': new_thread.id,
      'community_id': new_thread.community_id,
      'title': new_thread.title,
      'description': new_thread.description,
      'user': new_thread.user.to_dict(),
      'num_comments': 0,
      'num_likes': 0,
      'created_at': new_thread.created_at
    }

    return jsonify(thread_with_user)


# EDIT THREAD
@thread_routes.put('/<int:thread_id_num>/edit')
def edit_thread(thread_id_num):
  form = ThreadForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    thread = Thread.query.get(thread_id_num)
    title = form.data['title']
    description = form.data['description']
    num_comments = Comment.query.filter(Comment.thread_id == thread.id).count()
    num_likes = Like.query.filter(Like.thread_id == thread.id).count()

    setattr(thread, 'title', title)
    setattr(thread, 'description', description)

    db.session.commit()

    thread_with_user = {
      'id': thread.id,
      'community_id': thread.community_id,
      'title': thread.title,
      'description': thread.description,
      'num_comments': num_comments,
      'num_likes': num_likes,
      'user': thread.user.to_dict(),
      'created_at': thread.created_at,
    }

    return jsonify(thread_with_user)

  return jsonify('Bad Data')


# DELETE THREAD
@thread_routes.delete('/<int:thread_id_num>')
def delete_thread(thread_id_num):
  thread = Thread.query.get(thread_id_num)
  images = Image.query.filter_by(thread_id=thread_id_num).first()
  comments = Comment.query.filter_by(thread_id=thread_id_num).all()

  # Delete images from s3 bucket
  if images:
    url = images.image_url
    remove_file_from_s3(url)

  # Delete comments
  for comment in comments:
    db.session.delete(comment)

  db.session.delete(thread)
  db.session.commit()

  return jsonify(''), 204
