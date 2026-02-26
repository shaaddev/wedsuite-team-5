"use client";

import { useMemo, useState } from "react";
import {
	Modal,
	ScrollView,
	type ScrollViewProps,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { AppButton, AppInput, Chip, Screen, uiStyles } from "@/components/ui";
import { VendorCard } from "@/components/vendor-card";
import {
	categories,
	getPriceBucketFromRange,
	type PriceBucket,
	priceBuckets,
	uniqueLocations,
	vendors,
} from "@/lib/data";

const sortOptions = [
	{ value: "featured", label: "Featured" },
	{ value: "rating", label: "Highest Rated" },
	{ value: "reviews", label: "Most Reviews" },
	{ value: "name", label: "Name A-Z" },
] as const;

type SortOption = (typeof sortOptions)[number]["value"];

export function VendorsScreen() {
	const [searchQuery, setSearchQuery] = useState("");
	const [locationQuery, setLocationQuery] = useState("");
	const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
	const [selectedPriceBuckets, setSelectedPriceBuckets] = useState<
		PriceBucket[]
	>([]);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedSort, setSelectedSort] = useState<SortOption>("featured");
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);

	const filteredVendors = useMemo(() => {
		let result = [...vendors];

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(vendor) =>
					vendor.name.toLowerCase().includes(query) ||
					vendor.location.toLowerCase().includes(query) ||
					vendor.category.toLowerCase().includes(query) ||
					vendor.description.toLowerCase().includes(query),
			);
		}

		if (locationQuery.trim()) {
			const query = locationQuery.toLowerCase();
			result = result.filter((vendor) =>
				vendor.location.toLowerCase().includes(query),
			);
		}

		if (selectedLocations.length > 0) {
			result = result.filter((vendor) =>
				selectedLocations.includes(vendor.location),
			);
		}

		if (selectedPriceBuckets.length > 0) {
			result = result.filter((vendor) =>
				selectedPriceBuckets.includes(
					getPriceBucketFromRange(vendor.priceRange),
				),
			);
		}

		if (selectedCategory !== "all") {
			result = result.filter((vendor) => vendor.category === selectedCategory);
		}

		switch (selectedSort) {
			case "rating":
				result.sort((a, b) => b.rating - a.rating);
				break;
			case "reviews":
				result.sort((a, b) => b.reviewCount - a.reviewCount);
				break;
			case "name":
				result.sort((a, b) => a.name.localeCompare(b.name));
				break;
			default:
				result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
				break;
		}

		return result;
	}, [
		locationQuery,
		searchQuery,
		selectedCategory,
		selectedLocations,
		selectedPriceBuckets,
		selectedSort,
	]);

	const toggleValue = (items: string[], value: string) =>
		items.includes(value)
			? items.filter((item) => item !== value)
			: [...items, value];

	return (
		<Screen>
			<ScrollView contentContainerStyle={styles.content}>
				<Text style={uiStyles.heading}>Browse Vendors</Text>
				<Text style={[uiStyles.subheading, styles.subtitle]}>
					{filteredVendors.length} vendor
					{filteredVendors.length === 1 ? "" : "s"} available
				</Text>

				<View style={uiStyles.section}>
					<AppInput
						value={searchQuery}
						onChangeText={setSearchQuery}
						placeholder="Search vendors"
					/>
					<AppInput
						value={locationQuery}
						onChangeText={setLocationQuery}
						placeholder="Location (city, state)"
					/>
					<AppButton
						label="Open filters"
						onPress={() => setIsFiltersOpen(true)}
					/>
				</View>

				<View style={styles.list}>
					{filteredVendors.length === 0 ? (
						<Text style={styles.empty}>No vendors match your filters.</Text>
					) : (
						filteredVendors.map((vendor) => (
							<VendorCard key={vendor.id} vendor={vendor} />
						))
					)}
				</View>
			</ScrollView>

			<FiltersModal
				visible={isFiltersOpen}
				onClose={() => setIsFiltersOpen(false)}
				selectedCategory={selectedCategory}
				onCategoryChange={setSelectedCategory}
				selectedSort={selectedSort}
				onSortChange={setSelectedSort}
				selectedLocations={selectedLocations}
				onLocationToggle={(value) =>
					setSelectedLocations((current) => toggleValue(current, value))
				}
				selectedPriceBuckets={selectedPriceBuckets}
				onPriceBucketToggle={(value) =>
					setSelectedPriceBuckets(
						(current) => toggleValue(current, value) as PriceBucket[],
					)
				}
				onReset={() => {
					setSelectedCategory("all");
					setSelectedSort("featured");
					setSelectedLocations([]);
					setSelectedPriceBuckets([]);
				}}
			/>
		</Screen>
	);
}

