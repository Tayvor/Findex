from app.models import db, environment, SCHEMA, Like
from sqlalchemy.sql import text


def seed_likes():
  threadLike_1 = Like(user_id = 2, thread_id = 1)

  threadLike_2 = Like(user_id = 3, thread_id = 2)
  threadLike_3 = Like(user_id = 4, thread_id = 2)
  threadLike_4 = Like(user_id = 5, thread_id = 2)

  threadLike_5 = Like(user_id = 5, thread_id = 3)

  threadLike_6 = Like(user_id = 6, thread_id = 4)
  threadLike_7 = Like(user_id = 1, thread_id = 4)
  threadLike_8 = Like(user_id = 7, thread_id = 4)
  threadLike_9 = Like(user_id = 9, thread_id = 4)


  commentLike_1 = Like(user_id = 1, comment_id = 1)

  commentLike_2 = Like(user_id = 2, comment_id = 3)
  commentLike_3 = Like(user_id = 2, comment_id = 5)
  commentLike_4 = Like(user_id = 4, comment_id = 3)
  commentLike_5 = Like(user_id = 4, comment_id = 5)
  commentLike_6 = Like(user_id = 5, comment_id = 3)
  commentLike_7 = Like(user_id = 5, comment_id = 4)
  commentLike_8 = Like(user_id = 5, comment_id = 5)
  commentLike_9 = Like(user_id = 5, comment_id = 7)

  commentLike_10 = Like(user_id = 3, comment_id = 10)


  db.session.add(threadLike_1)
  db.session.add(threadLike_2)
  db.session.add(threadLike_3)
  db.session.add(threadLike_4)
  db.session.add(threadLike_5)
  db.session.add(threadLike_6)
  db.session.add(threadLike_7)
  db.session.add(threadLike_8)
  db.session.add(threadLike_9)

  db.session.add(commentLike_1)
  db.session.add(commentLike_2)
  db.session.add(commentLike_3)
  db.session.add(commentLike_4)
  db.session.add(commentLike_5)
  db.session.add(commentLike_6)
  db.session.add(commentLike_7)
  db.session.add(commentLike_8)
  db.session.add(commentLike_9)
  db.session.add(commentLike_10)


  db.session.commit()


def undo_likes():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM likes"))

  db.session.commit()
