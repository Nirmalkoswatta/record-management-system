import axios from "axios";

// Relative URL: Vite proxies /api to the backend in dev (see vite.config.js)
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL ?? ""}/api/records/petRecords`,
});

export const listRecords = () => api.get("").then((r) => r.data);
export const getRecord = (id) => api.get(`/${id}`).then((r) => r.data);
export const createRecord = (data) => api.post("", data).then((r) => r.data);
export const updateRecord = (id, data) => api.put(`/${id}`, data).then((r) => r.data);
export const deleteRecord = (id) => api.delete(`/${id}`);

export const SPECIES = ["Dog", "Cat", "Bird", "Rabbit", "Other"];

// Server sends { message, errors: { field: msg } } on 400; fall back to a generic message.
export const errorInfo = (error, fallback) => ({
  message: error.response?.data?.message ?? (error.response ? fallback : "Cannot reach the server. Is the API running?"),
  fields: error.response?.data?.errors ?? {},
  notFound: error.response?.status === 404,
});
