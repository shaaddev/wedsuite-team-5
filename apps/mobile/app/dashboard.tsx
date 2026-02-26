import { useAuth, useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { DashboardScreen } from "@/components/dashboard-screen";
import { AppButton, Screen } from "@/components/ui";
import { getOnboardingState } from "@/lib/onboarding";

export default function DashboardRoute() {
	const router = useRouter();
	const { signOut } = useClerk();
	const { isLoaded: authLoaded, isSignedIn } = useAuth();
	const { isLoaded: userLoaded, user } = useUser();
	const { onboardingComplete } = getOnboardingState(user);

	useEffect(() => {
		if (!authLoaded || !userLoaded) {
			return;
		}

		if (!isSignedIn) {
			router.replace("/sign-in");
			return;
		}

		if (!onboardingComplete) {
			router.replace("/onboarding");
		}
	}, [authLoaded, isSignedIn, onboardingComplete, router, userLoaded]);

	if (!authLoaded || !userLoaded) {
		return (
			<View style={styles.loader}>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<Screen>
			<DashboardScreen />
			<View style={styles.actions}>
				<AppButton label="Browse Vendors" onPress={() => router.push("/")} />
				<AppButton
					label="Sign Out"
					variant="outline"
					onPress={async () => {
						await signOut();
						router.replace("/sign-in");
					}}
				/>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	loader: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	actions: {
		marginTop: 16,
		gap: 10,
	},
});
