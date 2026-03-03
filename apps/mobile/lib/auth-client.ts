import { createAuthClient } from "better-auth/react";

const baseUrl = process.env.EXPO_PUBLIC_BACKEND_URL ?? "http://localhost:8081";

export const authClient = createAuthClient({
  baseURL: baseUrl,
});
