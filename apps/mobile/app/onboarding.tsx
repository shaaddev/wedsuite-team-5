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
	const { isLoaded: authLoaded, isSignedIn } = useAuth();
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
			await user.update({
				unsafeMetadata: {
					role,
					onboardingComplete: true,
					onboardingCompletedAt: new Date().toISOString(),
					coupleProfile: role === "couple" ? data : null,
					vendorProfile: role === "vendor" ? data : null,
				},
			});
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
