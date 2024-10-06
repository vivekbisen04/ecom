// src/api/axios.js
import axios from "axios";


const instance = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin && admin.token) {
      config.headers.Authorization = `Bearer ${admin.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
