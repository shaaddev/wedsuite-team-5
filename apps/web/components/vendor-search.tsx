"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/data";

interface VendorSearchProps {
	searchQuery: string;
	onSearchChange: (query: string) => void;
	selectedCategory: string;
	onCategoryChange: (category: string) => void;
	selectedSort: string;
	onSortChange: (sort: string) => void;
}

export function VendorSearch({
	searchQuery,
	onSearchChange,
	selectedCategory,
	onCategoryChange,
	selectedSort,
	onSortChange,
}: VendorSearchProps) {
	return (
		<div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm sm:flex-row sm:items-center">
			<div className="relative flex-1">
				<Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					placeholder="Search vendors..."
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					className="border-0 bg-transparent pl-10 shadow-none placeholder:text-muted-foreground/60 focus-visible:ring-0"
					aria-label="Search vendors"
				/>
			</div>
			<div className="h-px bg-border/60 sm:h-8 sm:w-px" />
			<div className="flex gap-3">
				<Select value={selectedCategory} onValueChange={onCategoryChange}>
					<SelectTrigger
						className="w-[180px] border-0 bg-transparent shadow-none text-sm"
						aria-label="Filter by category"
					>
						<SelectValue placeholder="All Categories" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Categories</SelectItem>
						{categories.map((category) => (
							<SelectItem key={category} value={category}>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select value={selectedSort} onValueChange={onSortChange}>
					<SelectTrigger
						className="w-[160px] border-0 bg-transparent shadow-none text-sm"
						aria-label="Sort vendors"
					>
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="featured">Featured</SelectItem>
						<SelectItem value="rating">Highest Rated</SelectItem>
						<SelectItem value="reviews">Most Reviews</SelectItem>
						<SelectItem value="name">Name A-Z</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
