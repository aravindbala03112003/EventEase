import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const api = axios.create({
  baseURL
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const saved = window.localStorage.getItem("eventease_auth");
    if (saved) {
      try {
        const { token } = JSON.parse(saved);
        if (token) {
          config.headers = config.headers ?? {};
          (config.headers as any).Authorization = `Bearer ${token}`;
        }
      } catch {}
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (typeof window !== "undefined" && status === 401) {
      try {
        window.localStorage.removeItem("eventease_auth");
      } catch {}
    }
    return Promise.reject(error);
  }
);
