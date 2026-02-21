import { ArrowUpRight, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Vendor } from "@/lib/data";

interface VendorCardProps {
	vendor: Vendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
	return (
		<Link href={`/vendors/${vendor.id}`} className="group block">
			<article className="flex flex-col">
				{/* Image */}
				<div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
					<Image
						src={vendor.image}
						alt={`${vendor.name} - ${vendor.category}`}
						fill
						className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					/>
					<div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5" />
					{vendor.featured && (
						<div className="absolute top-4 left-4">
							<span className="rounded-full bg-primary px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-primary-foreground">
								Featured
							</span>
						</div>
					)}
					<div className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
						<ArrowUpRight className="size-4" />
					</div>
				</div>

				{/* Content */}
				<div className="mt-4 flex flex-col gap-1.5">
					<div className="flex items-center justify-between">
						<span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
							{vendor.category}
						</span>
						<div className="flex items-center gap-1 text-sm">
							<Star className="size-3.5 fill-foreground text-foreground" />
							<span className="font-medium text-foreground">
								{vendor.rating}
							</span>
							<span className="text-muted-foreground">
								({vendor.reviewCount})
							</span>
						</div>
					</div>
					<h3 className="font-serif text-xl font-medium text-foreground transition-colors group-hover:text-primary">
						{vendor.name}
					</h3>
					<p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
						{vendor.description}
					</p>
					<div className="mt-1 flex items-center justify-between">
						<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
							<MapPin className="size-3.5" />
							<span>{vendor.location}</span>
						</div>
						<span className="text-sm font-medium text-foreground">
							{vendor.priceRange}
						</span>
					</div>
				</div>
			</article>
		</Link>
	);
}
