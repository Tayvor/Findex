from app.models import db, environment, SCHEMA
from app.models.comment import Comment
from sqlalchemy.sql import text


def seed_comments():
  one = Comment(
    content = "comment from user 1 on thread 2",
    user_id = 1,
    thread_id = 2
  )

  two = Comment(
    content = "comment from user 2 on thread 3",
    user_id = 2,
    thread_id = 3
  )

  three = Comment(
    content = "comment from user 3 on thread 1",
    user_id = 3,
    thread_id = 1
  )

  db.session.add(one)
  db.session.add(two)
  db.session.add(three)
  db.session.commit()


def undo_comments():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM comments"))

  db.session.commit()
