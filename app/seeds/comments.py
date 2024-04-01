from app.models import db, environment, SCHEMA, Comment
from sqlalchemy.sql import text


def seed_comments():
  # Demo's thread - comments
  marnie_1 = Comment(
    content = """No problem on a rimmed tank. I assume you are just dressing up the tank top to hide the cover and light?""",
    user_id = 2,
    thread_id = 1,
    created_at = '2024-02-17 22:45:10.813655',
  )

  demo_1 = Comment(
    content = "Yep, will cover the lid, lights, filter tubes, cords and water line",
    user_id = 1,
    thread_id = 1,
    created_at = '2024-02-17 22:45:10.813655',
  )


  # marnie's thread - comments
  bobbie_1 = Comment(
    content = """Hello and yes blue acara is a great choice but the smaller corys can become food sadly, what kind of corydora? The ones that get bigger might be fine for the future but now if they are 2 inches, I do not recommend.""",
    user_id = 3,
    thread_id = 2,
    created_at = '2024-02-17 22:45:10.813655',
  )

  marnie_2 = Comment(
    content = """They are orange Venezuelan corydora, the corys themselves are probably around a half inch or so right now. I think Venezuelans get to be around 2 inches, not the biggest species if I'm thinking correctly.""",
    user_id = 2,
    thread_id = 2,
    created_at = '2024-02-17 22:47:10.813655',
  )

  bobbie_2 = Comment(
    content = """If that small, I personally would not go for the acara, if you already have the corys that is.""",
    user_id = 3,
    thread_id = 2,
    created_at = '2024-02-17 22:48:10.813655',
  )

  marnie_3 = Comment(
    content = """I agree, thanks for your thoughts. I might do an apistograma instead but might just stick to the rainbows and corydora.""",
    user_id = 2,
    thread_id = 2,
    created_at = '2024-02-17 22:49:10.813655',
  )

  fatherFish_1 = Comment(
    content = """If you want to get an acara type then look at the Laetacara araguiae or curviceps. They stay small would not be an issue for your corys.""",
    user_id = 4,
    thread_id = 2,
    created_at = '2024-02-17 22:50:10.813655',
  )

  guppyGal_1 = Comment(
    content = """If you have another tank you could move the corys there to grow up some. I've put pretty small cories in with my full grown rams and they haven't bothered them. I've not had EBA ever, but I will say that fish that "grow up" together seem to be pretty tolerant of each other in my experience. If you get a small EBA and it's not big enough to bother the corys initiallly, it might just accept them. Of course with cichlids, every day is a roll of the dice for some behaviors, so take that with the grain of salt.""",
    user_id = 5,
    thread_id = 2,
    created_at = '2024-02-17 22:52:10.813655',
  )

  marnie_4 = Comment(
    content = """I appreciate the info, at the moment my other tanks are pretty capped out, I could get another tank but trying to chase the 10 small cory across a 6 ft tank would be pretty difficult I'm thinking as long as they are doing okay no need to stir the pot. I'm sure I'll find another chance to get an acara in the future, I wanted to jump on the opportunity because frankly my local options are terrible, but not worth rushing into.""",
    user_id = 2,
    thread_id = 2,
    created_at = '2024-02-17 22:55:10.813655',
  )


  # bobbie's thread - comments
  guppyGal_2 = Comment(
    content = """The ammonia to ammonium ratio is down to ph and temperature the higher the temperature and ph the more ammonia you can find all kinds is charts on this""",
    user_id = 5,
    thread_id = 3,
    created_at = '2024-02-18 23:47:10.813655',
  )

  bobbie_3 = Comment(
    content = """The Ph in my tank is 7.4 and the temp is roughly 22C. So the percentage of un-ionized ammonia (free ammonia) would be around 1.14%""",
    user_id = 3,
    thread_id = 3,
    created_at = '2024-02-18 23:48:10.813655',
  )

  guppyGal_3 = Comment(
    content = """Yep in theory""",
    user_id = 5,
    thread_id = 3,
    created_at = '2024-02-18 23:50:10.813655',
  )


  # fatherFish's thread - comments
  postMaloney_1 = Comment(
    content = """I like wild type platys just beautiful colours""",
    user_id = 6,
    thread_id = 4,
    created_at = '2024-02-15 20:30:10.813655',
  )

  demo_2 = Comment(
    content = """Teacup Fireball Platys - I have 7 in quarantine.""",
    user_id = 1,
    thread_id = 4,
    created_at = '2024-02-15 20:32:10.813655',
  )

  finDoctor_1 = Comment(
    content = """My current favorite is the red-tailed dalmatian platy, because I love calico/koi colored fish.""",
    user_id = 7,
    thread_id = 4,
    created_at = '2024-02-15 20:33:10.813655',
  )

  wickedCichlid_1 = Comment(
    content = """Hi, Im pretty sure a teacup fireball platy and a dwarf red coral platy are the same!""",
    user_id = 9,
    thread_id = 4,
    created_at = '2024-02-15 20:34:10.813655',
  )


  # wickedCichlid's thread - comments
  finDoctor_2 = Comment(
    content = """If you want a natural way of keeping them in check, put 1 or 2 assassin snails in the tank""",
    user_id = 7,
    thread_id = 5,
    created_at = '2024-02-25 20:34:10.813655',
  )



  # Demo's thread
  db.session.add(marnie_1)
  db.session.add(demo_1)

  # marnie's thread
  db.session.add(bobbie_1)
  db.session.add(marnie_2)
  db.session.add(bobbie_2)
  db.session.add(marnie_3)
  db.session.add(fatherFish_1)
  db.session.add(guppyGal_1)
  db.session.add(marnie_4)

  # bobbie's thread
  db.session.add(guppyGal_2)
  db.session.add(bobbie_3)
  db.session.add(guppyGal_3)

  # fatherFish's thread
  db.session.add(postMaloney_1)
  db.session.add(demo_2)
  db.session.add(finDoctor_1)
  db.session.add(wickedCichlid_1)

  # wickedCichlid's thread
  db.session.add(finDoctor_2)

  db.session.commit()


def undo_comments():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM comments"))

  db.session.commit()
