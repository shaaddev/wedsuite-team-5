import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { OnboardingForm } from "@/components/onboarding-form";
import type {
	CoupleOnboardingData,
	UserRole,
	VendorOnboardingData,
} from "@/lib/onboarding";
import { getOnboardingState } from "@/lib/onboarding";

export default function OnboardingScreen() {
	const router = useRouter();
	const { getToken, isLoaded: authLoaded, isSignedIn } = useAuth();
	const { isLoaded: userLoaded, user } = useUser();
	const [isPending, setIsPending] = useState(false);

	const onboardingState = getOnboardingState(user);

	useEffect(() => {
		if (!authLoaded || !userLoaded) {
			return;
		}

		if (!isSignedIn) {
			router.replace("/sign-in");
			return;
		}

		if (onboardingState.onboardingComplete) {
			router.replace("/dashboard");
		}
	}, [
		authLoaded,
		isSignedIn,
		onboardingState.onboardingComplete,
		router,
		userLoaded,
	]);

	const onSubmit = async (
		role: UserRole,
		data: CoupleOnboardingData | VendorOnboardingData,
	) => {
		if (!user) {
			return;
		}

		setIsPending(true);
		try {
			const token = await getToken();
			if (!token) {
				throw new Error("Missing session token.");
			}

			const backendBaseUrl =
				process.env.EXPO_PUBLIC_BACKEND_URL ?? "http://localhost:3000";
			const response = await fetch(`${backendBaseUrl}/api/onboarding`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					role,
					data,
				}),
			});

			if (!response.ok) {
				const result = (await response.json()) as { error?: string };
				throw new Error(result.error ?? "Unable to save onboarding.");
			}

			await user.reload();
			router.replace("/dashboard");
		} catch (error) {
			Alert.alert(
				"Unable to save onboarding",
				error instanceof Error ? error.message : "Please try again.",
			);
		} finally {
			setIsPending(false);
		}
	};

	if (!authLoaded || !userLoaded) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<OnboardingForm
			initialRole={onboardingState.role}
			onSubmit={onSubmit}
			isPending={isPending}
		/>
	);
}
