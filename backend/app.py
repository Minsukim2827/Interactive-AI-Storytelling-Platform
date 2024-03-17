from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

# Database connection details from environment variables
def get_conn_string():
    host = os.getenv('DB_HOST')
    dbname = os.getenv('DB_NAME')
    user = os.getenv('DB_USER')
    password = os.getenv('DB_PASSWORD')
    sslmode = os.getenv('DB_SSLMODE', 'prefer')  # defaulting to 'prefer' if not specified
    conn_string = f"host={host} user={user} dbname={dbname} password={password} sslmode={sslmode}"
    return conn_string

def get_db_connection():
    conn = psycopg2.connect(get_conn_string())
    print("Database connected")
    return conn

@app.route('/api/users')
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM public.users ORDER BY id ASC;')  # Fetch users
    rows = cursor.fetchall()
    # create a json formatted list of users
    users_list = [{'id': user[0], 'username': user[1], 'email': user[2], 'password': user[3]} for user in rows]
    cursor.close()
    conn.close()
    return jsonify(users_list)

if __name__ == '__main__':
    app.run(debug=True)