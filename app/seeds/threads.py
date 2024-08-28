from app.models import db, environment, SCHEMA, Thread
from sqlalchemy.sql import text


def seed_threads():
  # General Threads
  demo = Thread(
    title = "Weight of canopy on rimless tank",
    description = """Are there any issues with putting a wood canopy on a rimless tank from a structural support point? For reference the tank is a 25 gallon rimless cube and the canopy weighs about 10 pounds.""",
    created_at = '2024-02-17 22:40:10.813655',
    community_id = 1,
    author_id = 1
  )

  marnie = Thread(
    title = "125 gallon stocking",
    description = """Hello! I have a 125 gallon I started a few months ago, I've been slowly bumping up stocking numbers. It is mostly a rainbow fish tank with a mix of boesmani, turqouse, and yellows. There are also 2 bristlenose pleco and 10 venezualan corydora. I'm interested in adding an electric blue acara to the tank, and while the ones I'm able to get are small now, the corydora are tiny. Do you think a 2 inch acara would eat my corydora or grow much faster than them being a bad combo in the near future? I mostly want this to be a peaceful tank so I don't want to add the acara if it will cause problems for everyone.""",
    created_at = '2024-02-17 23:40:10.813655',
    community_id = 1,
    author_id = 2
  )

  bobbie = Thread(
    title = "Ammonium and Free Ammonia.",
    description = """I got Seachem Ammonia Alert to test for free ammonia. Because I learned that the API test kit test for total ammonia, which is a combination of ammonium and free ammonia. I wanted to test strictly for free ammonia, cause that was significantly more toxic compared to ammonium. So After an hour or so of letting the test sit in the water, the test showed “0.02 < Safe” which meant that my water is nontoxic to fish. But according to the API test kit, it shows I have about 0.25ppm of ammonia or less. (I said or less because its almost yellow, but not quite there.) But the Corydoras still flash, but not significantly. Maybe the API test is detecting ammonium? If so, is ammonium toxic at those levels? Nobody in the tank is acting out of the ordinary, except the dojo loaches but theyre naturally weirdos.""",
    created_at = '2024-02-18 23:40:10.813655',
    community_id = 1,
    author_id = 3
  )


  # Fish Threads
  fatherFish = Thread(
    title = "What is your favorite platy color breed",
    description = "What is your guys favorite platy color breed! Mine is the Beautiful dwarf red coral platys I have!!",
    created_at = '2024-02-15 19:40:10.813655',
    community_id = 2,
    author_id = 4
  )

  wickedCichlid = Thread(
    title = "Baby Ramshorns?",
    description = "I'm new to the group. I have an Amano Shrimp tank. A friend gave me 2 pink & 1 blue Ramshorn snail. I now have a lot of babies..!! I know I've over fed..so I've reduced that. I'm just wandering if these are blue/leopard baby ones? The others are obviously pink ones! Or are they a random different type? I have recently removed 3 small bladder snails which I think arrived on a couple of plants.",
    created_at = '2024-02-25 19:40:10.813655',
    community_id = 2,
    author_id = 9
  )


  # Plant Threads
  finDoctor = Thread(
    title = "Algae carpet",
    description = "Hi all, I bought a new tank last month and would like to grow an algae carpet. I watched a few videos online, it appears the type of algae that will grow will depend on the fish tank parameters and condition. I just noticed a few green dots on my tank walls, I think it is green spot algae. According to my research to have a algae carpet to grow the tank needs to have green water. Some people say I could buy green algae seeds to acelerate the process; I have been reading about algaes and it appears the carpet algae type is called Oedogonium? I could not find any live cultures for sale of this type, however I found on ebay a type of green algae called scenedesmus and also chlorella. Could I use these to create green water in the fish tank, I can't find information regarding toxicity in fish for the scenedesmus type. Does anyone have knowledge regarding this subject? Thank you!!!",
    created_at = '2024-02-27 19:40:10.813655',
    community_id = 3,
    author_id = 7
  )


  # General Threads
  db.session.add(demo)
  db.session.add(marnie)
  db.session.add(bobbie)

  # Fish Threads
  db.session.add(fatherFish)
  db.session.add(wickedCichlid)

  # Plant Threads
  db.session.add(finDoctor)


  db.session.commit()


def undo_threads():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.threads RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM threads"))

  db.session.commit()
