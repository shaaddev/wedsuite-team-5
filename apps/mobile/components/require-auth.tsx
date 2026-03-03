import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { authClient } from "@/lib/auth-client";

interface RequireAuthProps {
	children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	useEffect(() => {
		if (isPending) {
			return;
		}

		if (!session?.user) {
			router.replace("/sign-in");
		}
	}, [isPending, router, session?.user]);

	if (isPending) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator />
			</View>
		);
	}

	if (!session?.user) {
		return null;
	}

	return <>{children}</>;
}
