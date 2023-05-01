from app import app
from models import db, User, Video


with app.app_context(): 


    Video.query.delete()
    db.session.commit()

    v1 = Video(
        name= 'Fascinating deep-sea animals',
        link= 'https://www.youtube.com/watch?v=ryRcPeOM1sY&pp=ygUTZGVlcCBzZWEgY3JlYXR1cmVzIA%3D%3D', 
        description='10 minutes of the most amazing deep sea animals that you will ever see! Oh boy howdy you better buckle up because this is a REAL treat we have for ya today',
        user_id= 1 )

    v2 = Video(
        name= '9 Otherworldly ROV Encounters',
        link= 'https://www.youtube.com/watch?v=XAxJiJidnlU', 
        description='In the 7+ years of Deepsea Oddities videos, the channel has covered a staggering array of fascinating marine life. These are 9 deep ocean dwellers that I wanted to revisit, especially for all new subscribers. The information in this video is new and a key piece of footage featured on this channel years ago has been significantly extended, setting this countdown apart from previous uploads.',
        user_id= 1 )

    v3 = Video(
        name= 'Our Planet | High Seas',
        link= 'https://www.youtube.com/watch?v=9FqwhW0B3tY', 
        description="Experience our planet's natural beauty and examine how climate change impacts all living creatures in this ambitious documentary of spectacular scope. In this episode:  Venture into the deep, dark and desolate oceans that are home to an abundance of beautiful -- and downright strange -- creatures.",
        user_id= 1 )

    v4 = Video(
        name= "The Deadly Porguguese Man O'War",
        link= 'https://www.youtube.com/watch?v=aIovmgzyuL0', 
        description="The Deadly Portuguese Man O' War | Blue Planet II | BBC Earth - YouTube",
        user_id= 1 )

    v5 = Video(
        name= 'Crab vs Eel vs Octopus',
        link= 'https://www.youtube.com/watch?v=k7cGyYaxUnI', 
        description='10 minutes of the most amazing deep sea animals that you will ever see! Oh boy howdy you better buckle up because this is a REAL treat we have for ya today',
        user_id= 1 )

    v6 = Video(
        name= 'Amazing Clownfish Teamwork',
        link= 'https://www.youtube.com/watch?v=rn6R4ncd2OU', 
        description='A family of saddleback clownfish have found an excellent home, however, they need a place to lay their eggs.',
        user_id= 2 )

    v7 = Video(
        name= 'The Amazing Life Cycle of a Clownfish',
        link= 'https://www.youtube.com/watch?v=lgUFkM34R7U', 
        description='Watch these baby clownfish hatch and grow their very first stripes!',
        user_id= 2 )

    v8 = Video(
        name= 'What is a Puffer Fish',
        link= 'https://www.youtube.com/watch?v=TkrSy3p40d4', 
        description='The Puffer Fish, also known as the Blow fish is a fish that can blow up or puff up and deflate when it is in danger. Some people in China and Japan eat it but they have to be really carefull because they are poisonous! If you want to learn more about the Puffer Fish, this video will tell you all about it!',
        user_id= 2 )

    v9 = Video(
        name= 'Dolphins Play Catch with a Pufferfish',
        link= 'https://www.youtube.com/watch?v=0T5aGLybXEs', 
        description='Who needs a volleyball when a pufferfish will do just fine?',
        user_id= 2 )

    v10 = Video(
        name= 'The Giant Water Lily if VICIOUS',
        link= 'https://www.youtube.com/watch?v=TWSF3df6jUs', 
        description='Watch as the violent and beautiful water lily makes is mark in this #green planet of ours',
        user_id= 2 )

    db.session.add_all([v1, v2, v3, v4, v5, v6, v7, v8, v9, v10])
    db.session.commit()