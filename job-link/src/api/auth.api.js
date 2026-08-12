import { apiClient } from "./client";
const BASE_URL = import.meta.env.VITE_API_URL;

export const authApi = {
  register: (userData) => apiClient.post("/auth/register", userData),
  login: (credentials) => apiClient.post("/auth/login", credentials),
  user: async (username) => await fetch(`${BASE_URL}/auth/user?username=${username}`, {
    method: "GET",
    credentials: "include"
  }),
  getJobPostings: async () => await apiClient.get("/service/portal/jobPostings")
};