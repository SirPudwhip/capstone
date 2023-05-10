from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates 
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
import re



db = SQLAlchemy()

class Comment(db.Model, SerializerMixin): 
    __tablename__ = 'comments'

    serialize_rules = ( )

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey('videos.id'), nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    @validates('content')
    def check_content(self, key, content):
        if 0 < len(content) < 140:
            return content
        raise ValueError("You must keep it to 140 characters or less")

class Video(db.Model, SerializerMixin):
    __tablename__ = 'videos'

    serialize_rules = ('comments', 'user', '-comments.video', '-user.videos','-associated-users', '-user.commented_videos', '-user.unique_commented_vids', '-user.comments', 'unique_associated_users', '-unique_associated_users.videos','-unique_associated_users.comments', '-unique_associated_users.unique_commented_vids')

    id = db.Column(db.Integer, primary_key = True) 
    name = db.Column(db.String, nullable = False)
    link = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable= False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    comments = db.relationship('Comment', backref='video')

    associated_users = association_proxy('comments', 'user')
    
    @hybrid_property
    def unique_associated_users(self):
        return list(set(self.associated_users))

    @validates('link')
    def check_link(self, key, link):
        youtube_regex = r'^https?://(?:www\.)?youtube\.com/(?:watch\?(?=.*v=\w+)(?:\S+)?|embed/(?:\S+)|(\w+))$'
        if re.match(youtube_regex, link):
            return link
        raise ValueError('please use a youtube link')

    @validates('name')
    def check_name(self, key, name):
        banned_words = ['shit', 'fuck', 'damn', 'crap', 'hell']
        if any (word in name for word in banned_words): 
            raise ValueError('please no vulgarity')
        return name
    
    

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ('-_password_hash', '-confirmation_pw', '-comments', 'videos', '-videos.comments', '-videos.user', 'unique_commented_vids', '-unique_commented_vids.comments', '-unique_commented_vids.user')

    id = db.Column(db.Integer, primary_key = True)

    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    confirmation_pw = db.Column(db.String)

    comments = db.relationship('Comment', backref='user')
    videos = db.relationship('Video', backref='user')

    commented_videos = association_proxy('comments', 'video')

    @hybrid_property
    def unique_commented_vids(self):
        return list(set(self.commented_videos))

    @hybrid_property
    def password_hash(self):
        raise Exception("Don't even think about viewing this. It's called security, ever heard of it?")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password): 
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )

    @staticmethod
    def simple_hash(input):
        return sum(bytearray(input, encoding='utf-8'))