interface FiltersModalProps {
	visible: boolean;
	onClose: () => void;
	selectedCategory: string;
	onCategoryChange: (value: string) => void;
	selectedSort: SortOption;
	onSortChange: (value: SortOption) => void;
	selectedLocations: string[];
	onLocationToggle: (value: string) => void;
	selectedPriceBuckets: PriceBucket[];
	onPriceBucketToggle: (value: PriceBucket) => void;
	onReset: () => void;
}

function FiltersModal({
	visible,
	onClose,
	selectedCategory,
	onCategoryChange,
	selectedSort,
	onSortChange,
	selectedLocations,
	onLocationToggle,
	selectedPriceBuckets,
	onPriceBucketToggle,
	onReset,
}: FiltersModalProps) {
	return (
		<Modal visible={visible} animationType="slide" onRequestClose={onClose}>
			<Screen>
				<ScrollView
					contentContainerStyle={
						styles.modalContent as ScrollViewProps["contentContainerStyle"]
					}
				>
					<Text style={uiStyles.heading}>Filters</Text>

					<View style={uiStyles.section}>
						<Text style={uiStyles.label}>Category</Text>
						<View style={styles.chipsWrap}>
							<Chip
								label="All"
								selected={selectedCategory === "all"}
								onPress={() => onCategoryChange("all")}
							/>
							{categories.map((category) => (
								<Chip
									key={category}
									label={category}
									selected={selectedCategory === category}
									onPress={() => onCategoryChange(category)}
								/>
							))}
						</View>
					</View>

					<View style={uiStyles.section}>
						<Text style={uiStyles.label}>Sort</Text>
						<View style={styles.chipsWrap}>
							{sortOptions.map((option) => (
								<Chip
									key={option.value}
									label={option.label}
									selected={selectedSort === option.value}
									onPress={() => onSortChange(option.value)}
								/>
							))}
						</View>
					</View>

					<View style={uiStyles.section}>
						<Text style={uiStyles.label}>Locations</Text>
						<View style={styles.chipsWrap}>
							{uniqueLocations.map((location) => (
								<Chip
									key={location}
									label={location}
									selected={selectedLocations.includes(location)}
									onPress={() => onLocationToggle(location)}
								/>
							))}
						</View>
					</View>

					<View style={uiStyles.section}>
						<Text style={uiStyles.label}>Price Buckets</Text>
						<View style={styles.chipsWrap}>
							{priceBuckets.map((bucket) => (
								<Chip
									key={bucket}
									label={bucket}
									selected={selectedPriceBuckets.includes(bucket)}
									onPress={() => onPriceBucketToggle(bucket)}
								/>
							))}
						</View>
					</View>

					<View style={styles.modalActions}>
						<AppButton label="Reset" onPress={onReset} variant="outline" />
						<AppButton label="Apply" onPress={onClose} />
					</View>
				</ScrollView>
			</Screen>
		</Modal>
	);
}

const styles = StyleSheet.create({
	content: {
		paddingBottom: 32,
	},
	subtitle: {
		marginTop: 4,
	},
	list: {
		marginTop: 18,
		gap: 10,
	},
	empty: {
		fontSize: 14,
		color: "#4b5563",
	},
	modalContent: {
		paddingBottom: 24,
	},
	chipsWrap: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	modalActions: {
		marginTop: 24,
		gap: 10,
	},
});
