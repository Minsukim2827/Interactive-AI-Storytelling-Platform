from flask import Flask, request, jsonify, g
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv
from users import get_users
from login import register, login 
from generateStory import generate_story

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

@app.route('/generate-story', methods=['POST'])
def generate_ai():
    data = request.get_json()
    prompt = data.get('prompt', '')
    story = generate_story(prompt)
    return jsonify(story)

# Add a new route to register a user
@app.route('/api/register', methods=['POST'])
def register_route():
    return register()

# Add a new route to login a user
@app.route('/api/login', methods=['POST'])
def login_route():
    return login()

if __name__ == '__main__':
    app.run(port=5000)
