import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

API.interceptors.request.use((req) => {
  req.headers = req.headers || {};

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  const isFormData = req.data && (req.data instanceof FormData);

  if (!isFormData) {
    req.headers["Content-Type"] = "application/json";
  } else {
    // Let axios/browser set the correct multipart boundary for FormData
    if (req.headers["Content-Type"]) delete req.headers["Content-Type"];
  }

  return req;
});

export default API;