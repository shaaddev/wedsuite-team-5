import path from "node:path";
import { config as loadEnv } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const envCandidates = [
  path.resolve(process.cwd(), ".env.local"),
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "../.env.local"),
  path.resolve(process.cwd(), "../.env"),
  path.resolve(process.cwd(), "../../.env.local"),
  path.resolve(process.cwd(), "../../.env"),
];

for (const envPath of envCandidates) {
  loadEnv({ path: envPath, override: false, quiet: true });
}

export const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.LOCAL_DB;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL or LOCAL_DB is missing. Ensure env vars are available to the current runtime."
  );
}

export const client = postgres(connectionString, {
  prepare: false,
});

export const db = drizzle(client);
