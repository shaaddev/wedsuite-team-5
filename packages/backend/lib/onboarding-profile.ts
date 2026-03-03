import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { onboardingProfiles } from "../../../db/schema";
import type { OnboardingPayload } from "../src/onboarding";

export async function getOnboardingProfile(userId: string) {
	const [profile] = await db
		.select()
		.from(onboardingProfiles)
		.where(eq(onboardingProfiles.userId, userId))
		.limit(1);

	return profile ?? null;
}

export async function upsertOnboardingProfile(
	userId: string,
	payload: OnboardingPayload,
) {
	const now = new Date();
	const data = payload.data;

	await db
		.insert(onboardingProfiles)
		.values({
			userId,
			role: payload.role,
			onboardingComplete: true,
			partnerOneName: payload.role === "couple" ? data.partnerOneName : null,
			partnerTwoName: payload.role === "couple" ? data.partnerTwoName : null,
			weddingDate: payload.role === "couple" ? data.weddingDate : null,
			location: data.location,
			businessName: payload.role === "vendor" ? data.businessName : null,
			category: payload.role === "vendor" ? data.category : null,
			startingPrice: payload.role === "vendor" ? data.startingPrice : null,
			createdAt: now,
			updatedAt: now,
		})
		.onConflictDoUpdate({
			target: onboardingProfiles.userId,
			set: {
				role: payload.role,
				onboardingComplete: true,
				partnerOneName: payload.role === "couple" ? data.partnerOneName : null,
				partnerTwoName: payload.role === "couple" ? data.partnerTwoName : null,
				weddingDate: payload.role === "couple" ? data.weddingDate : null,
				location: data.location,
				businessName: payload.role === "vendor" ? data.businessName : null,
				category: payload.role === "vendor" ? data.category : null,
				startingPrice: payload.role === "vendor" ? data.startingPrice : null,
				updatedAt: now,
			},
		});

	return getOnboardingProfile(userId);
}
