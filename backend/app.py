from flask import Flask, request, jsonify, g, send_file
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv
from users import get_users
from login import register, login 
from discover import generate_story_book_list, update_likes, update_dislikes
from profilePage import get_user_storybooks
from ai import generate_story, tts_generate
from saveStory import save_story 
from bookmarks import save_bookmarks, get_user_bookmarks
from accountSettings import get_user_details, update_username, update_email

app = Flask(__name__)
#CORS(app)
CORS(app, origins='http://localhost:5173')  # Replace with your frontend origin

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
    prompt = data['prompt']
    art_style = data['artStyle']
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400
    
    if not art_style:
        return jsonify({'error': 'Art style is required'}), 400
    story = generate_story(prompt, art_style)
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

# Text-to-speech API route
@app.route('/api/user/tts', methods=['POST'])
def tts_ai():
    data = request.get_json() # Get the data from the POST request
    print("Received data:", data)  
    prompt = data['text']
    if not prompt: # Check if the prompt is empty
        return {'error': 'Prompt is required'}, 400
    try: # Try to generate the audio stream
        audio_stream = tts_generate(prompt)
        if audio_stream is None:
            return jsonify({'error': 'TTS generation failed'}), 500

        audio_stream.seek(0) # Reset the stream position

        return send_file( # Send the audio stream as a file
            audio_stream,
            mimetype='audio/mpeg',   # Set the MIME type
            as_attachment=True,
            download_name='speech.mp3' # Set the download name  
        )
    except Exception as e: # Catch any exceptions
        return {'error': str(e)}, 500

# Like a storybook
@app.route('/api/storybook/like', methods=['POST'])
def like_storybook():
    storybook_id = request.json.get('storybookId')
    if not storybook_id:
        return jsonify({"error": "Missing storybook ID"}), 400
    result = update_likes(storybook_id)
    if "error" in result:
        return jsonify(result), 500
    return jsonify(result), 200

# Dislike a storybook
@app.route('/api/storybook/dislike', methods=['POST'])
def dislike_storybook():
    storybook_id = request.json.get('storybookId')
    if not storybook_id:
        return jsonify({"error": "Missing storybook ID"}), 400
    result = update_dislikes(storybook_id)
    if "error" in result:
        return jsonify(result), 500
    return jsonify(result), 200


# Route to fetch user details by user_id
@app.route('/api/user/details', methods=['GET'])
def get_user_details_route():
    user_id = request.args.get('userId')
    if user_id is None:
        return jsonify({"error": "Missing user ID"}), 400
    
    try:
        user_details = get_user_details(user_id)
        if user_details:
            return jsonify({
                "id": user_details[0],
                "username": user_details[1],
                "email": user_details[2]
            })
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)


@app.route('/api/user/update-username', methods=['POST'])
def update_user_username():
    data = request.get_json()
    user_id = data.get('user_id')
    new_username = data.get('new_username')
    if not user_id or not new_username:
        return jsonify({"error": "User ID and new username are required"}), 400
    try:
        update_username(user_id, new_username)  # Call the update_username function
        return jsonify({"success": True, "message": "Username updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/user/update-email', methods=['POST'])
def update_user_email():
    data = request.get_json()
    user_id = data.get('user_id')
    new_email = data.get('new_email')
    if not user_id or not new_email:
        return jsonify({"error": "User ID and new email are required"}), 400
    try:
        update_email(user_id, new_email)  # Call the update_email function
        return jsonify({"success": True, "message": "Email updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
