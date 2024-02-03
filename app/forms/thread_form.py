from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Thread


class ThreadForm(FlaskForm):
  title = StringField('title', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  # user_id = IntegerField('user_id', validators=[DataRequired()])
