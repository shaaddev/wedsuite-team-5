import "dotenv/config";
import { createAuthClient } from "better-auth/react";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PUBLIC_URL
    : "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: baseUrl,
});
