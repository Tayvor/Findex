from .db import db, environment, SCHEMA, add_prefix_for_prod
from pytz import timezone
import datetime


class Thread(db.Model):
  __tablename__='threads'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.Text, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

  created_at = db.Column(db.DateTime, default=datetime.datetime.now())

  user = db.relationship('User', back_populates='threads')
  images = db.relationship('Image', cascade='all, delete-orphan')
  likes = db.relationship('Like')

  def to_dict(self):
    return {
			'id': self.id,
			'title': self.title,
      'description': self.description,
			'user_id': self.user_id
		}

  UTC = timezone('UTC')

  def time_now():
    return datetime.datetime.utcnow()
