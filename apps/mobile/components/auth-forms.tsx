import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton, AppInput, Screen, uiStyles } from "@/components/ui";

interface AuthFormProps {
	title: string;
	subtitle: string;
	submitLabel: string;
	secondaryHref: "/sign-in" | "/sign-up";
	secondaryLabel: string;
	isPending: boolean;
	errorMessage: string;
	onSubmit: (email: string, password: string) => void;
}

export function AuthForm({
	title,
	subtitle,
	submitLabel,
	secondaryHref,
	secondaryLabel,
	isPending,
	errorMessage,
	onSubmit,
}: AuthFormProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<Screen style={styles.screen}>
			<View style={styles.card}>
				<Text style={uiStyles.heading}>{title}</Text>
				<Text style={[uiStyles.subheading, styles.subtitle]}>{subtitle}</Text>

				<View style={uiStyles.section}>
					<Text style={uiStyles.label}>Email</Text>
					<AppInput
						value={email}
						onChangeText={setEmail}
						placeholder="you@example.com"
					/>
				</View>

				<View style={uiStyles.section}>
					<Text style={uiStyles.label}>Password</Text>
					<AppInput
						value={password}
						onChangeText={setPassword}
						placeholder="Password"
						secureTextEntry
					/>
				</View>

				{errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

				<View style={styles.actions}>
					<AppButton
						label={isPending ? "Please wait..." : submitLabel}
						onPress={() => onSubmit(email, password)}
						disabled={isPending}
					/>
					<Link href={secondaryHref} style={styles.secondaryLink}>
						{secondaryLabel}
					</Link>
				</View>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	screen: {
		justifyContent: "center",
	},
	card: {
		backgroundColor: "#ffffff",
		borderRadius: 14,
		padding: 18,
		borderWidth: 1,
		borderColor: "#e5e7eb",
	},
	subtitle: {
		marginTop: 6,
	},
	actions: {
		marginTop: 18,
		gap: 12,
	},
	error: {
		marginTop: 12,
		color: "#b91c1c",
		fontSize: 13,
	},
	secondaryLink: {
		textAlign: "center",
		color: "#374151",
		fontWeight: "600",
	},
});
