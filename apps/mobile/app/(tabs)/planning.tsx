import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { DashboardScreen } from "@/components/dashboard-screen";
import { RequireAuth } from "@/components/require-auth";
import { authClient } from "@/lib/auth-client";

export default function PlanningTab() {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();
	const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);

	useEffect(() => {
		if (isPending || !session?.user) {
			return;
		}

		const backendBaseUrl =
			process.env.EXPO_PUBLIC_BACKEND_URL ?? "http://localhost:3000";

		const checkOnboarding = async () => {
			try {
				const response = await fetch(
					`${backendBaseUrl}/api/onboarding/status`,
					{
						credentials: "include",
					},
				);

				if (!response.ok) {
					router.replace("/onboarding");
					return;
				}

				const result = (await response.json()) as {
					onboardingComplete?: boolean;
				};

				if (!result.onboardingComplete) {
					router.replace("/onboarding");
				}
			} finally {
				setIsCheckingOnboarding(false);
			}
		};

		checkOnboarding().catch(() => {
			setIsCheckingOnboarding(false);
			router.replace("/onboarding");
		});
	}, [isPending, router, session?.user]);

	if (isCheckingOnboarding) {
		return null;
	}

	return (
		<RequireAuth>
			<DashboardScreen />
		</RequireAuth>
	);
}
