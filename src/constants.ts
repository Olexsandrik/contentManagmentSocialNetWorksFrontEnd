export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://myapp.com"
    : "https://localhost:3000";

export const BASE_FACEBOOK_URL = "https://localhost:3000/server/login/facebook";
