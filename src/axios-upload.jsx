import axios from 'axios';

const uploadAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

uploadAxiosInstance.interceptors.request.use(
  (config) => {
    delete config.headers["Authorization"];
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default uploadAxiosInstance;
