import time
from mapping_model.job_posting_mapping import JobPostingMapping as JobPosting
from playwright.async_api import async_playwright

async def scrape_dice(playwright):
  browser = await playwright.chromium.launch_persistent_context(
    user_data_dir="playwright_data",
    channel="chrome",
    headless=True,
    no_viewport=True
  )

  page = await browser.new_page()

  page_count = 1

  jobs = []

  while page_count <= 1:
    await page.goto('https://www.dice.com/jobs?filters.workplaceTypes=Remote&q=Software+Engineer&page=' + str(page_count))
    time.sleep(10)
    vacancies = await page.locator('[data-testid="job-card"]').all()

    for vacancy in vacancies:
      main_details = vacancy.get_by_role("main")

      item = {}

      item["job_title"] = await main_details.locator('[data-testid="job-search-job-detail-link"]').get_attribute("aria-label")
      item["job_url"] = await main_details.locator('[data-testid="job-search-job-detail-link"]').get_attribute("href")
      item["company_salary"] = ""
      item["company_metadata"] = []

      company_salary = main_details.locator("#salary-label")

      if await company_salary.is_visible():
        item["company_salary"] = await company_salary.inner_text()

      easy_apply = main_details.locator("#easyApply-label")

      employment_Type = main_details.locator("#employmentType-label")


      if await easy_apply.is_visible():
        item["company_metadata"].append(await easy_apply.inner_text())
      elif await employment_Type.is_visible():
        item["company_metadata"].append(await employment_Type.inner_text())
      jobs.append(item)

      page_count += 1

  items = []

  for job in jobs:
    await page.goto(job["job_url"])
    time.sleep(2)

    logo = page.locator("dhi-company-logo")
    job_details = page.locator('[id="jobdetails"]')
    item = {}

    item["job_title"] = job["job_title"]
    item["job_url"] = job["job_url"]
    item["company_salary"] = job["company_salary"]
    item["company_metadata"] = job["company_metadata"]
    item["company_name"] = ""
    item["company_logo"] = ""
    item["company_address"] = ""
    item["date_posted"] = ""


    company_address = job_details.locator('[data-cy="location"]')
    date_posted = job_details.locator('[data-cy="postedDate"]')
    company_name = job_details.locator('[data-cy="companyNameLink"]')

    if await company_address.is_visible():
      item["company_address"] = await company_address.inner_text()

    if await company_name.is_visible():
      item["company_name"] = await company_name.inner_text()

    if await logo.is_visible():
      item["company_logo"] = await logo.get_attribute("logo-url")
    else:
      print("Logo URL could not be retrieved from src or data-src.")

    if await date_posted.is_visible():
      item["date_posted"] = await date_posted.inner_text()

    items.append(item)

  await browser.close()

  return items

async def map_job_definition() -> list[JobPosting]:
  async with async_playwright() as playwright:

    job_board = []
    job_board_items = await scrape_dice(playwright)

    for dice_job in job_board_items:
      job_posting = JobPosting(
        job_title=dice_job["job_title"],
        job_url=dice_job["job_url"],
        company_name=dice_job["company_name"],
        company_logo=dice_job["company_logo"],
        company_address=dice_job["company_address"],
        company_salary=dice_job["company_salary"],
        company_metadata=dice_job["company_metadata"],
        date_posted=dice_job["date_posted"]
      )
      job_board.append(job_posting)

    return job_board
