/**
 * Shared backend package for websuite.
 *
 * Export types, contracts, utilities, and shared logic
 * that both the web and mobile apps consume.
 */

// biome-ignore lint: ignore - fix this later for better performance
export { getAppConfig } from "./config";
export type { AppConfig } from "./types";
