import api from "./axios";

export const authAPI = {
  register: (data) => api.post("/api/v1/auth/register", data),
  login: (data) => api.post("/api/v1/auth/login", data),
  logout: () => api.post("/api/v1/auth/logout"),
  me: () => api.get("/api/v1/auth/me"),
};

export const taskAPI = {
  list: () => api.get("/api/v1/tasks"),
  create: (data) => api.post("/api/v1/tasks", data),
  get: (id) => api.get(`/api/v1/tasks/${id}`),
  update: (id, data) => api.put(`/api/v1/tasks/${id}`, data),
  delete: (id) => api.delete(`/api/v1/tasks/${id}`),
};

export const userAPI = {
  list: () => api.get("/api/v1/users"), // make sure your backend route is protected for admin only
};