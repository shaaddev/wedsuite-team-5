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
	image: string;
	rating: number;
	reviewCount: number;
	priceRange: string;
	location: string;
	featured: boolean;
	services: string[];
	portfolio: string[];
}

export interface TimelineItem {
	id: string;
	title: string;
	date: string;
	completed: boolean;
	category: string;
}

export interface BudgetItem {
	id: string;
	category: string;
	estimated: number;
	actual: number;
	paid: boolean;
	vendor?: string;
}

export const vendors: Vendor[] = [
	{
		id: "golden-hour-studio",
		name: "Golden Hour Studio",
		category: "Photography",
		description:
			"Capturing timeless moments with a fine-art editorial approach. Specializing in natural light photography.",
		longDescription:
			"Golden Hour Studio brings a decade of experience to every wedding they photograph. Founded by award-winning photographer Elena Vasquez, the studio specializes in capturing authentic, emotion-driven moments with a fine-art editorial approach. Their work has been featured in Vogue Weddings, Martha Stewart Weddings, and The Knot. Every package includes a second photographer, engagement session, and a beautifully curated online gallery.",
		image: "/images/vendor-photographer.jpg",
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
			"Fine Art Prints",
			"Wedding Albums",
		],
		portfolio: ["/images/vendor-photographer.jpg", "/images/hero-wedding.jpg"],
	},
	{
		id: "petal-and-bloom",
		name: "Petal & Bloom",
		category: "Florist",
		description:
			"Romantic, garden-inspired floral designs crafted with seasonal blooms and lush foliage.",
		longDescription:
			"Petal & Bloom is a boutique floral design studio specializing in romantic, garden-inspired wedding arrangements. Led by floral artist Mei Chen, the studio sources seasonal blooms from local farms to create lush, organic designs that feel effortlessly elegant. From intimate elopements to grand celebrations, Petal & Bloom transforms spaces into botanical dreams. Their full-service approach includes venue consultations, custom proposals, and day-of setup and teardown.",
		image: "/images/vendor-florist.jpg",
		rating: 4.8,
		reviewCount: 89,
		priceRange: "$2,000 - $6,000",
		location: "Napa Valley, CA",
		featured: true,
		services: [
			"Bridal Bouquet",
			"Ceremony Flowers",
			"Reception Centerpieces",
			"Archway Design",
			"Venue Consultation",
			"Setup & Teardown",
		],
		portfolio: ["/images/vendor-florist.jpg"],
	},
	{
		id: "tablecraft-catering",
		name: "Tablecraft Catering",
		category: "Catering",
		description:
			"Farm-to-table wedding catering with seasonally inspired menus and impeccable service.",
		longDescription:
			"Tablecraft Catering brings a farm-to-table philosophy to wedding dining. Chef Marcus O'Brien and his team craft seasonally inspired menus that celebrate local ingredients and global flavors. From plated multi-course dinners to interactive food stations, every meal is designed to be a memorable experience. Tablecraft handles everything from menu tastings and dietary accommodations to full bar service and late-night snacks.",
		image: "/images/vendor-caterer.jpg",
		rating: 4.7,
		reviewCount: 64,
		priceRange: "$5,000 - $15,000",
		location: "Oakland, CA",
		featured: false,
		services: [
			"Menu Tasting",
			"Plated Dinner",
			"Buffet Style",
			"Food Stations",
			"Bar Service",
			"Late-Night Snacks",
		],
		portfolio: ["/images/vendor-caterer.jpg"],
	},
	{
		id: "grandview-estate",
		name: "Grandview Estate",
		category: "Venue",
		description:
			"A stunning hilltop estate offering panoramic views, elegant ballrooms, and manicured gardens.",
		longDescription:
			"Grandview Estate is a breathtaking hilltop venue featuring panoramic views of rolling vineyards and the Pacific coastline. The property offers multiple ceremony and reception spaces, including a grand ballroom with crystal chandeliers, a sun-drenched terrace, and beautifully manicured gardens. Their all-inclusive packages simplify planning with in-house coordination, rental furnishings, and preferred vendor partnerships. Grandview Estate accommodates weddings from 50 to 300 guests.",
		image: "/images/vendor-venue.jpg",
		rating: 4.9,
		reviewCount: 156,
		priceRange: "$10,000 - $25,000",
		location: "Sonoma, CA",
		featured: true,
		services: [
			"Ceremony Space",
			"Reception Hall",
			"Bridal Suite",
			"In-House Coordinator",
			"Rental Furnishings",
			"Parking & Valet",
		],
		portfolio: ["/images/vendor-venue.jpg"],
	},
	{
		id: "rhythm-events",
		name: "Rhythm & Events",
		category: "DJ & Music",
		description:
			"High-energy DJ and live music services that keep the dance floor alive all night long.",
		longDescription:
			"Rhythm & Events is a premier wedding entertainment company offering DJ services, live bands, and custom music curation. DJ Jordan Lee brings infectious energy and an impeccable sense of timing to every reception, seamlessly blending genres to keep guests of all ages on the dance floor. Their packages include professional sound systems, lighting design, MC services, and custom playlists. They also offer ceremony musicians and cocktail hour entertainment.",
		image: "/images/vendor-dj.jpg",
		rating: 4.6,
		reviewCount: 78,
		priceRange: "$1,500 - $4,000",
		location: "San Jose, CA",
		featured: false,
		services: [
			"DJ Services",
			"Live Band",
			"Sound System",
			"Lighting Design",
			"MC Services",
			"Custom Playlists",
		],
		portfolio: ["/images/vendor-dj.jpg"],
	},
	{
		id: "ever-after-planning",
		name: "Ever After Planning",
		category: "Wedding Planner",
		description:
			"Full-service wedding planning and coordination for stress-free, beautifully designed celebrations.",
		longDescription:
			"Ever After Planning is a full-service wedding planning and design firm dedicated to creating personalized, stress-free celebrations. Lead planner Sophia Laurent brings a keen eye for design and meticulous attention to detail to every event. From initial concept and vendor selection to day-of logistics and timeline management, Ever After handles every aspect of your wedding. Their clients describe the experience as having a trusted friend who happens to be an expert in all things weddings.",
		image: "/images/vendor-planner.jpg",
		rating: 5.0,
		reviewCount: 42,
		priceRange: "$4,000 - $12,000",
		location: "San Francisco, CA",
		featured: true,
		services: [
			"Full Planning",
			"Partial Planning",
			"Day-Of Coordination",
			"Vendor Management",
			"Design & Styling",
			"Budget Management",
		],
		portfolio: ["/images/vendor-planner.jpg"],
	},
	{
		id: "sweet-layers",
		name: "Sweet Layers Bakery",
		category: "Cake & Desserts",
		description:
			"Artisanal wedding cakes and dessert tables featuring exquisite flavors and stunning designs.",
		longDescription:
			"Sweet Layers Bakery creates artisanal wedding cakes and dessert experiences that are as beautiful as they are delicious. Pastry chef Amelie Dubois combines classic French techniques with modern design to craft show-stopping cakes in a variety of styles, from minimalist elegance to elaborate floral masterpieces. Every cake is made from scratch using premium ingredients. They also offer dessert bars, macaron towers, and late-night sweet treats.",
		image: "/images/vendor-cake.jpg",
		rating: 4.8,
		reviewCount: 93,
		priceRange: "$800 - $3,500",
		location: "Berkeley, CA",
		featured: false,
		services: [
			"Custom Wedding Cake",
			"Dessert Table",
			"Macaron Tower",
			"Cupcake Display",
			"Cake Tasting",
			"Delivery & Setup",
		],
		portfolio: ["/images/vendor-cake.jpg"],
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
	new Set(vendors.map((vendor) => vendor.location)),
).sort((left, right) => left.localeCompare(right));

