from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv
from ai import generate_text
from ai import generate_image
from users import get_users
import io

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
    conn = psycopg2.connect(get_conn_string())
    print("Database connected")
    return conn

#########################################################
################ API Calls Start Here ###################
#########################################################

#  import get_users function from app.py to generate db table
# (this is just to test the db)

@app.route('/api/users')
def users_route(): 
    return jsonify(get_users())

# Add a new route to generate ai text
@app.route('/generate-text', methods=['POST'])
def generate_text_route():
    data = request.get_json()
    prompt = data.get('prompt', '')
    max_length = data.get('max_length', 50)
    generated_text = generate_text(prompt, max_length)
    return jsonify({'generated_text': generated_text})


# Add a new route to generate an image
@app.route('/generate-image', methods=['POST'])
def generate_image_route():
    data = request.get_json()
    prompt = data.get('prompt', '')
    image_bytes = generate_image({"inputs": prompt})
    return send_file(io.BytesIO(image_bytes), mimetype='image/png')

if __name__ == '__main__':
    app.run(port=5000)
