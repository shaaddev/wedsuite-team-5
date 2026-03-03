import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../../db";
import {
  account,
  onboardingProfiles,
  session,
  user,
  vendors,
  verification,
} from "../../../db/schema";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.BETTER_AUTH_URL
    : "http://localhost:3000";

export const auth = betterAuth({
  baseURL: baseUrl,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      account,
      onboardingProfiles,
      session,
      user,
      vendors,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
});
