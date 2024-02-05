from app.models import db, environment, SCHEMA, Thread
# from app.models.thread import Thread
from sqlalchemy.sql import text


def seed_threads():
  demo = Thread(
    title = "Help! What's wrong with my fish!?",
    description = "Last night my fish were fine. This morning I wake up to find them all laying on the bottom of the tank..",
    user_id = 1
  )

  marnie = Thread(
    title = "5 gal bowl stocking suggestions?",
    description = "I was thinking some shrimp, and maybe a couple gouramis.",
    user_id = 2
  )

  bobbie = Thread(
    title = "What is this??",
    description = "All of these tiny worms crawling around on the glass. Friend or foe?",
    user_id = 3
  )

  fatherFish = Thread(
    title = "Best Fertilizer?",
    description = "Looking for the best budget-friendly fertilizer, is seachem excel okay?",
    user_id = 4
  )

  guppyGal = Thread(
    title = "I need a quiet airstone!",
    description = "My airstone is way to loud. I've tried cleaning it but that doesn't work. Any suggestions?",
    user_id = 5
  )

  postMaloney = Thread(
    title = "How to get rid of algae?",
    description = "I have what I assume is hair algae all over my tank decor. I only have lights on 8 hours a day.",
    user_id = 6
  )

  finDoctor = Thread(
    title = "Just sharing some of my fish!",
    description = "I have cichlids and killifish. Tank is going on 4 years! Ask me anything!",
    user_id = 7
  )

  db.session.add(demo)
  db.session.add(marnie)
  db.session.add(bobbie)
  db.session.add(fatherFish)
  db.session.add(guppyGal)
  db.session.add(postMaloney)
  db.session.add(finDoctor)
  # db.session.add(sharkTank)
  # db.session.add(wickedCichlid)
  # db.session.add(redFishBlueFish)
  db.session.commit()


def undo_threads():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.threads RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM threads"))

  db.session.commit()
