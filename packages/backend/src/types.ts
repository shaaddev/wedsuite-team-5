/**
 * Shared type definitions for websuite.
 *
 * Add your shared types, interfaces, and contracts here.
 * Both web and mobile apps can import from @websuite/backend.
 */

export type AppConfig = {
	name: string;
	version: string;
	environment: "development" | "staging" | "production";
};
