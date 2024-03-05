from .db import db, environment, SCHEMA, add_prefix_for_prod


class Like(db.Model):
  __tablename__='likes'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  thread_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('threads.id')))
  comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')))


  def to_dict(self):
    return {
			'id': self.id,
			'user_id': self.user_id,
      'thread_id': self.thread_id or 0,
      'comment_id': self.comment_id or 0,
		}
