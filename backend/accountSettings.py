import psycopg2
import os
from dotenv import load_dotenv
from flask import jsonify, request

# Load environment variables
load_dotenv()

# Database connection details from environment variables
def get_conn_string(): 
    return f"host={os.getenv('DB_HOST')} user={os.getenv('DB_USER')} dbname={os.getenv('DB_NAME')} password={os.getenv('DB_PASSWORD')} sslmode={os.getenv('DB_SSLMODE', 'prefer')}"

# Database connection
def get_db_connection():
    conn = psycopg2.connect(get_conn_string())
    print("Database connected")
    return conn

# Update username by user_id
def update_username(user_id, new_username):
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # SQL query to update username
        sql_query = "UPDATE public.users SET username = %s WHERE id = %s"

        # Execute the SQL UPDATE statement
        cur.execute(sql_query, (new_username, user_id))
        conn.commit()

        print("Username updated successfully")
    except Exception as e:
        print("Error updating username:", e)
    finally:
        if conn:
            conn.close()

# Update email by user_id
def update_email(user_id, new_email):
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # SQL query to update email
        sql_query = "UPDATE public.users SET email = %s WHERE id = %s"

        # Execute the SQL UPDATE statement
        cur.execute(sql_query, (new_email, user_id))
        conn.commit()

        print("Email updated successfully")
    except Exception as e:
        print("Error updating email:", e)
    finally:
        if conn:
            conn.close()

def get_user_details(user_id):
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # SQL query to fetch user details
        sql_query = "SELECT id, username, email FROM users WHERE id = %s"

        # Execute the SQL SELECT statement
        cur.execute(sql_query, (user_id,))
        
        # Fetch user details
        user_details = cur.fetchone()

        # Close cursor and commit changes
        cur.close()
        conn.commit()

        return user_details  # Return user details as tuple (id, username, email)
    except Exception as e:
        print("Error fetching user details:", e)
        return None
    finally:
        if conn:
            conn.close()