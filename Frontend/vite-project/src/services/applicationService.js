import api from "./api";

export const applyToJob = (data) =>
  api.post("/applications", data);