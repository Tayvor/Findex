from flask import Blueprint, request, jsonify
from app.models import db, Thread, User
from flask_login import current_user

thread_routes = Blueprint('thread', __name__)


@thread_routes.route('')
def get_threads():
  threads = Thread.query.all()

  return jsonify([thread.to_dict() for thread in threads])


@thread_routes.route('/:thread_id')
def get_thread_by_id(thread_id):
  thread = Thread.query.get(thread_id)

  return jsonify([thread.to_dict()])
