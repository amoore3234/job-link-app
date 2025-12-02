import os
import asyncpg

async def get_db_connection():
  postgresql_connection_pool = None
  try:
    postgresql_connection_pool = await asyncpg.create_pool(
          min_size=1,
          max_size=10,
          user=os.getenv("JOB_BOARD_POSTGRES_USER_TEST"),
          password=os.getenv("JOB_BOARD_POSTGRES_PASSWORD_TEST"),
          host=os.getenv("JOB_BOARD_POSTGRES_HOST_TEST"),
          port=os.getenv("JOB_BOARD_POSTGRES_PORT_TEST"),
          database=os.getenv("JOB_BOARD_POSTGRES_DB_TEST")
        )
    print("Connection pool created successfully")
    return postgresql_connection_pool
  except Exception as error:
      print("Error while connecting to PostgreSQL:", error)