from flask import Blueprint, request, jsonify
from app.models import db, Image
from flask_login import current_user
from app.forms.image_form import ImageForm
from werkzeug.datastructures import CombinedMultiDict
from app.api.s3_bucket import get_unique_filename, upload_file_to_s3

image_routes = Blueprint('image', __name__)


@image_routes.route('/new', methods=['POST'])
def upload_image():
  form = ImageForm(CombinedMultiDict((request.files, request.form)))
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():

    image = form.data["image"]
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    print(upload)

    if "url" not in upload:
      return jsonify({'error': 'upload failed'}), 500

    url = upload["url"]

    # create new image in table
    new_image = Image(image_url=url, user_id=current_user.id)
    db.session.add(new_image)
    db.session.commit()
    result = new_image.to_dict()

    return jsonify(result)
