from flask import Blueprint, request, jsonify
from app.models import Thread, db
from flask_login import current_user

thread_routes = Blueprint('thread', __name__)


@thread_routes.route('')
def get_threads():
  threads = Thread.query.all()

  for thread in threads:
    print('***', thread)

  return jsonify()
