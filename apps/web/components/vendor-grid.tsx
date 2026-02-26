"use client";

import { useMemo, useState } from "react";
import { VendorCard } from "@/components/vendor-card";
import { VendorSearch } from "@/components/vendor-search";
import {
  getPriceBucketFromRange,
  type PriceBucket,
  uniqueLocations,
  vendors,
} from "@/lib/data";

export function VendorGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPriceBuckets, setSelectedPriceBuckets] = useState<
    PriceBucket[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("featured");

  const toggleLocation = (location: string) => {
    setSelectedLocations((previous) =>
      previous.includes(location)
        ? previous.filter((entry) => entry !== location)
        : [...previous, location]
    );
  };

  const togglePriceBucket = (bucket: PriceBucket) => {
    setSelectedPriceBuckets((previous) =>
      previous.includes(bucket)
        ? previous.filter((entry) => entry !== bucket)
        : [...previous, bucket]
    );
  };

  const filteredVendors = useMemo(() => {
    let result = [...vendors];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(query) ||
          vendor.location.toLowerCase().includes(query) ||
          vendor.category.toLowerCase().includes(query) ||
          vendor.description.toLowerCase().includes(query)
      );
    }

    if (locationQuery) {
      const query = locationQuery.toLowerCase();
      result = result.filter((vendor) =>
        vendor.location.toLowerCase().includes(query)
      );
    }

    if (selectedLocations.length > 0) {
      result = result.filter((vendor) =>
        selectedLocations.includes(vendor.location)
      );
    }

    if (selectedPriceBuckets.length > 0) {
      result = result.filter((vendor) =>
        selectedPriceBuckets.includes(
          getPriceBucketFromRange(vendor.priceRange)
        )
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

  return (
    <section
      className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24"
      id="vendors"
    >
      <div className="mb-10 flex flex-col gap-3">
        <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.25em]">
          Our Collection
        </p>
        <h2 className="font-light font-serif text-3xl text-foreground lg:text-4xl">
          Browse Vendors
        </h2>
        <p className="text-muted-foreground">
          {filteredVendors.length} vendor
          {filteredVendors.length !== 1 ? "s" : ""} available
        </p>
      </div>

      <VendorSearch
        availableLocations={uniqueLocations}
        locationQuery={locationQuery}
        onCategoryChange={setSelectedCategory}
        onLocationQueryChange={setLocationQuery}
        onLocationToggle={toggleLocation}
        onPriceBucketToggle={togglePriceBucket}
        onSearchChange={setSearchQuery}
        onSortChange={setSelectedSort}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedLocations={selectedLocations}
        selectedPriceBuckets={selectedPriceBuckets}
        selectedSort={selectedSort}
      />

      {filteredVendors.length === 0 ? (
        <div className="mt-20 flex flex-col items-center gap-3 text-center">
          <p className="font-serif text-foreground text-xl">No vendors found</p>
          <p className="text-muted-foreground text-sm">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </section>
  );
}
