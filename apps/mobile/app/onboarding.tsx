import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { OnboardingForm } from "@/components/onboarding-form";
import { useMobileSession } from "@/lib/session-context";
import type {
	CoupleOnboardingData,
	UserRole,
	VendorOnboardingData,
} from "@/lib/onboarding";

interface OnboardingStatus {
	role: UserRole | null;
	onboardingComplete: boolean;
}

export default function OnboardingScreen() {
	const router = useRouter();
	const { isLoading, user } = useMobileSession();
	const [status, setStatus] = useState<OnboardingStatus>({
		role: null,
		onboardingComplete: false,
	});
	const [isStatusLoading, setIsStatusLoading] = useState(true);
	const [isPending, setIsPending] = useState(false);

	useEffect(() => {
		if (isLoading) {
			return;
		}

		if (!user) {
			router.replace("/sign-in");
			return;
		}

		const backendBaseUrl =
			process.env.EXPO_PUBLIC_BACKEND_URL ?? "http://localhost:3000";

		const loadStatus = async () => {
			try {
				const response = await fetch(
					`${backendBaseUrl}/api/onboarding/status`,
					{
						credentials: "include",
					},
				);
				if (response.ok) {
					const result = (await response.json()) as OnboardingStatus;
					setStatus(result);
					if (result.onboardingComplete) {
						router.replace("/(tabs)/planning");
					}
				}
			} finally {
				setIsStatusLoading(false);
			}
		};

		loadStatus().catch(() => {
			setIsStatusLoading(false);
		});
	}, [isLoading, router, user]);

	const onSubmit = async (
		role: UserRole,
		data: CoupleOnboardingData | VendorOnboardingData,
	) => {
		if (!user) {
			return;
		}

		setIsPending(true);
		try {
			const backendBaseUrl =
				process.env.EXPO_PUBLIC_BACKEND_URL ?? "http://localhost:3000";
			const response = await fetch(`${backendBaseUrl}/api/onboarding`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					role,
					data,
				}),
			});

			if (!response.ok) {
				const result = (await response.json()) as { error?: string };
				throw new Error(result.error ?? "Unable to save onboarding.");
			}

			router.replace("/(tabs)/planning");
		} catch (error) {
			Alert.alert(
				"Unable to save onboarding",
				error instanceof Error ? error.message : "Please try again.",
			);
		} finally {
			setIsPending(false);
		}
	};

	if (isLoading || isStatusLoading) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<OnboardingForm
			initialRole={status.role}
			onSubmit={onSubmit}
			isPending={isPending}
		/>
	);
}
