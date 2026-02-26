import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isUserRole, type UserRole } from "@/lib/onboarding";

function getNonEmptyString(value: unknown) {
	return typeof value === "string" && value.trim().length > 0;
}

function isValidCoupleData(data: unknown) {
	if (typeof data !== "object" || !data) {
		return false;
	}

	const values = data as Record<string, unknown>;
	return (
		getNonEmptyString(values.partnerOneName) &&
		getNonEmptyString(values.partnerTwoName) &&
		getNonEmptyString(values.weddingDate) &&
		getNonEmptyString(values.location)
	);
}

function isValidVendorData(data: unknown) {
	if (typeof data !== "object" || !data) {
		return false;
	}

	const values = data as Record<string, unknown>;
	return (
		getNonEmptyString(values.businessName) &&
		getNonEmptyString(values.category) &&
		getNonEmptyString(values.location) &&
		getNonEmptyString(values.startingPrice)
	);
}

export async function POST(request: Request) {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const payload = (await request.json()) as {
		role?: unknown;
		data?: unknown;
	};

	if (!isUserRole(payload.role)) {
		return NextResponse.json(
			{ error: "Please select a valid role." },
			{ status: 400 },
		);
	}

	const role = payload.role as UserRole;
	const hasValidData =
		role === "vendor"
			? isValidVendorData(payload.data)
			: isValidCoupleData(payload.data);

	if (!hasValidData) {
		return NextResponse.json(
			{ error: "Please complete all required fields." },
			{ status: 400 },
		);
	}

	const client = await clerkClient();
	await client.users.updateUserMetadata(userId, {
		publicMetadata: {
			role,
			onboardingComplete: true,
			onboardingCompletedAt: new Date().toISOString(),
			coupleProfile: role === "couple" ? payload.data : null,
			vendorProfile: role === "vendor" ? payload.data : null,
		},
	});

	return NextResponse.json({ success: true });
}
