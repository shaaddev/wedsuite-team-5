import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import Constants from "expo-constants";
import { Stack } from "expo-router";

export default function RootLayout() {
	const publishableKey =
		process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ??
		Constants.expoConfig?.extra?.clerkPublishableKey;

	return (
		<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="vendors/[id]" options={{ title: "Vendor" }} />
				<Stack.Screen name="onboarding" options={{ title: "Onboarding" }} />
				<Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
				<Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
			</Stack>
		</ClerkProvider>
	);
}
