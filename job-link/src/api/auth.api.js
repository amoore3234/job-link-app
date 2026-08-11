import { apiClient } from "./client";

export const authApi = {
  register: (userData) => apiClient.post("/auth/register", userData),
  login: (credentials) => apiClient.post("/auth/login", credentials),
  user: (username) => apiClient.get("/auth/user", username)
};
