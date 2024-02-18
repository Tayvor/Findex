from app.models import db, environment, SCHEMA, Comment
from sqlalchemy.sql import text


def seed_comments():
  demo_1 = Comment(
    content = "5 gal is wayyyy too small for a gouramis. I'd keep it a shrimp tank only, or a betta tank.",
    user_id = 1,
    thread_id = 2,
    created_at = '2024-02-17 22:35:10.813655',
  )

  finDoctor_1 = Comment(
    content = "How do your parameters look?",
    user_id = 7,
    thread_id = 1,
    created_at = '2024-02-17 22:45:10.813655',
  )

  demo_2 = Comment(
    content = "Right now it's 0 ammonia, 5 nitrites, and 0 nitrates.",
    user_id = 1,
    thread_id = 1,
    created_at = '2024-02-17 22:47:10.813655',
  )

  finDoctor_2 = Comment(
    content = "Nitrites are high. They should be 0! I'd do a 50% water change and then test again tomorrow. Repeat every couple days or so until everything besides nitrates reads 0.",
    user_id = 7,
    thread_id = 1,
    created_at = '2024-02-17 23:06:10.813655',
  )

  demo_3 = Comment(
    content = "Thank you!! Doing a water change now!",
    user_id = 1,
    thread_id = 1,
    created_at = '2024-02-17 23:22:10.813655',
  )


  # thread 1
  db.session.add(finDoctor_1)
  db.session.add(demo_2)
  db.session.add(finDoctor_2)
  db.session.add(demo_3)

  # thread 2
  db.session.add(demo_1)


  db.session.commit()


def undo_comments():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM comments"))

  db.session.commit()
