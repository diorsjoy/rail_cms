import { notification } from "antd";
import axios from "axios";
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

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token-info");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// api.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   function (response) {
//     if (response.data.code === "ERROR") {
//       notification.error({
//         message: response.data.title,
//         description: response.data.text,
//       });
//       return Promise.reject(response);
//     } else {
//       notification.success({
//         message: response.data.title,
//         description: response.data.text,
//       });
//     }
//     return response;
//   },
//   function (error) {
//     if (axios.isAxiosError(error)) {
//       notification.error({
//         message: error.response?.status,
//         description: error.response?.data?.text,
//       });
//     } else {
//       notification.error({
//         message: `${error.message}`,
//       });
//     }
//     return Promise.reject(error);
//   }
// );
