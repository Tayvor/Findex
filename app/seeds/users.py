from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    fatherFish = User(
        username='fatherFish', email='fatherFish@aa.io', password='password')
    guppyGal = User(
        username='guppyGal', email='guppyGal@aa.io', password='password')
    postMaloney = User(
        username='postMaloney', email='postMaloney@aa.io', password='password')
    finDoctor = User(
        username='finDoctor', email='finDoctor@aa.io', password='password')
    sharkTank = User(
        username='sharkTank', email='sharkTank@aa.io', password='password')
    wickedCichlid = User(
        username='wickedCichlid', email='wickedCichlid@aa.io', password='password')
    redFishBlueFish = User(
        username='redFishBlueFish', email='redFishBlueFish@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(fatherFish)
    db.session.add(guppyGal)
    db.session.add(postMaloney)
    db.session.add(finDoctor)
    db.session.add(sharkTank)
    db.session.add(wickedCichlid)
    db.session.add(redFishBlueFish)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
