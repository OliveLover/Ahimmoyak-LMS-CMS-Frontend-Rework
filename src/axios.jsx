import axios from "axios";
import { cognitoAuthConfig } from "./auth/cognitoAuthConfig";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const cognitoTokenKey = `oidc.user:${cognitoAuthConfig.authority}:${cognitoAuthConfig.client_id}`;
    const storedUserData = sessionStorage.getItem(cognitoTokenKey);

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      const token = userData?.access_token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;