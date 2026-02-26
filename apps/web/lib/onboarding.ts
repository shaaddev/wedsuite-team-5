export type UserRole = "vendor" | "couple";

export interface CoupleOnboardingData {
	partnerOneName: string;
	partnerTwoName: string;
	weddingDate: string;
	location: string;
}

export interface VendorOnboardingData {
	businessName: string;
	category: string;
	location: string;
	startingPrice: string;
}

interface OnboardingMetadataRecord {
	role?: unknown;
	onboardingComplete?: unknown;
}

export function isUserRole(value: unknown): value is UserRole {
	return value === "vendor" || value === "couple";
}

export function getOnboardingState(publicMetadata: unknown) {
	const metadata =
		typeof publicMetadata === "object" && publicMetadata
			? (publicMetadata as OnboardingMetadataRecord)
			: null;

	const role = isUserRole(metadata?.role) ? metadata.role : null;
	const onboardingComplete = metadata?.onboardingComplete === true;

	return { role, onboardingComplete };
}
