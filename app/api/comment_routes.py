from flask import Blueprint, request, jsonify
from app.models import Comment, db
from flask_login import current_user
from app.forms.comment_form import CommentForm

comment_routes = Blueprint('comment', __name__)


# GET COMMENTS BY THREAD ID
@comment_routes.route('/<int:thread_id>')
def get_thread_comments(thread_id):
  comments = Comment.query.filter(Comment.thread_id == thread_id)
  comment_list = []

  for comment in comments:
    comm = {
      'id': comment.id,
      'content': comment.content,
      'user_id': comment.user_id,
      'thread_id': comment.thread_id,
      'user' : comment.user.to_dict(),
    }
    comment_list.append(comm)

  return jsonify(comment_list)


# CREATE
@comment_routes.route('/new', methods=['POST'])
def create_comment():
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_comment = Comment(
      content = form.data['content'],
      thread_id = form.data['thread_id'],
      user_id = current_user.id,
    )

  db.session.add(new_comment)
  db.session.commit()

  comm_with_user = {
    'id': new_comment.id or 1,
    'content': new_comment.content,
    'user_id': new_comment.user_id,
    'thread_id': new_comment.thread_id,
    'user': new_comment.user.to_dict()
  }

  return jsonify(comm_with_user)


# EDIT
# @comment_routes.route('/<int:comment_id>/edit', methods=['PUT'])
# def edit_comment(comment_id):

#   return jsonify()


# DELETE
# @comment_routes.route('/<int:comment_id>/delete', methods=['DELETE'])
# def delete_comment(comment_id):

#   return jsonify()
