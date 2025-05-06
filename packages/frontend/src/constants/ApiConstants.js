const DEFAULT_BACKEND_PORT = 3001;

export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:${DEFAULT_BACKEND_PORT}/api`
    : "https://warehouse-inventory-app-backend.vercel.app/api";
