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

export function isUserRole(value: unknown): value is UserRole {
	return value === "vendor" || value === "couple";
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
