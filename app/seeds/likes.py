from app.models import db, environment, SCHEMA, Like
from sqlalchemy.sql import text


def seed_likes():
  threadLike1 = Like(
    user_id = 2,
    thread_id = 1,
  )

  threadLike2 = Like(
    user_id = 3,
    thread_id = 1,
  )

  threadLike3 = Like(
    user_id = 4,
    thread_id = 1,
  )

  commentLike1 = Like(
    user_id = 1,
    comment_id = 3,
  )

  commentLike2 = Like(
    user_id = 7,
    comment_id = 4,
  )

  commentLike3 = Like(
    user_id = 2,
    comment_id = 3,
  )

  commentLike4 = Like(
    user_id = 3,
    comment_id = 3,
  )

  db.session.add(threadLike1)
  db.session.add(threadLike2)
  db.session.add(threadLike3)
  db.session.add(commentLike1)
  db.session.add(commentLike2)
  db.session.add(commentLike3)
  db.session.add(commentLike4)

  db.session.commit()


def undo_likes():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM likes"))

  db.session.commit()
