import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { OnboardingForm } from "@/app/onboarding/_components/onboarding-form";
import { getOnboardingState } from "@/lib/onboarding";

export default async function OnboardingPage() {
	const { userId } = await auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	const { onboardingComplete, role } = getOnboardingState(user.publicMetadata);
	if (onboardingComplete) {
		redirect("/dashboard");
	}

	return (
		<div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 py-10">
			<OnboardingForm initialRole={role} />
		</div>
	);
}
