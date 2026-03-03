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

export function getOnboardingState(source: unknown) {
	const metadata =
		typeof source === "object" && source
			? (source as OnboardingMetadataRecord)
			: null;

	const role = isUserRole(metadata?.role) ? metadata.role : null;
	const onboardingComplete = metadata?.onboardingComplete === true;

	return { role, onboardingComplete };
}
