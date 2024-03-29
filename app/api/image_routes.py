from flask import Blueprint, request, jsonify
from app.models import db, Image
from flask_login import current_user
from app.forms.image_form import ImageForm
from werkzeug.datastructures import CombinedMultiDict
from app.api.s3_bucket import get_unique_filename, upload_file_to_s3, remove_file_from_s3

image_routes = Blueprint('image', __name__)


# GET IMAGES BY THREAD ID
@image_routes.route('/<int:thread_id_num>')
def get_images(thread_id_num):
  images = Image.query.filter_by(thread_id=thread_id_num).all()
  image_list = []

  for image in images:
    img = {
      'id': image.id,
      'url': image.image_url,
      'thread_id': image.thread_id,
      'user_id': image.user_id,
    }
    image_list.append(img)

  return jsonify(image_list)


# ADD IMAGE
@image_routes.route('/new', methods=['POST'])
def upload_image():
  form = ImageForm(CombinedMultiDict((request.files, request.form)))
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    # upload to s3 bucket
    image = form.data["image"]
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    # print(upload)
    # print('**********************                *****************************')
    # print('**********************                *****************************')

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
@image_routes.route('/delete', methods=['DELETE'])
def remove_image():

  # img = Image.query.get(1)
  # print('******** ********* ******************')
  # print('******** ********* ******************')
  # print(img.to_dict())
  # remove_file_from_s3('image_url')

  return jsonify('hello')
