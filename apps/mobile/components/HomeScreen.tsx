import { StyleSheet, Text, View } from "react-native";

export function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>WebSuite Mobile</Text>
			<Text style={styles.subtitle}>
				To get started, edit components/HomeScreen.tsx
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ffffff",
	},
	title: {
		fontSize: 32,
		fontWeight: "700",
		color: "#111827",
	},
	subtitle: {
		marginTop: 8,
		fontSize: 18,
		color: "#4b5563",
	},
});
