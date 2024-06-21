from flask import Blueprint, request, jsonify
from app.models import db, Image
from flask_login import current_user
from app.forms.image_form import ImageForm
from werkzeug.datastructures import CombinedMultiDict
from app.api.s3_bucket import get_unique_filename, upload_file_to_s3, remove_file_from_s3

image_routes = Blueprint('image', __name__)


# GET IMAGE BY THREAD ID
@image_routes.get('/<int:thread_id_num>')
def get_image(thread_id_num):
  image_query = db.select(Image).filter_by(thread_id=thread_id_num)
  image = db.session.scalar(image_query)

  if not image:
    return {'error': 'No image found.'}

  img = {
    'id': image.id,
    'image_url': image.image_url,
    'user_id': image.user_id,
    'thread_id': image.thread_id
    }

  return img


# ADD IMAGE
@image_routes.post('/new')
def upload_image():
  form = ImageForm(CombinedMultiDict((request.files, request.form)))
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    # upload to s3 bucket
    image = form.data["image"]
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if "url" not in upload:
      return jsonify({'error': 'upload failed'}), 500

    url = upload["url"]

    # add image url and thread_id to Images table
    new_image = Image(
      image_url=url,
      user_id=current_user.id,
      thread_id=form.data['thread_id']
    )

    db.session.add(new_image)
    db.session.commit()

    return jsonify(new_image.to_dict())


# REMOVE IMAGE
@image_routes.delete('/<file_name>')
def remove_image(file_name):
  # remove image instance from model
  image = Image.query.filter(Image.image_url.endswith(file_name)).first()

  db.session.delete(image)
  db.session.commit()

  # remove image from aws
  remove_file_from_s3(file_name)

  return {'thread_id': image.thread_id}
