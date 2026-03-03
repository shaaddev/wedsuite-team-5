import { getOnboardingProfile } from "@websuite/backend/lib/onboarding-profile";
import { redirect } from "next/navigation";
import { OnboardingForm } from "@/app/onboarding/_components/onboarding-form";
import { getServerSession } from "@/lib/auth";
import { getOnboardingState } from "@/lib/onboarding";

export default async function OnboardingPage() {
	const session = await getServerSession();
	if (!session?.user?.id) {
		redirect("/sign-in");
	}

	const profile = await getOnboardingProfile(session.user.id);
	const { onboardingComplete, role } = getOnboardingState(profile);
	if (onboardingComplete) {
		redirect("/dashboard");
	}

	return (
		<div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 py-10">
			<OnboardingForm initialRole={role} />
		</div>
	);
}
