import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useMobileSession } from "@/lib/session-context";

interface RequireAuthProps {
	children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
	const router = useRouter();
	const { isLoading, user } = useMobileSession();

	useEffect(() => {
		if (isLoading) {
			return;
		}

		if (!user) {
			router.replace("/sign-in");
		}
	}, [isLoading, router, user]);

	if (isLoading) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator />
			</View>
		);
	}

	if (!user) {
		return null;
	}

	return <>{children}</>;
}
