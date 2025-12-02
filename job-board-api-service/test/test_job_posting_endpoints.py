from config.auth import get_current_user, validate_token
from fastapi.testclient import TestClient
from app import app
from unittest.mock import patch
from fastapi import Header

client = TestClient(app)

async def override_role_checker():
  return {
      "sub": "1234567890",
      "name": "Test User",
      "realm_access": {
        "roles": ["admin", "user"]
      }
    }

def test_create_job_posting_endpoint():
  app.dependency_overrides[validate_token] = override_role_checker

  with patch('service.job_posting_service.JobPostingService.create_job_posting') as mock_create_posting:
    #Arrange
    job_posting = create_job_posting_request()
    mock_create_posting.return_value = create_job_posting_response()

    #Act
    response = client.post("/api/posting", json=job_posting)
    json_response = response.json()

    #Assert
    assert response.status_code == 200
    assert json_response["id"] == None
    assert json_response["job_title"] == "Software Engineer"

def test_create_job_postings():
  app.dependency_overrides[validate_token] = override_role_checker

  with patch('service.job_posting_service.JobPostingService.create_job_postings') as mock_create_postings:
    #Arrange
    job_postings = [create_job_posting_request()]
    mock_create_postings.return_value = [create_job_posting_response()]

    #Act
    response = client.post("/api/add_postings", json=job_postings)
    json_response = response.json()

    #Assert
    assert response.status_code == 200
    assert len(json_response) > 0

def test_get_job_postings():
  app.dependency_overrides[get_current_user] = override_role_checker

  with patch('service.job_posting_service.JobPostingService.get_job_postings') as mock_get_postings:
    #Arrange
    mock_get_postings.return_value = [get_job_posting()]

    #Act
    response = client.get("/api/postings")
    job_postings_response = response.json()

    #Assert
    assert response.status_code == 200
    assert len(job_postings_response) > 0

def test_get_job_posting_by_id():
  app.dependency_overrides[get_current_user] = override_role_checker

  with patch('service.job_posting_service.JobPostingService.get_job_posting_by_id') as mock_get_posting_by_id:
    #Arrange
    mock_get_posting_by_id.return_value = get_job_posting()

    #Act
    response = client.get("/api/posting/1")
    job_posting_response = response.json()

    #Assert
    assert response.status_code == 200
    assert job_posting_response["job_title"] == "Software Engineer"

def test_get_job_posting_by_id_404_response():
  app.dependency_overrides[get_current_user] = override_role_checker

  with patch('service.job_posting_service.JobPostingService.get_job_posting_by_id') as mock_get_posting_by_id:
    #Arrange
    mock_get_posting_by_id.return_value = {}

    #Act
    response = client.get("/api/posting/2")

    #Assert
    assert response.status_code == 404

def test_delete_job_posting():
  app.dependency_overrides[validate_token] = override_role_checker

  with patch('service.job_posting_service.JobPostingService.delete_job_posting') as mock_delete_job_posting:
    #Arrange
    mock_delete_job_posting.return_value = None

    #Act
    response = client.delete("/api/posting/1")

    #Assert
    assert response.status_code == 204


def create_job_posting_request() -> dict:
  return {
            "job_title": "Software Engineer",
            "job_url": "http://example.com/job/1",
            "company_logo": "http://example.com/logo.png",
            "company_address": "123 Main St",
            "company_salary": "$100k-$120k",
            "company_metadata": ["industry","Tech"],
            "date_posted": "2024-01-01"
          }

def create_job_posting_response() -> dict:
  return {
            "id": None,
            "job_title": "Software Engineer",
            "job_url": "http://example.com/job/1",
            "company_logo": "http://example.com/logo.png",
            "company_address": "123 Main St",
            "company_salary": "$100k-$120k",
            "company_metadata": ["industry", "Tech"],
            "date_posted": "2024-01-01"
          }

def get_job_posting() -> dict:
  return {
            "id": 1,
            "job_title": "Software Engineer",
            "job_url": "http://example.com/job/1",
            "company_logo": "http://example.com/logo.png",
            "company_address": "123 Main St",
            "company_salary": "$100k-$120k",
            "company_metadata": ["industry", "Tech"],
            "date_posted": "2024-01-01"
          }