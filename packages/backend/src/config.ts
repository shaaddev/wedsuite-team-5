import type { AppConfig } from "./types";

export function getAppConfig(): AppConfig {
	return {
		name: "websuite",
		version: "0.1.0",
		environment: "development",
	};
}
