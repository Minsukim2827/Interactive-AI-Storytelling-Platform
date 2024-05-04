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

# Fetch story books created by user
def get_user_storybooks(user_id):
    db = None
    try:
        db = get_db_connection()
        cur = db.cursor()

        print("Attempting to query user's storybooks")
        # Adjust this query to filter by user_id
        query = """
        SELECT u.username, s.storybook_id, s.storybook_title, s.coverimage, d.likes, d.dislikes, d.viewership
        FROM public.storybooks s
        JOIN public.users u ON s.user_id = u.id
        JOIN public.storybook_data d ON s.storybook_id = d.storybook_id
        WHERE s.user_id = %s
        """
        cur.execute(query, (user_id,))
        rows = cur.fetchall()
        storybooks = {
            row[1]: {
                "username": row[0],
                "storybook_id": row[1],
                "storybook_title": row[2],
                "coverimage": row[3],
                "likes": row[4],
                "dislikes": row[5],
                "viewership": row[6]
            }
            for row in rows
        }

        print("Successfully queried the database for user's storybooks")
        return storybooks
    finally:
        if cur:
            cur.close()
        if db:
            db.close()

