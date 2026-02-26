import { useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton, AppInput, Chip, Screen, uiStyles } from "@/components/ui";
import { categories } from "@/lib/data";
import type {
	CoupleOnboardingData,
	UserRole,
	VendorOnboardingData,
} from "@/lib/onboarding";

interface OnboardingFormProps {
	initialRole: UserRole | null;
	onSubmit: (
		role: UserRole,
		data: CoupleOnboardingData | VendorOnboardingData,
	) => Promise<void>;
	isPending: boolean;
}

const defaultCoupleData: CoupleOnboardingData = {
	partnerOneName: "",
	partnerTwoName: "",
	weddingDate: "",
	location: "",
};

const defaultVendorData: VendorOnboardingData = {
	businessName: "",
	category: "",
	location: "",
	startingPrice: "",
};

export function OnboardingForm({
	initialRole,
	onSubmit,
	isPending,
}: OnboardingFormProps) {
	const [role, setRole] = useState<UserRole | null>(initialRole);
	const [coupleData, setCoupleData] =
		useState<CoupleOnboardingData>(defaultCoupleData);
	const [vendorData, setVendorData] =
		useState<VendorOnboardingData>(defaultVendorData);

	const formData = useMemo(() => {
		if (role === "vendor") {
			return vendorData;
		}
		return coupleData;
	}, [coupleData, role, vendorData]);

	const hasRequiredValues = useMemo(() => {
		const values = Object.values(formData);
		return (
			values.length > 0 && values.every((value) => value.trim().length > 0)
		);
	}, [formData]);

	const handleSubmit = async () => {
		if (!role) {
			Alert.alert("Select a role", "Please choose vendor or couple first.");
			return;
		}
		if (!hasRequiredValues) {
			Alert.alert("Incomplete form", "Please fill in all required fields.");
			return;
		}

		await onSubmit(role, formData);
	};

	return (
		<Screen>
			<ScrollView contentContainerStyle={styles.content}>
				<Text style={uiStyles.heading}>Finish onboarding</Text>
				<Text style={[uiStyles.subheading, styles.subtitle]}>
					Choose your account type and share a few details.
				</Text>

				<View style={uiStyles.section}>
					<Text style={uiStyles.label}>I am a...</Text>
					<View style={styles.chips}>
						<Chip
							label="Couple"
							selected={role === "couple"}
							onPress={() => setRole("couple")}
						/>
						<Chip
							label="Vendor"
							selected={role === "vendor"}
							onPress={() => setRole("vendor")}
						/>
					</View>
				</View>

				{role === "couple" ? (
					<View style={uiStyles.section}>
						<Text style={uiStyles.label}>Partner One Name</Text>
						<AppInput
							value={coupleData.partnerOneName}
							onChangeText={(value) =>
								setCoupleData((previous) => ({
									...previous,
									partnerOneName: value,
								}))
							}
							placeholder="Avery"
						/>
						<Text style={uiStyles.label}>Partner Two Name</Text>
						<AppInput
							value={coupleData.partnerTwoName}
							onChangeText={(value) =>
								setCoupleData((previous) => ({
									...previous,
									partnerTwoName: value,
								}))
							}
							placeholder="Jordan"
						/>
						<Text style={uiStyles.label}>Wedding Date</Text>
						<AppInput
							value={coupleData.weddingDate}
							onChangeText={(value) =>
								setCoupleData((previous) => ({
									...previous,
									weddingDate: value,
								}))
							}
							placeholder="2026-09-12"
						/>
						<Text style={uiStyles.label}>Wedding Location</Text>
						<AppInput
							value={coupleData.location}
							onChangeText={(value) =>
								setCoupleData((previous) => ({
									...previous,
									location: value,
								}))
							}
							placeholder="San Francisco, CA"
						/>
					</View>
				) : null}

				{role === "vendor" ? (
					<View style={uiStyles.section}>
						<Text style={uiStyles.label}>Business Name</Text>
						<AppInput
							value={vendorData.businessName}
							onChangeText={(value) =>
								setVendorData((previous) => ({
									...previous,
									businessName: value,
								}))
							}
							placeholder="Golden Hour Studio"
						/>
						<Text style={uiStyles.label}>Category</Text>
						<View style={styles.chips}>
							{categories.map((category) => (
								<Chip
									key={category}
									label={category}
									selected={vendorData.category === category}
									onPress={() =>
										setVendorData((previous) => ({
											...previous,
											category,
										}))
									}
								/>
							))}
						</View>
						<Text style={uiStyles.label}>Business Location</Text>
						<AppInput
							value={vendorData.location}
							onChangeText={(value) =>
								setVendorData((previous) => ({
									...previous,
									location: value,
								}))
							}
							placeholder="San Francisco, CA"
						/>
						<Text style={uiStyles.label}>Starting Price</Text>
						<AppInput
							value={vendorData.startingPrice}
							onChangeText={(value) =>
								setVendorData((previous) => ({
									...previous,
									startingPrice: value,
								}))
							}
							placeholder="$2,500"
						/>
					</View>
				) : null}

				<View style={styles.footer}>
					<AppButton
						label={isPending ? "Saving..." : "Continue"}
						onPress={handleSubmit}
						disabled={isPending}
					/>
				</View>
			</ScrollView>
		</Screen>
	);
}

const styles = StyleSheet.create({
	content: {
		paddingBottom: 30,
	},
	subtitle: {
		marginTop: 6,
	},
	chips: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	footer: {
		marginTop: 24,
	},
});
