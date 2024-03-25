from app.models import db, environment, SCHEMA, Thread
from sqlalchemy.sql import text


def seed_threads():
  demo = Thread(
    title = "What's going on with my fish?",
    description = "Fish have been acting lethargic, and not eating very much. It seems like they aren't feeling well. What can I do?",
    created_at = '2024-02-17 22:40:10.813655',
    community_id = 2,
    user_id = 1
  )

  marnie = Thread(
    title = "5 gal bowl stocking suggestions?",
    description = "I was thinking some shrimp, and maybe a couple gouramis.",
    created_at = '2024-02-17 21:40:10.813655',
    community_id = 6,
    user_id = 2
  )

  bobbie = Thread(
    title = "What is this??",
    description = "All of these tiny worms crawling around on the glass. Friend or foe?",
    created_at = '2024-02-17 19:40:10.813655',
    community_id = 2,
    user_id = 3
  )

  fatherFish = Thread(
    title = "Best Fertilizer?",
    description = "Looking for the best budget-friendly fertilizer, is seachem excel okay?",
    created_at = '2024-02-17 15:40:10.813655',
    community_id = 3,
    user_id = 4
  )

  guppyGal = Thread(
    title = "I need a quiet airpump!",
    description = "My airpump is way to loud. I've tried cleaning it but that doesn't work. Any suggestions?",
    created_at = '2024-02-17 03:40:10.813655',
    community_id = 1,
    user_id = 5
  )

  postMaloney = Thread(
    title = "How to get rid of algae?",
    description = "I have what I assume is hair algae all over my tank decor. I only have lights on 8 hours a day.",
    created_at = '2024-02-16 14:40:10.813655',
    community_id = 3,
    user_id = 6
  )

  finDoctor = Thread(
    title = "Just sharing some of my fish!",
    description = "I have cichlids and killifish. Tank is going on 4 years! Ask me anything!",
    created_at = '2024-02-13 13:40:10.813655',
    community_id = 2,
    user_id = 7
  )

  db.session.add(demo)
  db.session.add(marnie)
  db.session.add(bobbie)
  db.session.add(fatherFish)
  db.session.add(guppyGal)
  db.session.add(postMaloney)
  db.session.add(finDoctor)

  db.session.commit()


def undo_threads():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.threads RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM threads"))

  db.session.commit()
