"use client";

import { HeroSection } from "@/components/hero-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VendorGrid } from "@/components/vendor-grid";

export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col">
			<SiteHeader />
			<main className="flex-1">
				<HeroSection />
				<VendorGrid />
			</main>
			<SiteFooter />
		</div>
	);
}
