import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

interface RequireAuthProps {
	children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
	const router = useRouter();
	const { isLoaded, isSignedIn } = useAuth();

	useEffect(() => {
		if (!isLoaded) {
			return;
		}

		if (!isSignedIn) {
			router.replace("/sign-in");
		}
	}, [isLoaded, isSignedIn, router]);

	if (!isLoaded) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator />
			</View>
		);
	}

	if (!isSignedIn) {
		return null;
	}

	return <>{children}</>;
}
