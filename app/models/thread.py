from .db import db, environment, SCHEMA, add_prefix_for_prod


class Thread(db.Model):
  __tablename__='threads'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.Text, nullable=False)
  created_at = db.Column(db.String, nullable=False)

  # author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  # community_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('communities.id')))

  # author = db.relationship('User', back_populates='threads', lazy='joined', innerjoin=True)
  # comments = db.relationship('Comment', back_populates='thread', cascade='all, delete-orphan' )
  # community = db.relationship('Community', back_populates='threads')
  # image = db.relationship('Image', cascade='all, delete-orphan')

  def to_dict(self):
    return {
			'id': self.id,
			'title': self.title,
      'description': self.description,
			# 'author_id': self.author_id,
      # 'community_id': self.community_id,
      'created_at': self.created_at,
      # 'author': self.author.to_dict(),
		}
