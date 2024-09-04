from .db import db, environment, SCHEMA, add_prefix_for_prod


class Community(db.Model):
  __tablename__='communities'

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(20), nullable=False, unique=True)
  description = db.Column(db.String(100), nullable=False)

  # threads = db.relationship('Thread', back_populates='community')

  def __repr__(self):
    return "<Community(id='%s', name='%s')>" % (
      self.id,
      self.name,
    )
