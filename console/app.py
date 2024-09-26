from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from flask import Blueprint, jsonify, request
from flask_pymongo import PyMongo
from models import User, db
from flask_migrate import Migrate
from flask_login import LoginManager, login_user, logout_user

import boto3
import os

auth = Blueprint('auth', __name__)

load_dotenv()

mongo = PyMongo()
migrate = Migrate()
login_manager = LoginManager()

app = Flask(__name__)
app.secret_key = '_5#y2L"F4Q8z\n\xec]//'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///uch.db'
app.config["MONGO_URI"] = os.getenv('MONGO_URI')

mongo.init_app(app)
db.init_app(app)
migrate.init_app(app, db)
login_manager.init_app(app)

CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": ["*"]
    }
})

app.register_blueprint(auth, url_prefix='/')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_REGION = os.getenv('AWS_REGION')
S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME')

s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

def get_images_from_s3():
    try:
        response = s3_client.list_objects_v2(Bucket=S3_BUCKET_NAME)
        if 'Contents' in response:
            images = [
                f"https://{S3_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{item['Key']}"
                for item in response['Contents']
            ]
            return images
        else:
            return []
    except Exception as e:
        print(f"Error fetching images from S3: {str(e)}")
        return None

@app.route('/', methods=['GET'])
def hello():
    return jsonify("Hello")

@app.route('/api/images', methods=['GET'])
def fetch_images():
    images = get_images_from_s3()
    coordinates = list(mongo.db.coordinate.find())

    if coordinates and images:
        data = []
        for idx, image in enumerate(images):
            coordinate = coordinates[idx] if idx < len(coordinates) else None
            if coordinate:
                timestamp = coordinate.get('timestamp')
                formatted_timestamp = timestamp.strftime('%A, %d %B %Y, %H:%M:%S') if timestamp else None
                data.append({
                    'id': idx + 1,
                    'timestamp': formatted_timestamp,
                    'latitude': coordinate.get('latitude'),
                    'longitude': coordinate.get('longitude'),
                    'image': image,
                    'labels': coordinate.get('label')
                })
            else:
                break
        return jsonify(data)
    else:
        return jsonify({'error': 'Error fetching images'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        login_data = request.get_json()
        email = login_data.get('email')
        password = login_data.get('password')
        
        user_data = mongo.db.users.find_one({"email": email})
        user = User.query.filter_by(email=email).first()
        hashed_password = user_data.get('password')

        if not user_data and not user:
            return jsonify(message="Invalid email or password"), 401
        
        if user_data and user:
            if check_password_hash(hashed_password, password):
                login_user(user, remember=True)
                return jsonify(message="Login Succesfully"), 200
            else:
                return jsonify(message="Incorrect password, try again."), 401
        
        if not check_password_hash(hashed_password, password):
            return jsonify(message="Invalid email or password"), 401
        
        else:
            return jsonify(message="Invalid email or password"), 401

    except Exception as e:
        return jsonify(message="An error occurred"), 500
    
@app.route('/api/register', methods=['POST'])
def register():
    try:
        user_data = request.get_json()
        email = user_data.get('email')
        password = generate_password_hash(user_data.get('password'))

        new_user = User(
            email=email,
            password=password
        )

        # db.session.add(new_user)
        # db.session.commit()

        user_dict = {
            "id": new_user.id,
            "email": new_user.email,
            "password": new_user.password, 
            "created_at": new_user.created_at
        }

        mongo.db.users.insert_one(user_dict)
        return jsonify(message="User added to both SQLAlchemy and MongoDB"), 201

    except Exception as e:
        return jsonify(message="An error occurred"), 500
    
@app.route('/logout')
def logout():
    logout_user()
    return jsonify(message="Logout successful"), 200

if __name__ == '__main__':
    app.run()
