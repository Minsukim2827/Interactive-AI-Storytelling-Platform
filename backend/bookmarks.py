import psycopg2
from flask import jsonify, request, g
from dotenv import load_dotenv
import os

load_dotenv()

# Database connection details from environment variables
def get_conn_string(): 
    return f"host={os.getenv('DB_HOST')} user={os.getenv('DB_USER')} dbname={os.getenv('DB_NAME')} password={os.getenv('DB_PASSWORD')} sslmode={os.getenv('DB_SSLMODE', 'prefer')}"

# Database connection
def get_db_connection():
    conn = psycopg2.connect(get_conn_string())
    print("Database connected")
    return conn

# def get_user_bookmarks(user_id):
#     db = None
#     try: 
#         db = get_db_connection()
#         cur = db.cursor()
        

# def save_bookmarks(user_id, storybook_id):
#     db = None
#     try:
#         db = get_db_connection()
#         cur = db.cursor()
#         query = "INSERT INTO public.bookmarks (user_id, storybook_id) VALUES (%s, %s)"
#         cur.execute(query, (user_id, storybook_id))
#         db.commit()
#         print("Successfully saved bookmark")
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         db.rollback()
#         raise
#     finally:
#         if cur:
#             cur.close()
#         if db:
#             db.close()