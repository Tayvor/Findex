from flask import Blueprint, request, jsonify
from app.models import Comment, db
from flask_login import current_user

comment_routes = Blueprint('comment', __name__)


@comment_routes.route('')
def get_thread_comments():
  comments = Comment.query.all()

  for comment in comments:
    print('***', comment)

  return jsonify()
