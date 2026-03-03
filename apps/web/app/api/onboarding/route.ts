import { auth } from "@websuite/backend/lib/auth";
import { upsertOnboardingProfile } from "@websuite/backend/lib/onboarding-profile";
import { parseOnboardingPayload } from "@websuite/backend/onboarding";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (!session?.user?.id) {
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

	await upsertOnboardingProfile(session.user.id, payload);

	return NextResponse.json({ success: true });
}
