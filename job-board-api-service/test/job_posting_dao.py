from test.db_connection_config import get_db_connection
from test.model.job_posting import JobPosting

def create_table():
  connect = None
  cursor = None
  try:
    connect = get_db_connection().getconn()
    cursor = connect.cursor()
    cursor.execute("""
      CREATE TABLE IF NOT EXISTS job_postings (
        id SERIAL PRIMARY KEY,
        job_title VARCHAR(100),
        job_url VARCHAR(255),
        company_logo VARCHAR(255),
        company_title VARCHAR(100),
        company_address VARCHAR(255),
        company_salary VARCHAR(100),
        company_metadata TEXT[],
        date_posted VARCHAR(50)
      );
    """)
    connect.commit()
    print("Table created successfully")
  except Exception as error:
    print(f"Error creating table: {error}")
  finally:
    if cursor:
      cursor.close()
    if connect:
      get_db_connection().closeall()

def create_job_posting(job_title, job_url, company_logo, company_address, company_salary, company_metadata, date_posted):
  connect = None
  cursor = None
  try:
    connect = get_db_connection().getconn()
    cursor = connect.cursor()
    cursor.execute("""
      INSERT INTO job_postings (job_title, job_url, company_logo, company_address, company_salary, company_metadata, date_posted)
      VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (job_title, job_url, company_logo, company_address, company_salary, company_metadata, date_posted))
    connect.commit()
    print("Job posting created successfully")
  except Exception as error:
    print(f"Error adding job posting: {error}")
  finally:
    if cursor:
      cursor.close()
    if connect:
      get_db_connection().closeall()

def get_all_job_postings() -> list[JobPosting]:
  connect = None
  cursor = None
  try:
    connect = get_db_connection()
    cursor = connect.getconn().cursor()
    cursor.execute("SELECT * FROM job_postings")
    print("Successfully fetched all job postings.")
    return cursor.fetchall()
  except Exception as error:
    print(f"Error fetching job postings: {error}")
  finally:
    if cursor:
      cursor.close()
    if connect:
      get_db_connection().closeall()

def get_job_posting_by_id(job_id) -> JobPosting:
    connect = None
    cursor = None
    try:
      connect = get_db_connection().getconn()
      cursor = connect.cursor()
      cursor.execute("SELECT * FROM job_postings WHERE id = %s", (job_id,))
      print(f"Successfully fetched job posting with ID {job_id}.")
      return cursor.fetchone()
    except Exception as error:
      print(f"Error fetching job posting by ID: {error}")
    finally:
      if cursor:
        cursor.close()
      if connect:
        get_db_connection().closeall()

def delete_job_posting_by_id(job_id) -> None:
    connect = get_db_connection().getconn()
    cursor = connect.cursor()
    cursor.execute("DELETE FROM job_postings WHERE id = %s", (job_id,))
    connect.commit()
    cursor.close()
    get_db_connection().closeall()

def delete_all_job_postings() -> None:
    connect = get_db_connection().getconn()
    cursor = connect.cursor()
    cursor.execute("DELETE FROM job_postings")
    connect.commit()
    cursor.close()
    get_db_connection().closeall()