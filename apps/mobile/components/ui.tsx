import type { PropsWithChildren } from "react";
import {
	Pressable,
	type StyleProp,
	StyleSheet,
	Text,
	TextInput,
	View,
	type ViewStyle,
} from "react-native";

interface ScreenProps extends PropsWithChildren {
	style?: StyleProp<ViewStyle>;
}

interface AppInputProps {
	value: string;
	onChangeText: (value: string) => void;
	placeholder: string;
	secureTextEntry?: boolean;
}

interface AppButtonProps {
	label: string;
	onPress: () => void;
	disabled?: boolean;
	variant?: "solid" | "outline";
}

interface ChipProps {
	label: string;
	selected: boolean;
	onPress: () => void;
}

export function Screen({ children, style }: ScreenProps) {
	return <View style={[styles.screen, style]}>{children}</View>;
}

export function AppInput({
	value,
	onChangeText,
	placeholder,
	secureTextEntry,
}: AppInputProps) {
	return (
		<TextInput
			value={value}
			onChangeText={onChangeText}
			placeholder={placeholder}
			secureTextEntry={secureTextEntry}
			autoCapitalize="none"
			style={styles.input}
			placeholderTextColor="#6b7280"
		/>
	);
}

export function AppButton({
	label,
	onPress,
	disabled,
	variant = "solid",
}: AppButtonProps) {
	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			style={[
				styles.button,
				variant === "solid" ? styles.buttonSolid : styles.buttonOutline,
				disabled && styles.buttonDisabled,
			]}
		>
			<Text
				style={[
					styles.buttonLabel,
					variant === "solid"
						? styles.buttonLabelSolid
						: styles.buttonLabelOutline,
				]}
			>
				{label}
			</Text>
		</Pressable>
	);
}

export function Chip({ label, selected, onPress }: ChipProps) {
	return (
		<Pressable
			onPress={onPress}
			style={[styles.chip, selected ? styles.chipSelected : styles.chipIdle]}
		>
			<Text
				style={[styles.chipText, selected ? styles.chipTextSelected : null]}
			>
				{label}
			</Text>
		</Pressable>
	);
}

export const uiStyles = StyleSheet.create({
	heading: {
		fontSize: 28,
		fontWeight: "700",
		color: "#111827",
	},
	subheading: {
		fontSize: 15,
		color: "#4b5563",
	},
	label: {
		fontSize: 13,
		fontWeight: "600",
		color: "#374151",
		marginBottom: 6,
	},
	section: {
		marginTop: 16,
		gap: 10,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
});

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#f8fafc",
		paddingHorizontal: 16,
		paddingVertical: 14,
	},
	input: {
		borderWidth: 1,
		borderColor: "#d1d5db",
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 15,
		color: "#111827",
		backgroundColor: "#ffffff",
	},
	button: {
		borderRadius: 10,
		paddingHorizontal: 14,
		paddingVertical: 11,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonSolid: {
		backgroundColor: "#111827",
	},
	buttonOutline: {
		backgroundColor: "#ffffff",
		borderWidth: 1,
		borderColor: "#d1d5db",
	},
	buttonDisabled: {
		opacity: 0.55,
	},
	buttonLabel: {
		fontSize: 14,
		fontWeight: "700",
	},
	buttonLabelSolid: {
		color: "#ffffff",
	},
	buttonLabelOutline: {
		color: "#111827",
	},
	chip: {
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderRadius: 999,
		borderWidth: 1,
	},
	chipIdle: {
		backgroundColor: "#ffffff",
		borderColor: "#d1d5db",
	},
	chipSelected: {
		backgroundColor: "#1f2937",
		borderColor: "#1f2937",
	},
	chipText: {
		fontSize: 13,
		fontWeight: "600",
		color: "#374151",
	},
	chipTextSelected: {
		color: "#f9fafb",
	},
});
