from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
  __tablename__='comments'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.Text, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')))
  thread_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('thread.id')))

  user = db.relationship('User', back_populates='comments', lazy=False)

  def to_dict(self):
    return {
			'id': self.id,
      'content': self.content,
			'user_id': self.user_id
		}
