import "dotenv/config";
import { createAuthClient } from "better-auth/react";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.BETTER_AUTH_URL
    : "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: baseUrl,
});
