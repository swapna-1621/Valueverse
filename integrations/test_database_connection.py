from database_connection import get_connection

try:
    conn = get_connection()
    cursor = conn.cursor()

    print("Database connection successful!")

    cursor.execute("SELECT COUNT(*) FROM resources;")

    count = cursor.fetchone()[0]

    print("Resources in database:", count)

    cursor.close()
    conn.close()

except Exception as e:
    print("Database connection failed!")
    print(e)