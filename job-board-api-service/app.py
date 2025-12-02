from model.job_posting_request import JobPostingRequest
from model.job_posting_response import JobPostingResponse
from service.job_posting_service import JobPostingService
from fastapi import Depends, FastAPI, HTTPException, status
from config.auth import RoleRequired, get_current_user

app = FastAPI()

@app.post("/api/posting",
          response_model=JobPostingResponse,
          summary="Create a new job posting",
          description="Create job posting to store in the database.",
          dependencies=[Depends(RoleRequired("admin"))])
async def create_job(posting: JobPostingRequest):
    service = JobPostingService()
    service.create_job_posting(posting)
    return posting

@app.post("/api/add_postings",
          response_model=list[JobPostingResponse],
          summary="Create and save multiple job postings",
          description="Create multiple job postings to store in the database.",
          dependencies=[Depends(RoleRequired("admin"))])
async def create_jobs(postings: list[JobPostingRequest]):
    service = JobPostingService()
    service.create_job_postings(postings)
    return postings

@app.post("/api/job_postings",
          summary="Create and save multiple job postings",
          description="Retrieve job postings from the Dice job board",
          dependencies=[Depends(get_current_user)])
async def create_dice_jobs():
    service = JobPostingService()
    await service.delete_job_postings()
    await service.create_dice_postings()

@app.get("/api/postings",
         response_model=list[JobPostingResponse],
         summary="Get all job postings",
         description="Retrieve all job postings from the database.",
         dependencies=[Depends(get_current_user)])
async def get_all_jobs():
    service = JobPostingService()
    return await service.get_job_postings()

@app.get("/api/posting/{job_id}",
         response_model=JobPostingResponse,
         summary="Get a job posting by ID",
         description="Retrieve a specific job posting using its ID.",
         dependencies=[Depends(get_current_user)])
async def get_job_by_id(job_id: int):
    service = JobPostingService()
    job = service.get_job_posting_by_id(job_id)
    if job:
        return job
    else:
        raise HTTPException(status_code=404, detail="Job posting {job_id} not found")

@app.delete("/api/posting/{job_id}",
            status_code=status.HTTP_204_NO_CONTENT,
            summary="Delete a job posting by ID",
            description="Delete a specific job posting using its ID.",
            dependencies=[Depends(RoleRequired("admin"))])
async def delete_job(job_id: int):
    service = JobPostingService()
    service.delete_job_posting(job_id)
