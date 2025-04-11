import axios from "axios";
import {jwtDecode} from "jwt-decode";

import {API_BASE_URL} from "../constants/ApiConstants";

const TOKEN_STORAGE_KEY = "authToken";

class ApiService {
  constructor(baseURL = API_BASE_URL) {
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.publicApi = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor() {
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          console.warn("Attempted to make an authenticated request without a token.");
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  _initializeResponseInterceptor() {
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized access - 401. Token might be invalid or expired.");
          this.clearToken();
        }
        return Promise.reject(error);
      },
    );
  }

  // Token Management
  setToken(token) {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      console.error("Attempted to set an empty or null token.");
    }
  }

  getToken() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  clearToken() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  getUserRole() {
    const token = this.getToken();
    try {
      if (token) {
        const payload = jwtDecode(token);
        return payload?.role || "user";
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
    return null;
  }

  isLogin() {
    const token = this.getToken();
    if (token) {
      try {
        const payload = jwtDecode(token);
        return Date.now() < payload.exp * 1000;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    return false;
  }

  // Public API Methods
  async login(credentials) {
    try {
      const response = await this.publicApi.post("/user/LogIn", credentials);
      if (response.data && response.data.token) {
        this.setToken(response.data.token);
      } else {
        console.warn("Login response did not contain a token.");
      }
      return response.data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  }

  async signup(userData) {
    try {
      const response = await this.publicApi.post("/user/SignUp", userData);
      return response.data;
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      throw error;
    }
  }

  // Private API Methods
  async get(endpoint, config = {}) {
    try {
      const response = await this.api.get(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error.response?.data || error.message);
      throw error;
    }
  }

  async post(endpoint, data = {}, config = {}) {
    try {
      const response = await this.api.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error.response?.data || error.message);
      throw error;
    }
  }

  async put(endpoint, data = {}, config = {}) {
    try {
      const response = await this.api.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`PUT ${endpoint} failed:`, error.response?.data || error.message);
      throw error;
    }
  }

  async delete(endpoint, config = {}) {
    try {
      const response = await this.api.delete(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`DELETE ${endpoint} failed:`, error.response?.data || error.message);
      throw error;
    }
  }
}

// Create and Export Singleton Instance
const apiService = new ApiService();
export default apiService;
