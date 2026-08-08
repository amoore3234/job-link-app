import { apiClient } from "./client";

export const portalApi = {
  upload: async (file) => await fetch("http://localhost:8082/service/portal/addJobPostings", {
    method: "POST",
    body: file,
    credentials: "include"
  }),
  getJobPostings: async () => await apiClient.get("/service/portal/jobPostings")
};