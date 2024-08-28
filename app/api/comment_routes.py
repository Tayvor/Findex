from flask import Blueprint, request, jsonify
from app.models import db, Comment
from flask_login import current_user
from app.forms.comment_form import CommentForm
from datetime import datetime

comment_routes = Blueprint('comment', __name__)


# GET COMMENTS BY THREAD ID
@comment_routes.get('/<int:thread_id>')
def get_thread_comments(thread_id):
  query = db.select(Comment).filter_by(thread_id=thread_id)
  comments = db.session.scalars(query)
  comment_list = []

  for comment in comments:
    comm = {
      'id': comment.id,
      'content': comment.content,
      'thread_id': comment.thread_id,
      'user' : comment.user.to_dict(),
      'created_at': comment.created_at,
    }
    comment_list.append(comm)

  return jsonify(comment_list)


# CREATE
@comment_routes.post('/new')
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
@comment_routes.put('/<int:comment_id>/edit')
def edit_comment(comment_id):
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    comment_query = db.select(Comment).filter_by(id=comment_id)
    comment = db.session.scalar(comment_query)
    content = form.data['content']

    setattr(comment, 'content', content)
    db.session.commit()

    comm_with_user = {
      'id': comment.id,
      'content': comment.content,
      'user_id': comment.user_id,
      'thread_id': comment.thread_id,
      'created_at': comment.created_at,
      'user': comment.user.to_dict()
    }

    return jsonify(comm_with_user)

  return jsonify('Bad Data')


# DELETE
@comment_routes.delete('/<int:comment_id>')
def delete_comment(comment_id):
  comment_query = db.select(Comment).filter_by(id=comment_id)
  comment = db.session.scalar(comment_query)

  db.session.delete(comment)
  db.session.commit()

  return jsonify('Deleted')
