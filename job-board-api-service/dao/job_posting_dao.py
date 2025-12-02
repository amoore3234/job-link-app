import os
import asyncio
from dice_job_board import map_job_definition
from dotenv import load_dotenv
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

from mapping_model.job_posting_mapping import JobPostingMapping as JobPosting

load_dotenv()

database_url = os.getenv("JOB_BOARD_POSTGRES_DATABASE_URL")

engine = create_async_engine(database_url, echo=True)
AsyncSessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)

class JobPostingDao:

    async def add_job_posting(self, job_posting) -> JobPosting:
        async with AsyncSessionLocal() as session:
            session.add(job_posting)
            await session.commit()
            return job_posting

    async def add_job_postings(self, job_postings) -> list[JobPosting]:
        async with AsyncSessionLocal() as session:
            session.add_all(job_postings)
            await session.commit()
            return job_postings

    async def add_dice_job_postings(self) -> list[JobPosting]:
        async with AsyncSessionLocal() as session:
            dice_job_postings = await map_job_definition()
            session.add_all(dice_job_postings)
            await session.commit()
            return dice_job_postings

    async def get_job_posting_by_id(self, job_id) -> JobPosting:
       async with AsyncSessionLocal() as session:
            statement = select(JobPosting).where(JobPosting.id == job_id)
            result = await session.execute(statement)
            job_posting = result.scalar_one_or_none()
            return job_posting

    async def get_all_job_postings(self) -> list[JobPosting]:
       async with AsyncSessionLocal() as session:
            statement = select(JobPosting)
            result = await session.execute(statement)
            job_postings = result.scalars().all()
            return job_postings

    async def delete_job_posting(self, job_id) -> None:
       async with AsyncSessionLocal() as session:
            job_posting = self.get_job_posting_by_id(job_id)
            if job_posting:
                await session.delete(job_posting)
                await session.commit()

    async def delete_all_job_postings(self) -> None:
        async with AsyncSessionLocal() as session:
            job_postings = await self.get_all_job_postings()
            for job_posting in job_postings:
                await session.delete(job_posting)
            await session.commit()
