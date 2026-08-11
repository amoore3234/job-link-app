import { apiClient } from "./client";

export const authApi = {
  register: (userData) => apiClient.post("/auth/register", userData),
  login: (credentials) => apiClient.post("/auth/login", credentials),
  user: async (username) => await fetch(`http://localhost:8082/auth/user?username=${username}`, {
    method: "GET",
    credentials: "include"
  }),
  getJobPostings: async () => await apiClient.get("/service/portal/jobPostings")
};
