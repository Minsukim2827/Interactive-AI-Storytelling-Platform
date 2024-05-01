from flask import Flask, request, jsonify, g
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv
from users import get_users
from login import register, login 
from discover import generate_story_book_list
from profilePage import get_user_storybooks
from ai import generate_story
from saveStory import save_story 

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

#########################################################
############# Loading Database Connection ###############
#########################################################
# Database connection details from environment variables
def get_conn_string(): 
    return f"host={os.getenv('DB_HOST')} user={os.getenv('DB_USER')} dbname={os.getenv('DB_NAME')} password={os.getenv('DB_PASSWORD')} sslmode={os.getenv('DB_SSLMODE', 'prefer')}"

def get_db_connection():
    if 'db' not in g:
        g.db = psycopg2.connect(get_conn_string())
        print("Database connected")
    return g.db

@app.teardown_request
def teardown_request(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()
        print("Database connection closed")


#########################################################
################ API Calls Start Here ###################
#########################################################

#  import get_users function from app.py to generate db table
# (this is just to test the db)

@app.route('/api/users')
def users_route(): 
    return jsonify(get_users())

# generating the story with ai.py
@app.route('/generate-story', methods=['POST'])
def generate_ai():
    data = request.get_json()
    story = generate_story(data)
    return jsonify(story)

# Add a new route to register a user
@app.route('/api/register', methods=['POST'])
def register_route():
    return register()

# Add a new route to login a user
@app.route('/api/login', methods=['POST'])
def login_route():
    return login()

@app.route('/api/storybooklist', methods=['GET'])
def generate_discovery_page():
    print("received connection request")
    storybooklist = generate_story_book_list()
    
    print(storybooklist)
    print("attempting to send to frontend")
    return jsonify(storybooklist)

# fetch storybooks for the specific user for their profile page
@app.route('/api/user/storybooks', methods=['GET'])
def user_storybooks():
    user_id = request.args.get('userId')
    if user_id is None:
        return jsonify({"error": "Missing user ID"}), 400
    try:
        storybooks = get_user_storybooks(user_id)
        return jsonify(storybooks)
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred fetching user storybooks"}), 500
    
#save ai generated story to database
@app.route('/api/user/save-story', methods=['POST'])
def save_story_route():
    story_data = request.get_json()
    if not story_data:
        return jsonify({"error": "No data provided"}), 400
    print("succesfully retrieved story")
    result = save_story(story_data)
    if "error" in result:
        return jsonify(result), 500
    
    return jsonify(result), 200

if __name__ == '__main__':
    app.run(port=5000)

if __name__ == '__main__':
    app.run(port=5000)
