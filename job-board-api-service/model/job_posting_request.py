from pydantic import BaseModel

class JobPostingRequest(BaseModel):
    job_title: str = None
    job_url: str = None
    company_name: str = None
    company_logo: str = None
    company_address: str = None
    company_salary: str = None
    company_metadata: list[str] = None
    date_posted: str = None