import time
import fitz
from pathlib import Path
import re
from mapping_model.job_posting_mapping import JobPostingMapping as JobPosting
from playwright.async_api import async_playwright

async def scrape_dice(playwright, document) -> list[dict]:
  browser = await playwright.chromium.launch_persistent_context(
    user_data_dir="/var/lib/playwright_data",
    channel="chrome",
    headless=True,
    no_viewport=True
  )

  page = await browser.new_page()

  page_count = 1

  jobs = []
  print(f"Document: {document}")
  query_string = find_keywords(document)
  print(f"Query String: {query_string}")

  while page_count <= 1:
    await page.goto(f'https://www.dice.com/jobs?filters.workplaceTypes=Remote&q={query_string}&page=' + str(page_count))
    time.sleep(10)
    vacancies = await page.locator('[data-testid="job-card"]').all()

    for main_details in vacancies:
      # main_details = vacancy.get_by_role("main")

      item = {}

      item["job_title"] = await main_details.locator('[data-testid="job-search-job-detail-link"]').get_attribute("aria-label")
      item["job_url"] = await main_details.locator('[data-testid="job-search-job-detail-link"]').get_attribute("href")
      item["company_salary"] = ""
      item["company_address"] = ""
      item["company_metadata"] = []
      item["date_posted"] = ""

      company_salary = main_details.locator("#salary-label")

      if await company_salary.is_visible():
        item["company_salary"] = await company_salary.inner_text()

      easy_apply = main_details.locator("#easyApply-label")
      employment_Type = main_details.locator("#employmentType-label")

      if await easy_apply.is_visible():
        item["company_metadata"].append(await easy_apply.inner_text())
      elif await employment_Type.is_visible():
        item["company_metadata"].append(await employment_Type.inner_text())

      location = "Remote"
      date_posted = "Recently"

      meta_paragraph = main_details.locator('p:has-text("•")').first
      full_meta_text = await meta_paragraph.text_content()

      if full_meta_text and "•" in full_meta_text:
          parts = full_meta_text.split("•")
          location = parts[0].strip()
          date_posted = parts[1].strip()

      item["company_address"] = location
      item["date_posted"] = date_posted

      jobs.append(item)

      page_count += 1

  items = []

  for job in jobs:
    await page.goto(f"https://www.dice.com{job["job_url"]}")
    time.sleep(2)

    item = {}

    item["job_title"] = job["job_title"]
    item["job_url"] = f"https://www.dice.com{job["job_url"]}"
    item["company_salary"] = job["company_salary"]
    item["company_metadata"] = job["company_metadata"]
    item["company_address"] = job["company_address"]
    item["date_posted"] = job["date_posted"]
    item["company_name"] = ""
    item["company_logo"] = ""

    company_name = page.locator('[data-testid="job-detail-header-card"] a[data-wa-click="djv-job-company-profile-click"]')
    logo_url = page.locator("[data-testid='job-detail-header-card'] img")

    if await company_name.is_visible():
      item["company_name"] = await company_name.inner_text()

    if await logo_url.is_visible():
      item["company_logo"] = await logo_url.get_attribute("src")
    else:
      print("Logo URL could not be retrieved from src or data-src.")

    items.append(item)

  await browser.close()
  print(f"Items: {items}")
  return items

def find_keywords(document: str) -> str:
    keywords = ["Software Engineer", "Full Stack Developer", "Backend Developer", "Java Developer", "Python Developer"]

    current_dir = f"/app/uploads/"
    pdf_path = find_file(document, current_dir)
    print(f"PDF Path: {pdf_path}")
    doc = fitz.open(pdf_path)
    results = {}
    newString = ""

    for keyword in keywords:
        results[keyword] = 0

    for page in doc:
        text = page.get_text().lower()

        for keyword in keywords:
            match = re.search(rf"\b{re.escape(keyword)}\b", text, re.IGNORECASE)
            if match:
              newString = keyword

        for char in newString:
          if char == ' ':
            newString = "+".join(newString.split())

    return newString

def find_file(filename, search_path):
    search_root = Path(search_path)

    # If the root folder isn't found, print a helpful debug statement
    if not search_root.exists():
        print(f"Error: Search root folder '{search_path}' does not exist inside this container context!")
        return None

    # Search recursively through the directory tree
    for path in search_root.rglob("*"):
        if path.is_file() and path.name == filename:
            return path

    return None

async def map_job_definition(document) -> list[JobPosting]:
  async with async_playwright() as playwright:

    job_board = []
    job_board_items = await scrape_dice(playwright, document)

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
