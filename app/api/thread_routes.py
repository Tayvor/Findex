from flask import Blueprint, request, jsonify
from app.models import db, Thread, User, Image
from flask_login import current_user
from app.forms.thread_form import ThreadForm
from app.forms.image_form import ImageForm
from app.api.s3_bucket import get_unique_filename, upload_file_to_s3, remove_file_from_s3

thread_routes = Blueprint('thread', __name__)


# GET ALL THREADS
@thread_routes.route('')
def get_threads():
  threads = Thread.query.all()
  thread_list = []

  for thread in threads:
    item = {
			'id': thread.id,
			'title': thread.title,
      'description': thread.description,
			'user_id': thread.user_id,
      'user': thread.user.to_dict()
		}
    thread_list.append(item)

  return jsonify(thread_list)


# CREATE THREAD
@thread_routes.route('/create', methods=['POST'])
def create_thread():
  thread_form = ThreadForm()
  thread_form['csrf_token'].data = request.cookies['csrf_token']

  if thread_form.validate_on_submit():
    new_thread = Thread(
      title = thread_form.data['title'],
      description = thread_form.data['description'],
      user_id = current_user.id
    )

  db.session.add(new_thread)
  db.session.commit()

  return jsonify(new_thread.to_dict())


# EDIT THREAD
@thread_routes.route('/<int:thread_id_num>/edit', methods=['PUT'])
def edit_thread(thread_id_num):
  form = ThreadForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    thread = Thread.query.get(thread_id_num)
    title = form.data['title']
    description = form.data['description']

    setattr(thread, 'title', title)
    setattr(thread, 'description', description)

    db.session.commit()

    return jsonify([thread.to_dict()])

  return jsonify('Bad Data')


# DELETE THREAD
@thread_routes.route('/<int:thread_id_num>/delete', methods=['DELETE'])
def delete_thread(thread_id_num):
  thread = Thread.query.get(thread_id_num)
  images = Image.query.filter_by(thread_id=thread_id_num).all()

  # Delete images from s3 bucket
  for image in images:
    url = image.image_url
    remove_file_from_s3(url)

  db.session.delete(thread)
  db.session.commit()

  return jsonify('Deleted')
