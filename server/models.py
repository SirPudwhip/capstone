from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates 
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property



db = SQLAlchemy()

class Comment(db.Model, SerializerMixin): 
    __tablename__ = 'comments'

    serialize_rules = ('-user_id', '-video_id')

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    video_id = db.Column(db.Integer, db.ForeignKey('videos.id'))
    content = db.Column(db.String, nullable=False)


class Video(db.Model, SerializerMixin):
    __tablename__ = 'videos'

    serialize_rules = ('-user_id', '-user', '-comments.video', '-comments.id')

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    link = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable= False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    comments = db.relationship('Comment', backref='video')
    

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ('-videos.user', '-_password_hash', '-confirmation_pw')

    id = db.Column(db.Integer, primary_key = True)

    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    confirmation_pw = db.Column(db.String)

    videos = db.relationship('Video', backref='user')


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

