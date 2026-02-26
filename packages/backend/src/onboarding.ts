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

export type OnboardingPayload =
	| { role: "couple"; data: CoupleOnboardingData }
	| { role: "vendor"; data: VendorOnboardingData };

export interface OnboardingPublicMetadata {
	role: UserRole;
	onboardingComplete: true;
	onboardingCompletedAt: string;
	coupleProfile: CoupleOnboardingData | null;
	vendorProfile: VendorOnboardingData | null;
}

export function isUserRole(value: unknown): value is UserRole {
	return value === "vendor" || value === "couple";
}

function hasNonEmptyStringFields(
	record: Record<string, unknown>,
	fields: string[],
) {
	return fields.every((field) => {
		const value = record[field];
		return typeof value === "string" && value.trim().length > 0;
	});
}

export function isCoupleOnboardingData(
	data: unknown,
): data is CoupleOnboardingData {
	if (typeof data !== "object" || !data) {
		return false;
	}
	return hasNonEmptyStringFields(data as Record<string, unknown>, [
		"partnerOneName",
		"partnerTwoName",
		"weddingDate",
		"location",
	]);
}

export function isVendorOnboardingData(
	data: unknown,
): data is VendorOnboardingData {
	if (typeof data !== "object" || !data) {
		return false;
	}
	return hasNonEmptyStringFields(data as Record<string, unknown>, [
		"businessName",
		"category",
		"location",
		"startingPrice",
	]);
}

export function parseOnboardingPayload(
	payload: unknown,
): OnboardingPayload | null {
	if (typeof payload !== "object" || !payload) {
		return null;
	}

	const record = payload as Record<string, unknown>;
	if (!isUserRole(record.role)) {
		return null;
	}

	if (record.role === "vendor" && isVendorOnboardingData(record.data)) {
		return { role: "vendor", data: record.data };
	}

	if (record.role === "couple" && isCoupleOnboardingData(record.data)) {
		return { role: "couple", data: record.data };
	}

	return null;
}

export function buildOnboardingPublicMetadata(
	payload: OnboardingPayload,
	completedAt = new Date().toISOString(),
): OnboardingPublicMetadata {
	return {
		role: payload.role,
		onboardingComplete: true,
		onboardingCompletedAt: completedAt,
		coupleProfile: payload.role === "couple" ? payload.data : null,
		vendorProfile: payload.role === "vendor" ? payload.data : null,
	};
}
