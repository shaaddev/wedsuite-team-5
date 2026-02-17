"use client"

import { useState, useMemo } from "react"
import { VendorCard } from "@/components/vendor-card"
import { VendorSearch } from "@/components/vendor-search"
import { vendors } from "@/lib/data"

export function VendorGrid() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSort, setSelectedSort] = useState("featured")

  const filteredVendors = useMemo(() => {
    let result = [...vendors]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(query) ||
          vendor.location.toLowerCase().includes(query) ||
          vendor.category.toLowerCase().includes(query) ||
          vendor.description.toLowerCase().includes(query)
      )
    }

    if (selectedCategory !== "all") {
      result = result.filter((vendor) => vendor.category === selectedCategory)
    }

    switch (selectedSort) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return result
  }, [searchQuery, selectedCategory, selectedSort])

  return (
    <section id="vendors" className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
      <div className="flex flex-col gap-3 mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Our Collection
        </p>
        <h2 className="font-serif text-3xl font-light text-foreground lg:text-4xl">
          Browse Vendors
        </h2>
        <p className="text-muted-foreground">
          {filteredVendors.length} vendor{filteredVendors.length !== 1 ? "s" : ""} available
        </p>
      </div>

      <VendorSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />

      {filteredVendors.length === 0 ? (
        <div className="mt-20 flex flex-col items-center gap-3 text-center">
          <p className="font-serif text-xl text-foreground">No vendors found</p>
          <p className="text-sm text-muted-foreground">
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
  )
}
