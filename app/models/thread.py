from .db import db, environment, SCHEMA, add_prefix_for_prod


class Thread(db.Model):
  __tablename__='threads'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.Text, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  community_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('communities.id')))
  created_at = db.Column(db.String, nullable=False)

  user = db.relationship('User', back_populates='threads')
  communities = db.relationship('Community', back_populates='threads')
  images = db.relationship('Image', cascade='all, delete-orphan')
  likes = db.relationship('Like')

  def to_dict(self):
    return {
			'id': self.id,
			'title': self.title,
      'description': self.description,
			'user_id': self.user_id,
      'community_id': self.community_id,
      'created_at': self.created_at,
      'user': self.user.to_dict()
		}
