import axios from "axios";

const api = axios.create();

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("AccessToken");

    if (token) {
      config.headers.Authorization = `${token}`;
    } else {
      localStorage.clear();
      window.location.href = "/";
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default api;
