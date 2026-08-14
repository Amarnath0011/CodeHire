import api from "./api";

export const getProfile = () => api.get("/profile");

export const updateProfile = (data) => api.put("/profile", data);

export const uploadResume = (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  // Let Axios/browser set the multipart boundary automatically.
  return api.post("/profile/resume", formData);
};
