import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;


const axiosInstance = axios.create({
  baseURL:`${apiBaseUrl}`,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
