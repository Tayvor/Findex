from flask import Blueprint, request, jsonify
from app.models import db, Thread, User
from flask_login import current_user
from sqlalchemy import update
from app.forms.thread_form import ThreadForm

thread_routes = Blueprint('thread', __name__)


# GET ALL THREADS
@thread_routes.route('')
def get_threads():
  threads = Thread.query.all()

  return jsonify([thread.to_dict() for thread in threads])


# EDIT A THREAD
@thread_routes.route('/<int:thread_id>/edit', methods=['PUT'])
def edit_thread(thread_id):
  form = ThreadForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    thread = Thread.query.get(thread_id)
    title = form.data['title']
    description = form.data['description']

    setattr(thread, 'title', title)
    setattr(thread, 'description', description)

    db.session.commit()

    return jsonify([thread.to_dict()])

  return jsonify('Bad Data')


# GET THREAD BY ID
@thread_routes.route('/:thread_id')
def get_thread_by_id(thread):

  return jsonify()
