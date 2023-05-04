from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates 
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property



db = SQLAlchemy()

class Comment(db.Model, SerializerMixin): 
    __tablename__ = 'comments'

    serialize_rules = ('-user_id', '-video_id', '-user.videos', '-user.comments' )

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

    serialize_rules = ('-user_id', '-comments.video', '-user')

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    link = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable= False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    comments = db.relationship('Comment', backref='video')
    

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ('-videos.user', '-_password_hash', '-confirmation_pw', 'commented_videos', '-commented_videos.comments', 'unique_commented_vids', '-unique_commented_vids.comments')

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

