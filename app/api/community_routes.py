from flask import Blueprint, jsonify
from app.models import db, Community

community_routes = Blueprint('community', __name__)


# GET COMMUNITIES
@community_routes.get('')
def get_communities():
  communities = db.session.scalars(db.select(Community)).all()
  lst = []

  for community in communities:
    community_obj = {
      'id': community.id,
      'name': community.name,
      'description': community.description,
    }
    lst.append(community_obj)

  return jsonify(lst)
