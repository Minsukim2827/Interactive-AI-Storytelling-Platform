import psycopg2
import os
from dotenv import load_dotenv
from flask import jsonify, request, g
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

def save_story(story_data):
    conn = get_db_connection()
    cursor = conn.cursor()
    print(story_data)
    print('attempting to put into database')
    try:
        # Insert into storybooks table
        cursor.execute("""
            INSERT INTO public.storybooks (user_id, storybook_title, coverimage, image1, text1, image2, text2, image3, text3, image4, text4, image5, text5)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING storybook_id;
        """, (
            story_data['userId'],
            story_data['title'],
            story_data['pages'][0]['image'],
            story_data['pages'][1]['image'], story_data['pages'][1]['text'],
            story_data['pages'][2]['image'], story_data['pages'][2]['text'],
            story_data['pages'][3]['image'], story_data['pages'][3]['text'],
            story_data['pages'][4]['image'], story_data['pages'][4]['text'],
            story_data['pages'][5]['image'], story_data['pages'][5]['text'],
        ))
        
        storybook_id = cursor.fetchone()[0]
        
        # Insert into storybook_data table
        cursor.execute("""
            INSERT INTO public.storybook_data (storybook_id, likes, dislikes, viewership)
            VALUES (%s, %s, %s, %s);
        """, (storybook_id, 0, 0, 0))
        
        conn.commit()
        print("succesfully saved into database")

        return {"message": "Story saved successfully", "storybook_id": storybook_id}
    except Exception as e:
        conn.rollback()
        print(f"An error occurred: {e}")
        return {"error": "Failed to save story"}
    finally:
        cursor.close()