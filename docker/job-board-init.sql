CREATE TABLE IF NOT EXISTS job_postings (
  id SERIAL PRIMARY KEY,
  job_title VARCHAR(100),
  job_url VARCHAR(255),
  company_logo VARCHAR(255),
  company_name VARCHAR(100),
  company_address VARCHAR(255),
  company_salary VARCHAR(100),
  company_metadata TEXT[],
  date_posted VARCHAR(50)
);