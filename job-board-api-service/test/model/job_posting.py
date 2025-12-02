
class JobPosting:
  def __init__(self, id, job_title, job_url, company_logo, company_address, company_salary, company_metadata, date_posted):
    self.id = id
    self.job_title = job_title
    self.job_url = job_url
    self.company_logo = company_logo
    self.company_address = company_address
    self.company_salary = company_salary
    self.company_metadata = company_metadata
    self.date_posted = date_posted

  def __repr__(self):
    return f"JobPosting(id={self.id}, job_title={self.job_title}, job_url={self.job_url}, company_logo={self.company_logo}, company_address={self.company_address}, company_salary={self.company_salary}, company_metadata={self.company_metadata}, date_posted={self.date_posted})"