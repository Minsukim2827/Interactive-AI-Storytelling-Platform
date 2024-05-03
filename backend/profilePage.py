import psycopg2
from flask import jsonify, request, g
from dotenv import load_dotenv
import os


load_dotenv()

def get_conn_string():
    return f"host={os.getenv('DB_HOST')} user={os.getenv('DB_USER')} dbname={os.getenv('DB_NAME')} password={os.getenv('DB_PASSWORD')} sslmode={os.getenv('DB_SSLMODE', 'prefer')}"

def get_db_connection():
    conn = psycopg2.connect(get_conn_string())
    print("Database connected")
    return conn

def get_user_storybooks(user_id):
    db = None
    try:
        db = get_db_connection()
        cur = db.cursor()

        print("Attempting to query user's storybooks")
        # Adjust this query to include the additional fields from storybook_data table
        query = """
        SELECT u.username, s.storybook_id, s.storybook_title, s.coverimage,
               d.likes, d.dislikes, d.viewership,
               s.image1, s.text1, s.image2, s.text2, s.image3, s.text3,
               s.image4, s.text4, s.image5, s.text5
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
                "viewership": row[6],
                "image1": row[7],
                "text1": row[8],
                "image2": row[9],
                "text2": row[10],
                "image3": row[11],
                "text3": row[12],
                "image4": row[13],
                "text4": row[14],
                "image5": row[15],
                "text5": row[16],
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
