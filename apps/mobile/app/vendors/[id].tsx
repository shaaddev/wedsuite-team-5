import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { AppButton, Screen } from "@/components/ui";
import { VendorDetailScreen } from "@/components/vendor-detail-screen";
import { vendors } from "@/lib/data";

export default function VendorDetailRoute() {
	const router = useRouter();
	const params = useLocalSearchParams<{ id: string }>();
	const vendor = vendors.find((entry) => entry.id === params.id);

	if (!vendor) {
		return (
			<Screen>
				<Text style={{ fontSize: 22, fontWeight: "700", color: "#111827" }}>
					Vendor not found
				</Text>
				<View style={{ marginTop: 14 }}>
					<AppButton
						label="Back to vendors"
						onPress={() => router.replace("/")}
					/>
				</View>
			</Screen>
		);
	}

	return (
		<>
			<Stack.Screen options={{ title: vendor.name }} />
			<VendorDetailScreen vendor={vendor} />
		</>
	);
}
