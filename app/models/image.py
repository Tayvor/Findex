from .db import db, environment, SCHEMA, add_prefix_for_prod


class Image(db.Model):
  __tablename__='images'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  image_url = db.Column(db.String, nullable=False)
  thread_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('threads.id')), nullable=False)


  def to_dict(self):
    return {
			'id': self.id,
      'image_url': self.image_url,
      'thread_id': self.thread_id,
		}
