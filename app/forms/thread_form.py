from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class ThreadForm(FlaskForm):
  title = StringField('title', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  community_id = IntegerField('community_id', validators=[DataRequired()])
