import psycopg2
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database connection details from environment variables
def get_conn_string(): 
    return f"host={os.getenv('DB_HOST')} user={os.getenv('DB_USER')} dbname={os.getenv('DB_NAME')} password={os.getenv('DB_PASSWORD')} sslmode={os.getenv('DB_SSLMODE', 'prefer')}"

def get_db_connection():
    conn = psycopg2.connect(get_conn_string())
    print("Database connected")
    return conn

def get_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM public.users ORDER BY id ASC;') # Fetch users
    rows = cursor.fetchall()
    # create a json formatted list of users
    users_list = [{'id': user[0], 'username': user[1], 'email': user[2], 'password': user[3]} for user in rows]
    cursor.close()
    conn.close()
    return users_list
