/** @format */

import axios from "axios";
export const API = axios.create({
  baseURL: "https://pharmacy-backend-ten.vercel.app",
});

API.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    config.headers = Object.assign(
      {
        Authorization: `Bearer ${token}`,
      },
      config.headers
    );
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
