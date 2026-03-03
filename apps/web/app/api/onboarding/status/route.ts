import { auth } from "@websuite/backend/lib/auth";
import { getOnboardingProfile } from "@websuite/backend/lib/onboarding-profile";
import { NextResponse } from "next/server";
import { getOnboardingState } from "@/lib/onboarding";

export async function GET(request: Request) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (!session?.user?.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const profile = await getOnboardingProfile(session.user.id);
	const state = getOnboardingState(profile);

	return NextResponse.json(state);
}
