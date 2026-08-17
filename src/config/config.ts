const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

// Firebase Hosting proxies /api requests to Cloud Run in production. Keeping
// production requests same-origin avoids CORS, mixed-content, and accidental
// requests to the visitor's localhost when a build variable is omitted.
const defaultApiUrl = import.meta.env.DEV ? "http://localhost:5000" : "";

export const API_URL = (configuredApiUrl || defaultApiUrl).replace(/\/$/, "");
