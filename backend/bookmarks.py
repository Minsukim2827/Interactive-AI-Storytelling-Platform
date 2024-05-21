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

# Get user bookmarks
def get_user_bookmarks(user_id):
    db = None
    cur = None
    try: 
        db = get_db_connection()
        cur = db.cursor()
        print("Attempting to query user's bookmarks")
        query = "Select * from public.bookmarks where user_id = %s" #need proper query
        cur.execute(query, (user_id,))
        rows = cur.fetchall()
        bookmarks = {
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
        print("Successfully queried the database for user's bookmarks")
        return bookmarks
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": "Failed to get bookmarks"}
    finally:
        if cur:
            cur.close()
        if db:
            db.close()



# save bookmarks
def save_bookmarks(bookmark_data):
    db = get_db_connection()
    cur = db.cursor()
    try: 
        print(bookmark_data)
        print(bookmark_data['userId'])
        print(bookmark_data['storybookId'])
        print('attempting to put into database')
        user_id = bookmark_data['userId']
        storybook_id = bookmark_data['storybookId']
        query = "SELECT * FROM public.bookmarks WHERE user_id = %s AND storybook_id = %s" 
        cur.execute(query, (user_id, storybook_id))
        row = cur.fetchone()
        if row:
            return {"error": "Bookmark already exists"}
        
        query = "INSERT INTO public.bookmarks (user_id, storybook_id) VALUES (%s, %s)"
        cur.execute(query, (user_id, storybook_id))
        db.commit()

        print("Successfully saved bookmark into database")
        return {"message": "Bookmark saved successfully"}
    except Exception as e:
        db.rollback()
        print(f"An error occurred: {e}")
        return {"error": "Failed to save bookmark"}
    finally:
        if cur:
            cur.close()
        if db:
            db.close()

# def unsave_bookmarks(bookmark_data):
#     db = None
#     cur = None
#     try: 
#         db = get_db_connection()
#         cursor = db.cursor()
#         print(bookmark_data)
#         print('attempting to put into database')
#         query = "DELETE FROM public.bookmarks WHERE user_id = %s AND storybook_id = %s" #real query needed
#         cursor.execute(query, (bookmark_data['userId'], bookmark_data['storybook_id']))
#         db.commit()
#         print("Successfully unsaved bookmark into database")
#         return {"message": "Bookmark unsaved successfully"}
#     except Exception as e:
#         db.rollback()
#         print(f"An error occurred: {e}")
#         return {"error": "Failed to unsave bookmark"}
#     finally:
#         if cur:
#             cur.close()
#         if db:
#             db.close() 