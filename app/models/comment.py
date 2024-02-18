from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
  __tablename__='comments'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.Text, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  thread_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('threads.id')), nullable=False)
  parent_id = db.Column(db.Integer)
  created_at = db.Column(db.String, nullable=False)

  user = db.relationship('User', back_populates='comments')
  likes = db.relationship('Like')

  def to_dict(self):
    return {
			'id': self.id,
      'content': self.content,
			'user_id': self.user_id,
      'thread_id': self.thread_id or 0,
      'parent_id': self.parent_id or 0,
      'created_at': self.created_at
		}
