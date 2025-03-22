export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://myapp.com"
    : "http://localhost:3000";

export const BASE_FACEBOOK_URL = "http://localhost:3000/server/login/facebook";
