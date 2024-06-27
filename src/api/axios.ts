import { notification } from "antd";
import axios from "axios";
import { accessTokenService } from "../lib";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  function (response) {
    if (
      response.data.code === "ERROR" ||
      response.data.error === "ERR_NETWORK"
    ) {
      notification.error({
        message: `${response.data.title}`,
        description: `${response.data.text}`,
      });
    }

    if (response.data.title === "ACCESS_DENIED") {
      window.location.href = "/sign-in";
    }

    return response;
  },
  function (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status >= 400) {
        notification.error({
          message: error.code,
          description: error.message,
        });
      }
      if (error.response && error.response.status === 401) {
        notification.error({
          message: error.code,
          description: error.message,
        });
      }
      if (error.code === "ERR_NETWORK") {
        notification.error({
          message: error.code,
          description: error.message,
        });
      }
    } else {
      notification.error({
        message: "Error",
      });
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  function (config) {
    const token = accessTokenService.get();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
