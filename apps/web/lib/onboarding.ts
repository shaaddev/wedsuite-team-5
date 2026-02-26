import { isUserRole, type UserRole } from "@websuite/backend/onboarding";
export type {
	CoupleOnboardingData,
	UserRole,
	VendorOnboardingData,
} from "@websuite/backend/onboarding";

interface OnboardingMetadataRecord {
	role?: unknown;
	onboardingComplete?: unknown;
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
