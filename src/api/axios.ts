import { notification } from "antd";
import axios from "axios";
import { accessTokenService } from "../lib";
import { Faq, News } from "../types";

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

export const fetchFaqs = () => api.get<Faq[]>("/Faqs");
export const fetchFaqById = (id: number) => api.get<Faq>(`/Faqs/${id}`);
export const createFaq = (faq: Omit<Faq, "id">) => api.post("/Faqs", faq);
export const updateFaq = (id: number, faq: Omit<Faq, "id">) =>
  api.put(`/Faqs/${id}`, faq);
export const deleteFaq = (id: number) => api.delete(`/Faqs/${id}`);

export const fetchNews = async () => {
  const response = await api.get<{ data: News[] }>("/NewsArticles");
  return response.data.data; // Adjusted to match the expected response format
};
export const fetchNewsById = (id: number) =>
  api.get<News>(`/NewsArticles/${id}`);
export const createNews = async (news: Omit<News, "id">) => {
  const response = await api.post("/NewsArticles", news);
  return response.data.data; // Return the ID of the newly created news
};
export const updateNews = (id: number, news: News) =>
  api.put(`/NewsArticles/${id}`, news);
export const deleteNews = (id: number) => api.delete(`/NewsArticles/${id}`);
export const fetchNewsList = async () => {
  const response = await api.get<{ data: News[] }>("/NewsArticles");
  return response.data.data;
};
