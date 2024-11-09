import axios from "axios";
import StorageUtils from "./HandleStorage";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8082";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = StorageUtils.getAPIToken();
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
