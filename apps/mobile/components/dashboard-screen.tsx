import { StyleSheet, Text, View } from "react-native";
import { Screen, uiStyles } from "@/components/ui";

export function DashboardScreen() {
	return (
		<Screen>
			<Text style={uiStyles.heading}>Planning Dashboard</Text>
			<Text style={[uiStyles.subheading, styles.subtitle]}>
				Track your budget, timeline, and vendor decisions.
			</Text>

			<View style={styles.grid}>
				<Card title="Timeline" value="7 tasks pending" />
				<Card title="Budget" value="$8,300 remaining" />
				<Card title="Booked Vendors" value="4 confirmed" />
				<Card title="Next Milestone" value="Menu tasting" />
			</View>
		</Screen>
	);
}

interface CardProps {
	title: string;
	value: string;
}

function Card({ title, value }: CardProps) {
	return (
		<View style={styles.card}>
			<Text style={styles.cardTitle}>{title}</Text>
			<Text style={styles.cardValue}>{value}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	subtitle: {
		marginTop: 6,
	},
	grid: {
		marginTop: 20,
		gap: 10,
	},
	card: {
		borderWidth: 1,
		borderColor: "#e5e7eb",
		backgroundColor: "#ffffff",
		borderRadius: 12,
		padding: 14,
	},
	cardTitle: {
		fontSize: 12,
		fontWeight: "700",
		color: "#4b5563",
		textTransform: "uppercase",
	},
	cardValue: {
		marginTop: 6,
		fontSize: 18,
		fontWeight: "700",
		color: "#111827",
	},
});
