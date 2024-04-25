import psycopg2
import os
from dotenv import load_dotenv
from flask import jsonify, request
from psycopg2 import IntegrityError

# Load environment variables
load_dotenv()

# Database connection details from environment variables
def get_conn_string(): 
    return f"host={os.getenv('DB_HOST')} user={os.getenv('DB_USER')} dbname={os.getenv('DB_NAME')} password={os.getenv('DB_PASSWORD')} sslmode={os.getenv('DB_SSLMODE', 'prefer')}"

def get_db_connection():
    conn = psycopg2.connect(get_conn_string())
    print("Database connected")
    return conn

def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')  # Note: Passwords are stored in plain text for this example.
    print(f"Attempting to register with username: {username}, email: {email}, and password: {password}")
    if not (username and email and password):
        return jsonify({'error': 'Missing information'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('INSERT INTO public.users (username, email, password) VALUES (%s, %s, %s)', (username, email, password))
        conn.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except IntegrityError as e:
        conn.rollback()
        if 'email' in str(e):
            return jsonify({'error': 'Email already registered'}), 409  # 409 Conflict might be appropriate here
        elif 'username' in str(e):
            return jsonify({'error': 'Username already registered'}), 409  # Similar handling for username
        else:
            return jsonify({'error': 'Data integrity error'}), 409
    except Exception as e:
        conn.rollback()
        return jsonify({'error': 'Server error'}), 500
    finally:
        cursor.close()
        conn.close()


def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    print(f"Attempting to log in with username: {username} and password: {password}")

    if not (username and password):
        return jsonify({'error': 'Incorrect or missing username or password'}), 400
    if username and not password:
        return jsonify({'error': 'Incorrect or Missing password'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT id, username FROM public.users WHERE username = %s AND password = %s', (username, password))
        user = cursor.fetchone()
        print(f"Database query result: {user}")
        if user:
            print(f"Login successful for user: {user[1]}")
            return jsonify({'message': 'Login successful', 'user': {'id': user[0], 'username': user[1]}})
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()