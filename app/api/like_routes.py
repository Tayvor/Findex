from flask import Blueprint, request, jsonify
from app.models import db, Thread, User
from flask_login import current_user
# from app.forms.thread_form import ThreadForm
# from app.forms.image_form import ImageForm
from app.api.s3_bucket import get_unique_filename, upload_file_to_s3

like_routes = Blueprint('like', __name__)
