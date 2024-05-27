from flask import Flask, request, jsonify, g
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv
from users import get_users
from login import register, login 
from discover import generate_story_book_list
from profilePage import get_user_storybooks
from ai import generate_story, tts_ai
from saveStory import save_story 
from bookmarks import save_bookmarks, get_user_bookmarks

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

#########################################################
############# Loading Database Connection ###############
########################################################
#
# Database connection details from environment variables
def get_conn_string(): 
    return f"host={os.getenv('DB_HOST')} user={os.getenv('DB_USER')} dbname={os.getenv('DB_NAME')} password={os.getenv('DB_PASSWORD')} sslmode={os.getenv('DB_SSLMODE', 'prefer')}"

# Database connection details
def get_db_connection():
    if 'db' not in g:
        g.db = psycopg2.connect(get_conn_string())
        print("Database connected")
    return g.db

# Close database connection
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

# Fetch all users from the database
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
# Fetch storybooks for the discovery page
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
    
# Fetch user bookmarks
@app.route('/api/user/bookmarks', methods=['GET'])
def user_bookmarks():
    user_id = request.args.get('userId')
    if user_id is None:
        return jsonify({"error": "Missing user ID"}), 400
    try:
        storybooks = get_user_bookmarks(user_id)
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

# Save user bookmarks
@app.route('/api/user/save-bookmarks', methods=['POST'])
def save_bookmark():
    bookmark_data = request.get_json()
    if not bookmark_data:
        return jsonify({"error": "No data provided"}), 400
    print("bookmark data retrieved")
    result = save_bookmarks(bookmark_data)
    if "error" in result:
        return jsonify(result), 500
    
    return jsonify(result), 200

@app.route('/api/user/tts', methods=['POST'])
def tts_ai():
    data = request.get_json()
    prompt = data['prompt']
    if not prompt:
        return {'error': 'Prompt is required'}, 400
    try:
        text_result = tts_ai(prompt)
        return {'text': text_result}
    except Exception as e:
        return {'error': str(e)}, 500