from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate 
from flask_restful import Api, Resource
from flask_media import Media
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from models import db, User, Video, Comment
from flask_bcrypt import Bcrypt
import secrets 




app = Flask(__name__)

app.secret_key= secrets.token_hex(32)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['MEDIA_PATH'] = '../server/videos'
app.config['MEDIA_ALLOWED_EXTENSIONS'] = ['jpg', 'mp4']
app.config['MEDIA_DEFAULT_ENDPOINT'] = 'default'
app.config['MEDIA_DEFAULT_URL'] = 'https://ih1.redbubble.net/image.2924701484.4363/flat,750x,075,f-pad,750x1000,f8f8f8.jpg'
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
api = Api(app)

class Home(Resource):
    def get(self):
        return jsonify({'message': 'Welcome to my shitty website '})

api.add_resource(Home, '/')

class UserbyID(Resource): 
    def get(self):
        user_id = session['user_id']
        this_user = User.query.filter(User.id == user_id).first()
        if this_user: 
            return make_response(this_user.to_dict(), 200)
        else: 
            return make_response({'dne':'please log in'}, 404)

api.add_resource(UserbyID, '/profile')

class Videos(Resource):
    def get(self): 
        video_list = []
        for v in Video.query.all(): 
            vid = {
                'name': v.name, 
                'description': v.description,
                'link': v.link,
                'id':v.id,
            }
            video_list.append(vid)

        return make_response(video_list, 200)

    def post(self):
        id = session['user_id']
        data = request.get_json()
        new_vid = Video(
            name = data['name'],
            description = data['description'],
            link = data['link'],
            user_id = id
        )

        db.session.add(new_vid)
        db.session.commit()

        return make_response(new_vid.to_dict(), 201) 



api.add_resource(Videos, '/videos')

class Comments(Resource):
    def post(self): 
        id = session['user_id']
        data = request.get_json()
        try:
            new_comment = Comment(
                user_id = id,
                video_id = data['video_id'],
                content = data['content']
            )

        except KeyError: 
            return make_response({'error': '400: Validation error. Please ensure you are logged in'})
        
        db.session.add(new_comment)
        db.session.commit()

        latest_comment = Comment.query.order_by(Comment.created_at.desc()).all()
        new = latest_comment[0]

        return make_response(new.to_dict(), 200)

api.add_resource(Comments, '/comments')

class VideobyID(Resource):
    def get(self, id):
        video = Video.query.filter(Video.id == id).first()
        vid_obj = video.to_dict()

        return make_response(vid_obj, 200)

    def patch(self, id): 
        data = request.get_json()
        video = Video.query.filter(Video.id == id).first()

        for attr in data: 
            setattr(video, attr, data[attr])

        db.session.add(video)
        db.session.commit()

        return make_response(video.to_dict(), 200)

    def delete(self, id): 
        video = Video.query.filter(Video.id == id).first()

        if video == None: 
            response = make_response({'error': 'Video Not Found'}, 404)

        else: 
            db.session.delete(video)
            db.session.commit()

            response = make_response({}, 204)

        return response

api.add_resource(VideobyID, '/videos/<int:id>')


class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data['email']
        password = data['password']

        user = User.query.filter(User.email == email).first()

        if user is None:
            return make_response({"error": "no user found with that email"}, 404)
        if not bcrypt.check_password_hash(user._password_hash, password):
            return make_response({"error": "Incorrect password"}, 404)

        session.permanent = True
        session['user_id'] = user.id
            
        return make_response(jsonify({
            'username': user.username,
            'email': user.email
        }), 200)

api.add_resource(Login, '/login')
        

class CheckSession(Resource):
    def get(self):
        user_id = session['user_id']
        if user_id: 
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200

        return make_response({}, 404)

api.add_resource(CheckSession, '/checksession')

class ClearSession(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)

api.add_resource(ClearSession, '/logout')


class CreateUser(Resource):
    def get(self): 
        return make_response({'message': 'create user resource works'})

    def post(self): 
        data = request.get_json()
        username = data['username']
        email = data['email']
        password = data['password']
        confirmation_pw = data['confirmation_pw']

        exist = User.query.filter(User.email == email).first() is not None

        if exist: 
            return make_response({'error': 'that user is already in the system'}, 409)

        hashed_password = bcrypt.generate_password_hash(password)
        hashed_password_confirmation = bcrypt.generate_password_hash(confirmation_pw)

        new_user = User(username = username, email=email, _password_hash = hashed_password, confirmation_pw = hashed_password_confirmation )

        db.session.add(new_user)
        db.session.commit()

        return make_response({
            'id': new_user.id,
            'email': new_user.email,
        }, 204)
        
api.add_resource(CreateUser, '/createuser')

class Uploader(Resource): 
    def post(self):
        file = request.files['file']
        upload = Video()
        upload.media_file.save(file)
        db.session.add(upload)
        db.session.commit
        return make_response({'The request went through':'maybe it saved? Who knows'})

api.add_resource(Uploader, '/uploader')


if __name__ == '__main__':
    app.run(port=5000, debug=True)