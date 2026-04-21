import api from "./api";

export const applyToJob = (data) =>
  api.post("/applications", data);

export const getApplicants = (jobId) =>
  api.get(`/applications/${jobId}`);