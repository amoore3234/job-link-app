
from dao.job_posting_dao import JobPostingDao
from mapping_model.job_posting_mapping import JobPostingMapping
from model.job_posting_request import JobPostingRequest
from model.job_posting_response import JobPostingResponse

class JobPostingService:
    def __init__(self):
        self.repository = JobPostingDao()

    async def create_job_posting(self, posting) -> JobPostingRequest:
        job_posting = self.save_job_posting(posting)
        return await self.repository.add_job_posting(job_posting)

    async def create_job_postings(self, job_data_list) -> list[JobPostingRequest]:
        job_mappings = []
        for posting in job_data_list:
            job_mapping = self.save_job_posting(posting)
            job_mappings.append(job_mapping)
        return await self.repository.add_job_postings(job_mappings)

    async def create_dice_postings(self) -> list[JobPostingRequest]:
        return await self.repository.add_dice_job_postings()

    async def get_job_postings(self) -> list[JobPostingResponse]:
        return await self.repository.get_all_job_postings()

    async def get_job_posting_by_id(self, job_id) -> JobPostingResponse:
        return await self.repository.get_job_posting_by_id(job_id)

    async def delete_job_posting(self, job_id) -> None:
        await self.repository.delete_job_posting(job_id)
    
    async def delete_job_postings(self) -> None:
        await self.repository.delete_all_job_postings()

    def save_job_posting(self, posting: JobPostingRequest) -> JobPostingMapping:
        return JobPostingMapping(
            job_title=posting.job_title,
            job_url=posting.job_url,
            company_name=posting.company_name,
            company_logo=posting.company_logo,
            company_address=posting.company_address,
            company_salary=posting.company_salary,
            company_metadata=posting.company_metadata,
            date_posted=posting.date_posted
        )


