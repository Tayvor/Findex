from app.models import db, environment, SCHEMA, Community
from sqlalchemy.sql import text


def seed_communities():
  general = Community(name='General', description='For all things aquatic in nature!')
  fish = Community(name='Fish', description='Fish, snails, and the like!')
  plants = Community(name='Plants', description='Plants, algae, fertilizers, etc!')
  diseases = Community(name='Diseases', description='Sick fish? Post here!')

  db.session.add(general)
  db.session.add(fish)
  db.session.add(plants)
  db.session.add(diseases)

  db.session.commit()


def undo_communities():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.communities RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM communities"))

  db.session.commit()
