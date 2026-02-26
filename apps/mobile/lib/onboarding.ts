import { isUserRole, type UserRole } from "@websuite/backend/onboarding";

export type {
	CoupleOnboardingData,
	UserRole,
	VendorOnboardingData,
} from "@websuite/backend/onboarding";

interface MetadataShape {
	role?: unknown;
	onboardingComplete?: unknown;
}

interface UserWithMetadata {
	publicMetadata?: unknown;
	unsafeMetadata?: unknown;
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

export function getOnboardingState(user: UserWithMetadata | null | undefined) {
	const publicMetadata = isObjectRecord(user?.publicMetadata)
		? (user.publicMetadata as MetadataShape)
		: null;
	const unsafeMetadata = isObjectRecord(user?.unsafeMetadata)
		? (user.unsafeMetadata as MetadataShape)
		: null;

	const roleCandidate = publicMetadata?.role ?? unsafeMetadata?.role;
	const onboardingCandidate =
		publicMetadata?.onboardingComplete ?? unsafeMetadata?.onboardingComplete;

	return {
		role: isUserRole(roleCandidate) ? roleCandidate : null,
		onboardingComplete: onboardingCandidate === true,
	};
}
