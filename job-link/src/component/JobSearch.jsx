import React, { useState, useEffect } from "react";
import { portalApi } from "../api/portal.api";
import "./JobSearch.css";

export default function JobSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobPostings, setJobPostings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // 2. Fetch the data using an async function inside a useEffect hook
  useEffect(() => {
    const fetchPostings = async () => {
      try {
        setIsLoading(true);
        const response = await portalApi.getJobPostings();
        console.log(`Data response: ${response}`);
        let rawPayload = response?.postings || response;

        // 2. CHECK AND PARSE: If the server handed back a string, convert it into an object
        if (typeof rawPayload === "string") {
          console.log("-> Detected raw string payload. Parsing into JSON objects...");
          console.log(rawPayload);
          rawPayload = JSON.parse(rawPayload);
        }
        const postings = rawPayload.postings
        setJobPostings(postings);
        console.log(`Job postings: ${jobPostings}`);
      } catch (err) {
        console.error("Failed to fetch job postings:", err);
        setError("Could not load job postings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostings();
  }, []); // Empty dependency array means this runs exactly once when the tab opens

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filters cards based on search input text
  const filteredJobs = Array.isArray(jobPostings)
  ? jobPostings.filter(job => {
      const titleMatch = job.job_title?.toLowerCase().includes(searchQuery.toLowerCase());
      const companyMatch = job.company_name?.toLowerCase().includes(searchQuery.toLowerCase());
      return titleMatch || companyMatch;
    })
  : {};

  return (
    <div className="job-search-view">
      <div className="search-bar-wrapper">
        <div className="search-input-container">
          <svg
            className="search-input-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111827"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            type="text"
            className="main-search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* SCROLLABLE GRID DISPLAY CONTAINER */}
      <div className="scrollable-results-area">
        <div className="jobs-cards-grid">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-posting-card">
              <div className="card-header-row">
                <img
                  className="company-logo-img"
                  src={job.company_logo}
                  alt={`${job.company_name} logo`}
                  onError={(e) => { e.target.src = "https://placeholder.com"; }}
                />

                  {/* {job.company_metadata && job.company_metadata.length > 0 && (
                    <div className="job-card-tags-row">
                      {job.company_metadata.map((meta, idx) => (
                        <span key={idx} className="tag-chip">
                          {meta}
                        </span>
                      ))}
                    </div>
                  )} */}
                  <div className="card-text-body">
                    <h3 className="job-card-title">{job.job_title}</h3>
                    <div className="job-card-meta">{job.company_name} - {job.company_address}</div>
                    <div className="job-card-salary">{job.company_salary}</div>
                  </div>
                </div>
                {/* <div className="job-card-meta">{job.company_name} - {job.company_address}</div>
                <div className="job-card-salary">{job.company_salary}</div> */}
                <div className="job-card-tags-row">
                  {job.company_metadata && job.company_metadata.map((meta, idx) => (
                    <span key={idx} className={`tag-chip ${idx === 1 ? "purple-chip" : ""}`}>
                      {meta}
                    </span>
                  ))}
                  {job.date_posted && <div className="job-card-date">{job.date_posted}</div>}
                </div>
                {/* <div className="job-card-tags-row">
                  {job?.company_metadata.map((tag, idx) => (
                    <span key={idx} className={`tag-chip ${idx === 1 ? "tech-chip" : ""}`}>
                      {tag}
                    </span>
                  ))}
                </div> */}
                {/* <div className="job-card-date">{job.date_posted}</div> */}

                  <a
                    href={job.job_url}
                    className="apply-now-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply Now!
                  </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}