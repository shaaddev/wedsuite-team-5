import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="vendors/[id]" options={{ title: "Vendor" }} />
			<Stack.Screen name="onboarding" options={{ title: "Onboarding" }} />
			<Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
			<Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
		</Stack>
	);
}
