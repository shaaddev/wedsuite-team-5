import { getOnboardingProfile } from "@websuite/backend/lib/onboarding-profile";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/dashboard-content";
import { getServerSession } from "@/lib/auth";
import { getOnboardingState } from "@/lib/onboarding";

export const metadata: Metadata = {
	title: "My Dashboard | WedSuite",
	description:
		"Manage your wedding timeline, budget, and booked vendors all in one place.",
};

export default async function DashboardPage() {
	const session = await getServerSession();
	if (!session?.user?.id) {
		redirect("/sign-in");
	}

	const profile = await getOnboardingProfile(session.user.id);
	const { onboardingComplete } = getOnboardingState(profile);
	if (!onboardingComplete) {
		redirect("/onboarding");
	}

	return <DashboardContent />;
}
