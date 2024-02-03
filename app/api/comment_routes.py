from flask import Blueprint, request, jsonify
from app.models import Comment, db
from flask_login import current_user

comment_routes = Blueprint('comment', __name__)


# GET COMMENTS BY THREAD ID
@comment_routes.route('/thread_id')
def get_thread_comments(thread_id):
  comments = Comment.query.filter(Comment.thread_id == thread_id)

  print('00000000000000        0000000000000000')

  return jsonify([comment.to_dict() for comment in comments])


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
