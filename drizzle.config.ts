import type { Config } from "drizzle-kit";
import { connectionString } from "./db";

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString!,
  },
} satisfies Config;
