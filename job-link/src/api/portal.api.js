import { apiClient } from "./client";
const BASE_URL = import.meta.env.VITE_API_URL;

export const portalApi = {
  upload: async (file) => await fetch(`${BASE_URL}/service/portal/addJobPostings`, {
    method: "POST",
    body: file,
    credentials: "include"
  }),
  getJobPostings: async () => await apiClient.get("/service/portal/jobPostings")
};