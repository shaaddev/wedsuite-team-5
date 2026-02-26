export type VendorCategory =
  | "Photography"
  | "Florist"
  | "Catering"
  | "Venue"
  | "DJ & Music"
  | "Wedding Planner"
  | "Cake & Desserts";

export type PriceBucket = "$" | "$$" | "$$$" | "$$$$";

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  description: string;
  longDescription: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  location: string;
  featured: boolean;
  services: string[];
}

export const vendors: Vendor[] = [
  {
    id: "golden-hour-studio",
    name: "Golden Hour Studio",
    category: "Photography",
    description: "Fine-art editorial wedding photography with natural light.",
    longDescription:
      "Golden Hour Studio specializes in emotion-driven wedding photography with a timeless, editorial style.",
    rating: 4.9,
    reviewCount: 127,
    priceRange: "$3,500 - $8,000",
    location: "San Francisco, CA",
    featured: true,
    services: [
      "Full Day Coverage",
      "Engagement Session",
      "Second Photographer",
      "Online Gallery",
    ],
  },
  {
    id: "petal-and-bloom",
    name: "Petal & Bloom",
    category: "Florist",
    description: "Romantic floral design with seasonal, local blooms.",
    longDescription:
      "Petal & Bloom creates garden-inspired wedding floral arrangements from bouquet to reception decor.",
    rating: 4.8,
    reviewCount: 89,
    priceRange: "$2,000 - $6,000",
    location: "Napa Valley, CA",
    featured: true,
    services: [
      "Bridal Bouquet",
      "Ceremony Flowers",
      "Reception Centerpieces",
      "Setup & Teardown",
    ],
  },
  {
    id: "tablecraft-catering",
    name: "Tablecraft Catering",
    category: "Catering",
    description: "Farm-to-table menus with polished wedding service.",
    longDescription:
      "Tablecraft Catering delivers seasonal menus with flexible formats from plated dinners to food stations.",
    rating: 4.7,
    reviewCount: 64,
    priceRange: "$5,000 - $15,000",
    location: "Oakland, CA",
    featured: false,
    services: ["Menu Tasting", "Plated Dinner", "Food Stations", "Bar Service"],
  },
  {
    id: "grandview-estate",
    name: "Grandview Estate",
    category: "Venue",
    description: "Elegant hilltop estate venue with panoramic vineyard views.",
    longDescription:
      "Grandview Estate offers multiple ceremony and reception spaces and accommodates weddings from 50 to 300 guests.",
    rating: 4.9,
    reviewCount: 156,
    priceRange: "$10,000 - $25,000",
    location: "Sonoma, CA",
    featured: true,
    services: ["Ceremony Space", "Reception Hall", "Bridal Suite", "Valet"],
  },
  {
    id: "rhythm-events",
    name: "Rhythm & Events",
    category: "DJ & Music",
    description: "High-energy DJ and live music to keep guests dancing.",
    longDescription:
      "Rhythm & Events provides DJs, live bands, MC support, and custom playlists for weddings.",
    rating: 4.6,
    reviewCount: 78,
    priceRange: "$1,500 - $4,000",
    location: "San Jose, CA",
    featured: false,
    services: ["DJ Services", "Live Band", "Lighting Design", "MC Services"],
  },
  {
    id: "ever-after-planning",
    name: "Ever After Planning",
    category: "Wedding Planner",
    description: "Full-service wedding planning and day-of coordination.",
    longDescription:
      "Ever After Planning supports couples end-to-end with design guidance and flawless event logistics.",
    rating: 5.0,
    reviewCount: 42,
    priceRange: "$4,000 - $12,000",
    location: "San Francisco, CA",
    featured: true,
    services: ["Full Planning", "Partial Planning", "Day-Of Coordination"],
  },
  {
    id: "sweet-layers",
    name: "Sweet Layers Bakery",
    category: "Cake & Desserts",
    description: "Artisanal wedding cakes and curated dessert experiences.",
    longDescription:
      "Sweet Layers Bakery designs custom cakes and dessert tables with premium ingredients and elegant presentation.",
    rating: 4.8,
    reviewCount: 93,
    priceRange: "$800 - $3,500",
    location: "Berkeley, CA",
    featured: false,
    services: ["Custom Wedding Cake", "Dessert Table", "Cake Tasting"],
  },
];

export const categories: VendorCategory[] = [
  "Photography",
  "Florist",
  "Catering",
  "Venue",
  "DJ & Music",
  "Wedding Planner",
  "Cake & Desserts",
];

export const priceBuckets: PriceBucket[] = ["$", "$$", "$$$", "$$$$"];

export const uniqueLocations = Array.from(
  new Set(vendors.map((vendor) => vendor.location))
).sort((left, right) => left.localeCompare(right));

function parseMinimumPrice(priceRange: string) {
  const [minimumPriceRaw] = priceRange.split("-");
  const numericPrice = Number(
    (minimumPriceRaw ?? "").replace(/\$/g, "").replace(/,/g, "").trim()
  );
  return Number.isFinite(numericPrice) ? numericPrice : 0;
}

export function getPriceBucketFromRange(priceRange: string): PriceBucket {
  const minimumPrice = parseMinimumPrice(priceRange);

  if (minimumPrice < 2000) {
    return "$";
  }
  if (minimumPrice < 5000) {
    return "$$";
  }
  if (minimumPrice < 10_000) {
    return "$$$";
  }
  return "$$$$";
}
