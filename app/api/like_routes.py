from flask import Blueprint, request, jsonify
from app.models import db, Like
from flask_login import current_user, login_required
# from app.forms.like_form import LikeForm

like_routes = Blueprint('like', __name__)


# GET USER LIKES
@like_routes.route('')
@login_required
def get_user_likes():
  user_likes = Like.query.filter_by(user_id=current_user.id).all()
  arr = []

  for like in user_likes:
    arr.append(like.to_dict())

  return arr


# CREATE A LIKE
@like_routes.route('', methods=['POST'])
@login_required
def create_like():
    req = request.get_json()
    type = req['type']
    id = req['id']

    if type == 'thread':
      new_like = Like(
        user_id = current_user.id,
        thread_id = id,
      )
    else:
      new_like = Like(
        user_id = current_user.id,
        comment_id = id,
      )

    db.session.add(new_like)
    db.session.commit()
    return jsonify(new_like.to_dict()), 201


# DELETE LIKE
@like_routes.route('/<int:like_id>', methods=['DELETE'])
@login_required
def delete_like(like_id):
  like = Like.query.get(like_id)

  if like:
    db.session.delete(like)
    db.session.commit()
    return jsonify(like.to_dict()), 204
  else:
    return jsonify({"error": "Item not found."})
