import api from "./api";

export const applyToJob = (data) =>
  api.post("/applications", data);

export const getApplicants = (jobId) =>
  api.get(`/applications/${jobId}`);

export const updateApplicationStatus =(id,data) =>
    api.put(`/applications/${id}`, data);

export const getMyApplications =
  (studentId) =>
    api.get(
      `/applications/student/${studentId}`
    );