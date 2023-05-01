from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate 
from flask_restful import Api, Resource
from flask_media import Media
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from models import db, User, Video
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

# class VideobyID(Resource): 
#     def get(self):
#         video = Video.query.filter(Video.id == id).first()


# api.add_resource(Video, '/video/<int:id>')



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
        session['user.id'] = user.id
            
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

class ClearSession(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)


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