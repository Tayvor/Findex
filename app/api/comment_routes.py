from flask import Blueprint, request, jsonify
from app.models import db, Comment, Like
from flask_login import current_user
from app.forms.comment_form import CommentForm
from datetime import datetime

comment_routes = Blueprint('comment', __name__)


# GET COMMENTS BY THREAD ID
@comment_routes.route('/<int:thread_id>')
def get_thread_comments(thread_id):
  comments = Comment.query.filter(Comment.thread_id == thread_id)
  comment_list = []

  for comment in comments:
    num_likes = Like.query.filter(Like.comment_id == comment.id).count()

    comm = {
      'id': comment.id,
      'content': comment.content,
      'user_id': comment.user_id,
      'thread_id': comment.thread_id,
      'user' : comment.user.to_dict(),
      'num_likes': num_likes,
      'created_at': comment.created_at,
    }
    comment_list.append(comm)

  return jsonify(comment_list)


# CREATE
@comment_routes.route('/new', methods=['POST'])
def create_comment():
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    curr_date = datetime.utcnow()

    new_comment = Comment(
      content = form.data['content'],
      thread_id = form.data['thread_id'],
      user_id = current_user.id,
      created_at = curr_date
    )

  db.session.add(new_comment)
  db.session.commit()

  comm_with_user = {
    'id': new_comment.id or 1,
    'content': new_comment.content,
    'user_id': new_comment.user_id,
    'thread_id': new_comment.thread_id,
    'created_at': new_comment.created_at,
    'user': new_comment.user.to_dict()
  }

  return jsonify(comm_with_user)


# EDIT
@comment_routes.route('/<int:comment_id>/edit', methods=['PUT'])
def edit_comment(comment_id):
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    old_comment = Comment.query.get(comment_id)
    content = form.data['content']

    setattr(old_comment, 'content', content)

    db.session.commit()

    comm_with_user = {
      'id': old_comment.id,
      'content': old_comment.content,
      'user_id': old_comment.user_id,
      'thread_id': old_comment.thread_id,
      'created_at': old_comment.created_at,
      'user': old_comment.user.to_dict()
    }

    return jsonify(comm_with_user)

  return jsonify('Bad Data')



# DELETE
@comment_routes.route('/<int:comment_id>/delete', methods=['DELETE'])
def delete_comment(comment_id):
  comment = Comment.query.get(comment_id)

  db.session.delete(comment)
  db.session.commit()

  return jsonify('Deleted')
