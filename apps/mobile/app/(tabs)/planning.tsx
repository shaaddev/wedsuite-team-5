import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { DashboardScreen } from "@/components/dashboard-screen";
import { RequireAuth } from "@/components/require-auth";
import { getOnboardingState } from "@/lib/onboarding";

export default function PlanningTab() {
	const router = useRouter();
	const { isLoaded, user } = useUser();
	const { onboardingComplete } = getOnboardingState(user);

	useEffect(() => {
		if (!isLoaded) {
			return;
		}

		if (!onboardingComplete) {
			router.replace("/onboarding");
		}
	}, [isLoaded, onboardingComplete, router]);

	return (
		<RequireAuth>
			<DashboardScreen />
		</RequireAuth>
	);
}
