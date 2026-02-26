import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton, AppInput, Screen, uiStyles } from "@/components/ui";

interface AuthFormProps {
	title: string;
	subtitle: string;
	requestCodeLabel: string;
	verifyCodeLabel: string;
	secondaryHref: "/sign-in" | "/sign-up";
	secondaryLabel: string;
	isPending: boolean;
	errorMessage: string;
	isCodeStep: boolean;
	onRequestCode: (email: string) => void;
	onVerifyCode: (code: string) => void;
	onUseDifferentEmail?: () => void;
}

export function AuthForm({
	title,
	subtitle,
	requestCodeLabel,
	verifyCodeLabel,
	secondaryHref,
	secondaryLabel,
	isPending,
	errorMessage,
	isCodeStep,
	onRequestCode,
	onVerifyCode,
	onUseDifferentEmail,
}: AuthFormProps) {
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");

	return (
		<Screen style={styles.screen}>
			<View style={styles.card}>
				<Text style={uiStyles.heading}>{title}</Text>
				<Text style={[uiStyles.subheading, styles.subtitle]}>{subtitle}</Text>

				{isCodeStep ? (
					<View style={uiStyles.section}>
						<Text style={uiStyles.label}>Verification Code</Text>
						<AppInput
							value={code}
							onChangeText={setCode}
							placeholder="123456"
						/>
						{onUseDifferentEmail ? (
							<AppButton
								label="Use Different Email"
								onPress={onUseDifferentEmail}
								variant="outline"
							/>
						) : null}
					</View>
				) : (
					<View style={uiStyles.section}>
						<Text style={uiStyles.label}>Email</Text>
						<AppInput
							value={email}
							onChangeText={setEmail}
							placeholder="you@example.com"
						/>
					</View>
				)}

				{errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

				<View style={styles.actions}>
					<AppButton
						label={
							isPending
								? "Please wait..."
								: isCodeStep
									? verifyCodeLabel
									: requestCodeLabel
						}
						onPress={() =>
							isCodeStep
								? onVerifyCode(code.trim())
								: onRequestCode(email.trim())
						}
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
