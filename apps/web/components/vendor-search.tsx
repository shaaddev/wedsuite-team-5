"use client";

import { ChevronDown, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, type PriceBucket, priceBuckets } from "@/lib/data";

interface VendorSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  locationQuery: string;
  onLocationQueryChange: (query: string) => void;
  availableLocations: string[];
  selectedLocations: string[];
  onLocationToggle: (location: string) => void;
  selectedPriceBuckets: PriceBucket[];
  onPriceBucketToggle: (bucket: PriceBucket) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
}

export function VendorSearch({
  searchQuery,
  onSearchChange,
  locationQuery,
  onLocationQueryChange,
  availableLocations,
  selectedLocations,
  onLocationToggle,
  selectedPriceBuckets,
  onPriceBucketToggle,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
}: VendorSearchProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          aria-label="Search vendors"
          className="border-0 bg-transparent pl-10 shadow-none placeholder:text-muted-foreground/60 focus-visible:ring-0"
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search vendors..."
          value={searchQuery}
        />
      </div>
      <div className="relative flex-1">
        <MapPin className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          aria-label="Search location"
          className="border-0 bg-transparent pl-10 shadow-none placeholder:text-muted-foreground/60 focus-visible:ring-0"
          onChange={(event) => onLocationQueryChange(event.target.value)}
          placeholder="Location (city, state)"
          value={locationQuery}
        />
      </div>
      <div className="h-px bg-border/60 sm:h-8 sm:w-px" />
      <div className="flex flex-wrap gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full border-0 bg-transparent text-sm shadow-none"
              variant="outline"
            >
              <SlidersHorizontal className="mr-2 size-4" />
              Locations
              {selectedLocations.length > 0
                ? ` (${selectedLocations.length})`
                : ""}
              <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuLabel>Filter by location</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableLocations.map((location) => (
              <DropdownMenuCheckboxItem
                checked={selectedLocations.includes(location)}
                key={location}
                onCheckedChange={() => onLocationToggle(location)}
              >
                {location}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full border-0 bg-transparent text-sm shadow-none"
              variant="outline"
            >
              Price
              {selectedPriceBuckets.length > 0
                ? ` (${selectedPriceBuckets.join(", ")})`
                : ""}
              <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            <DropdownMenuLabel>Price range</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {priceBuckets.map((bucket) => (
              <DropdownMenuCheckboxItem
                checked={selectedPriceBuckets.includes(bucket)}
                key={bucket}
                onCheckedChange={() => onPriceBucketToggle(bucket)}
              >
                {bucket}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Select onValueChange={onCategoryChange} value={selectedCategory}>
          <SelectTrigger
            aria-label="Filter by category"
            className="w-[180px] border-0 bg-transparent text-sm shadow-none"
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
        <Select onValueChange={onSortChange} value={selectedSort}>
          <SelectTrigger
            aria-label="Sort vendors"
            className="w-[160px] border-0 bg-transparent text-sm shadow-none"
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
