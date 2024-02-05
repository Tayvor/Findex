from flask import Blueprint, request, jsonify
from app.models import Comment, db
from flask_login import current_user

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

    # for com in comments:
    #   print('User: ', com.user.to_dict())

  # return jsonify([comment.to_dict() for comment in comments])
  return jsonify(comment_list)


# CREATE
# @comment_routes.route('/create', methods=['POST'])
# def create_comment():

#   return jsonify()


# EDIT
# @comment_routes.route('/<int:comment_id>/edit', methods=['PUT'])
# def edit_comment(comment_id):

#   return jsonify()


# DELETE
# @comment_routes.route('/<int:comment_id>/delete', methods=['DELETE'])
# def delete_comment(comment_id):

#   return jsonify()
