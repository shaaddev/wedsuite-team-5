import { auth, clerkClient } from "@clerk/nextjs/server";
import {
	buildOnboardingPublicMetadata,
	parseOnboardingPayload,
} from "@websuite/backend/onboarding";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const rawPayload = (await request.json()) as unknown;
	const payload = parseOnboardingPayload(rawPayload);
	if (!payload) {
		return NextResponse.json(
			{ error: "Please complete all required fields." },
			{ status: 400 },
		);
	}

	const client = await clerkClient();
	await client.users.updateUserMetadata(userId, {
		publicMetadata: buildOnboardingPublicMetadata(payload),
	});

	return NextResponse.json({ success: true });
}
