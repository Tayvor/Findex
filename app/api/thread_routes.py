from flask import Blueprint, request, jsonify
from app.models import db, Thread, User
from flask_login import current_user
from sqlalchemy import update

thread_routes = Blueprint('thread', __name__)


# GET ALL THREADS
@thread_routes.route('')
def get_threads():
  threads = Thread.query.all()

  return jsonify([thread.to_dict() for thread in threads])


# EDIT A THREAD
@thread_routes.route('/<int:thread_id>/edit', methods=['PUT'])
def edit_thread(thread_id):
  thread = Thread.query.get(thread_id)
  # print('whoop whoop!', thread_id)

  return jsonify([thread.to_dict()])


# GET THREAD BY ID
@thread_routes.route('/:thread_id')
def get_thread_by_id(thread_id):
  title = request.form.get('title')
  desc = request.form.get('desc')
  id = request.form.get('id')

  update_thread = update(Thread).where(Thread.c.id == id).values(title=title, description=desc)

  db.session.execute(update_thread)
  db.session.commit()

  thread = Thread.query.get(id)
  print('***', thread, '***')
  return jsonify(list(thread.to_dict()))
