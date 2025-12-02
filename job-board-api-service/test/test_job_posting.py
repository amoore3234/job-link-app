
import os
import pytest
from testcontainers.postgres import PostgresContainer
from test.job_posting_dao import create_job_posting, delete_all_job_postings, create_table, get_all_job_postings, delete_job_posting_by_id, get_job_posting_by_id

postgres = PostgresContainer("postgres:latest")


@pytest.fixture(scope="module", autouse=True)
def setup(request):
    postgres.start()

    def remove_container():
        postgres.stop()

    request.addfinalizer(remove_container)
    os.environ["JOB_BOARD_POSTGRES_DATABASE_URL_TEST"] = postgres.get_connection_url()
    os.environ["JOB_BOARD_POSTGRES_HOST_TEST"] = postgres.get_container_host_ip()
    os.environ["JOB_BOARD_POSTGRES_PORT_TEST"] = str(postgres.get_exposed_port(5432))
    os.environ["JOB_BOARD_POSTGRES_USER_TEST"] = postgres.username
    os.environ["JOB_BOARD_POSTGRES_PASSWORD_TEST"] = postgres.password
    os.environ["JOB_BOARD_POSTGRES_DB_TEST"] = postgres.dbname
    create_table()


@pytest.fixture(scope="function", autouse=True)
def setup_data():
    delete_all_job_postings()
def test_create_job_posting():
    add_job = add_job_posting()
    assert add_job is None  # Function returns None on success

def test_get_job_posting_by_id():
    add_job_posting()
    postings = get_all_job_postings()
    job_id = postings[0][0]  # Assuming ID is the first field

    posting = get_job_posting_by_id(job_id)
    assert posting[1] == "Software Engineer"  # Assuming job_title is the second field

def test_get_all_job_postings():
    add_job_posting()
    add_job_posting()
    postings = get_all_job_postings()
    assert len(postings) == 2

def test_delete_job_posting_by_id():
    add_job_posting()
    postings = get_all_job_postings()
    assert len(postings) == 1

    delete_job_posting_by_id(postings[0][0])  # Assuming ID is the first field

    postings_after_delete = get_all_job_postings()
    assert len(postings_after_delete) == 0

def test_delete_all_job_postings():
    add_job_posting()
    delete_all_job_postings()
    postings = get_all_job_postings()
    assert len(postings) == 0

def add_job_posting() -> None:
    create_job_posting(
        "Software Engineer",
        "http://example.com/job1",
        "http://example.com/logo1.png",
        "123 Main St, City, Country",
        "$100,000 - $120,000",
        ["Full-time", "Remote"],
        "2024-01-01"
    )