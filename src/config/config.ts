const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

const defaultApiUrl = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://ijourney-backend-5elc.onrender.com";

export const API_URL = (configuredApiUrl || defaultApiUrl).replace(/\/$/, "");
