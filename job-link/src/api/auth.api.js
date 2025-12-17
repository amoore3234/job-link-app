import { apiClient } from "./client";

export const authApi = {
  register: (userData) => apiClient.post("/service/portal/register", userData),
};
