import { auth, currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/dashboard-content";
import { getOnboardingState } from "@/lib/onboarding";

export const metadata: Metadata = {
	title: "My Dashboard | WedSuite",
	description:
		"Manage your wedding timeline, budget, and booked vendors all in one place.",
};

export default async function DashboardPage() {
	const { userId } = await auth();
	if (!userId) {
		redirect("/sign-in");
	}

	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	const { onboardingComplete } = getOnboardingState(user.publicMetadata);
	if (!onboardingComplete) {
		redirect("/onboarding");
	}

	return <DashboardContent />;
}
