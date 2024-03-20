from app.models import db, environment, SCHEMA, Community
from sqlalchemy.sql import text


def seed_communities():
  general = Community(name='General', description='For all things aquatic in nature!')
  fauna = Community(name='Fauna', description='Aquatic animal life incoming!')
  flora = Community(name='Flora', description='Plants, algae, fertilizers, etc!')
  diseases = Community(name='Diseases', description='Sick fish? We can help!')
  breeding = Community(name='Breeding', description="How To's, advice, and best practices for breeding!")
  stocking = Community(name='Stocking', description='Which fish, and how many should go in your tank? Start here!')

  db.session.add(general)
  db.session.add(fauna)
  db.session.add(flora)
  db.session.add(diseases)
  db.session.add(breeding)
  db.session.add(stocking)

  db.session.commit()


def undo_communities():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.communities RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM communities"))

  db.session.commit()
