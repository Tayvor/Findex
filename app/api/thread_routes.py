from flask import Blueprint, request, jsonify
from app.models import db, Thread, User
from flask_login import current_user
from app.forms.thread_form import ThreadForm

thread_routes = Blueprint('thread', __name__)


# GET ALL
@thread_routes.route('')
def get_threads():
  threads = Thread.query.all()

  return jsonify([thread.to_dict() for thread in threads])


# CREATE
@thread_routes.route('/create', methods=['POST'])
def create_thread():
  form = ThreadForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_thread = Thread(
      title = form.data['title'],
      description = form.data['description'],
      user_id = current_user.id
    )

  db.session.add(new_thread)
  db.session.commit()

  return jsonify([new_thread.to_dict()])


# EDIT
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


# DELETE
@thread_routes.route('/<int:thread_id>/delete', methods=['DELETE'])
def delete_thread(thread_id):
  thread = Thread.query.get(thread_id)

  db.session.delete(thread)
  db.session.commit()

  return jsonify('Deleted')
