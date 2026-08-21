const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

const defaultApiUrl = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://ijourney-backend-5elc.onrender.com";

export const API_URL = (configuredApiUrl || defaultApiUrl).replace(/\/$/, "");

/**
 * Where the landing-page contact form sends people. There is no transactional-email
 * service wired into the backend, so the form opens the visitor's mail client rather
 * than pretending to submit. Point this at the real inbox before launch.
 */
export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || "info@i-journey.org";
