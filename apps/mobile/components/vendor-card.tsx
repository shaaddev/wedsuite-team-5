import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Vendor } from "@/lib/data";

interface VendorCardProps {
	vendor: Vendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
	return (
		<Link href={`/vendors/${vendor.id}`} asChild>
			<Pressable style={styles.card}>
				<View style={styles.headerRow}>
					<Text style={styles.category}>{vendor.category}</Text>
					<Text style={styles.rating}>
						{vendor.rating} ({vendor.reviewCount})
					</Text>
				</View>
				<Text style={styles.name}>{vendor.name}</Text>
				<Text style={styles.description}>{vendor.description}</Text>
				<View style={styles.footerRow}>
					<Text style={styles.meta}>{vendor.location}</Text>
					<Text style={styles.price}>{vendor.priceRange}</Text>
				</View>
			</Pressable>
		</Link>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#ffffff",
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#e5e7eb",
		padding: 14,
		gap: 8,
	},
	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	category: {
		fontSize: 11,
		fontWeight: "700",
		color: "#4b5563",
		textTransform: "uppercase",
	},
	rating: {
		fontSize: 12,
		color: "#111827",
		fontWeight: "600",
	},
	name: {
		fontSize: 18,
		fontWeight: "700",
		color: "#111827",
	},
	description: {
		fontSize: 14,
		color: "#4b5563",
		lineHeight: 20,
	},
	footerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 6,
	},
	meta: {
		fontSize: 13,
		color: "#4b5563",
	},
	price: {
		fontSize: 13,
		fontWeight: "700",
		color: "#111827",
	},
});
