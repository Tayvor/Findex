from flask import Blueprint, request, jsonify
from app.models import db, Like
from flask_login import current_user
# from app.forms.like_form import LikeForm

like_routes = Blueprint('like', __name__)


# CREATE A LIKE
@like_routes.route('', methods=['POST'])
def create_like():
  # new_like = Like(
  #   user_id = 0,
  #   thread_id = 0,
  #   comment_id = 0,
  # )

  # db.session.add(new_like)
  # db.session.commit()

  return jsonify({'greet': 'hello from likes'})


# DELETE LIKE
@like_routes.route('/<int:like_id>', methods=['DELETE'])
def delete_like(like_id):
  like = Like.query.get(like_id)

  if like:
    db.session.delete(like)
    db.session.commit()
    return jsonify(''), 204
  else:
    return jsonify({"error": "Item not found."})
