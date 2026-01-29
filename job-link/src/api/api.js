import { apiClient } from "./client";

export const api = {
  upload: (document) => apiClient.upload("/service/portal/addJobPostings", document)
};