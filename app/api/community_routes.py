from flask import Blueprint, request, jsonify
from app.models import db, Community
from flask_login import current_user

community_routes = Blueprint('community', __name__)


# GET COMMUNITIES
@community_routes.route('')
def get_communities():
  communities = Community.query.all()
  lst = []

  for community in communities:
    community_obj = {
      'id': community.id,
      'name': community.name,
      'description': community.description,
    }
    lst.append(community_obj)

  return jsonify(lst)
