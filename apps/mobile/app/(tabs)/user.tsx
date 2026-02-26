import { useAuth, useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AppButton, Screen, uiStyles } from "@/components/ui";

export default function UserTab() {
	const router = useRouter();
	const { isLoaded, isSignedIn } = useAuth();
	const { signOut } = useClerk();
	const { user } = useUser();

	if (!isLoaded) {
		return (
			<Screen>
				<Text style={uiStyles.subheading}>Loading user...</Text>
			</Screen>
		);
	}

	if (!isSignedIn) {
		return (
			<Screen>
				<Text style={uiStyles.heading}>Welcome</Text>
				<Text style={[uiStyles.subheading, styles.copy]}>
					Sign in or register to access vendors and planning.
				</Text>
				<View style={styles.actions}>
					<AppButton label="Sign In" onPress={() => router.push("/sign-in")} />
					<AppButton
						label="Register"
						variant="outline"
						onPress={() => router.push("/sign-up")}
					/>
				</View>
			</Screen>
		);
	}

	return (
		<Screen>
			<Text style={uiStyles.heading}>Your Account</Text>
			<Text style={[uiStyles.subheading, styles.copy]}>
				{user?.primaryEmailAddress?.emailAddress ?? "Signed in"}
			</Text>
			<View style={styles.actions}>
				<AppButton
					label="Edit Onboarding"
					variant="outline"
					onPress={() => router.push("/onboarding")}
				/>
				<AppButton
					label="Sign Out"
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
	copy: {
		marginTop: 6,
	},
	actions: {
		marginTop: 16,
		gap: 10,
	},
});
