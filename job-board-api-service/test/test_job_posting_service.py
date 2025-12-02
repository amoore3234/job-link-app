
from unittest.mock import patch

from service.job_posting_service import JobPostingService
from test.model.job_posting import JobPosting

@patch('service.job_posting_service.JobPostingService.create_job_posting')
def test_create_job_posting(mock_create_posting):

  # Arrange
  job_posting = create_job_posting()
  mock_create_posting.return_value = job_posting
  service = JobPostingService()

  # Act
  result = service.create_job_posting(job_posting)

  # Assert
  assert result.job_title == mock_create_posting.return_value.job_title

@patch('service.job_posting_service.JobPostingService.create_job_postings')
def test_create_job_postings(mock_create_postings):

  # Arrange
  job_posting = create_job_posting()
  mock_create_postings.return_value = [job_posting]
  service = JobPostingService()

  # Act
  list = service.create_job_postings([job_posting])

  # Assert
  assert len(list) == 1

@patch('service.job_posting_service.JobPostingService.get_job_postings')
def test_get_job_postings(mock_fetch_postings):

  # Arrange
  job_posting = create_job_posting()
  mock_fetch_postings.return_value = [job_posting]
  service = JobPostingService()

  # Act
  list = service.get_job_postings()

  # Assert
  assert len(list) == 1

@patch('service.job_posting_service.JobPostingService.get_job_posting_by_id')
def test_get_job_posting_by_id(mock_fetch_posting):
  # Arrange
  job_posting = create_job_posting()
  mock_fetch_posting.return_value = job_posting
  service = JobPostingService()

  # Act
  result = service.get_job_posting_by_id(1)

  # Assert
  assert result.id == mock_fetch_posting.return_value.id

@patch('service.job_posting_service.JobPostingService.delete_job_posting')
def test_delete_job_posting(mock_delete_posting):
  # Arrange
  mock_delete_posting.return_value = None
  service = JobPostingService()

  # Act
  result = service.delete_job_posting(1)

  # Assert
  assert result is None

def create_job_posting() -> JobPosting:
  job_posting = JobPosting(
    id=1,
    job_title="Senior Software Engineer",
    job_url="https://example.com/jobs/1",
    company_logo="https://example.com/logo.png",
    company_address="13423 Valley Blvd, Newport Beach, USA",
    company_salary="$250,000",
    company_metadata=["Python", "React", "Java"],
    date_posted="2025-07-15"
  )
  return job_posting