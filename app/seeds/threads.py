from app.models import db, environment, SCHEMA
from app.models.thread import Thread
from sqlalchemy.sql import text


def seed_threads():
  one = Thread(
    title = "Help! What's wrong with my fish!?",
    description = "Last night my fish were fine. This morning I wake up to find them all laying on the bottom of  the tank..",
    user_id = 1
  )

  two = Thread(
    title = "5 gal bowl stocking suggestions?",
    description = "I was thinking some shrimp, and maybe a couple gouramis.",
    user_id = 2
  )

  three = Thread(
    title = "What is this??",
    description = "All of these tiny worms crawling around on the glass. Friend or foe?",
    user_id = 3
  )

  db.session.add(one)
  db.session.add(two)
  db.session.add(three)
  db.session.commit()


def undo_threads():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.threads RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM threads"))

  db.session.commit()
