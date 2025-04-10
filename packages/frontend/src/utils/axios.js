import axios from "axios";

const DEFAULT_BACKEND_PORT = 3001;

const apiInstance = axios.create({
  baseURL: `http://localhost:${DEFAULT_BACKEND_PORT}`, // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiInstance;