function parseMinimumPrice(priceRange: string) {
	const [minimumPriceRaw] = priceRange.split("-");
	const numericPrice = Number(
		(minimumPriceRaw ?? "").replace(/\$/g, "").replace(/,/g, "").trim(),
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

	if (minimumPrice < 10000) {
		return "$$$";
	}

	return "$$$$";
}

export const timelineItems: TimelineItem[] = [
	{
		id: "1",
		title: "Book venue",
		date: "2026-03-15",
		completed: true,
		category: "Venue",
	},
	{
		id: "2",
		title: "Hire wedding planner",
		date: "2026-03-20",
		completed: true,
		category: "Planning",
	},
	{
		id: "3",
		title: "Book photographer",
		date: "2026-04-01",
		completed: true,
		category: "Photography",
	},
	{
		id: "4",
		title: "Select catering menu",
		date: "2026-04-15",
		completed: false,
		category: "Catering",
	},
	{
		id: "5",
		title: "Book florist",
		date: "2026-05-01",
		completed: false,
		category: "Florist",
	},
	{
		id: "6",
		title: "Order wedding cake",
		date: "2026-05-15",
		completed: false,
		category: "Cake",
	},
	{
		id: "7",
		title: "Book DJ / band",
		date: "2026-06-01",
		completed: false,
		category: "Entertainment",
	},
	{
		id: "8",
		title: "Final venue walkthrough",
		date: "2026-07-15",
		completed: false,
		category: "Venue",
	},
	{
		id: "9",
		title: "Send invitations",
		date: "2026-06-15",
		completed: false,
		category: "Planning",
	},
	{
		id: "10",
		title: "Final dress fitting",
		date: "2026-08-01",
		completed: false,
		category: "Attire",
	},
	{
		id: "11",
		title: "Confirm all vendors",
		date: "2026-08-10",
		completed: false,
		category: "Planning",
	},
	{
		id: "12",
		title: "Wedding day",
		date: "2026-09-12",
		completed: false,
		category: "Celebration",
	},
];

export const budgetItems: BudgetItem[] = [
	{
		id: "1",
		category: "Venue",
		estimated: 18000,
		actual: 17500,
		paid: true,
		vendor: "Grandview Estate",
	},
	{
		id: "2",
		category: "Photography",
		estimated: 5000,
		actual: 5500,
		paid: true,
		vendor: "Golden Hour Studio",
	},
	{ id: "3", category: "Catering", estimated: 10000, actual: 0, paid: false },
	{ id: "4", category: "Florist", estimated: 3500, actual: 0, paid: false },
	{
		id: "5",
		category: "Cake & Desserts",
		estimated: 1500,
		actual: 0,
		paid: false,
	},
	{ id: "6", category: "DJ & Music", estimated: 2500, actual: 0, paid: false },
	{
		id: "7",
		category: "Wedding Planner",
		estimated: 6000,
		actual: 6000,
		paid: true,
		vendor: "Ever After Planning",
	},
	{ id: "8", category: "Attire", estimated: 4000, actual: 3200, paid: true },
	{ id: "9", category: "Invitations", estimated: 800, actual: 0, paid: false },
	{
		id: "10",
		category: "Decorations",
		estimated: 2000,
		actual: 0,
		paid: false,
	},
];
