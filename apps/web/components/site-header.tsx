"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
	{ href: "/", label: "Vendors" },
	{ href: "/dashboard", label: "Planning" },
];

export function SiteHeader() {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-border/60 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
				<Link className="group flex items-center gap-1.5" href="/">
					<span className="font-semibold font-serif text-2xl text-foreground tracking-tight transition-colors group-hover:text-primary">
						Wed
					</span>
					<span className="font-light font-serif text-2xl text-primary italic tracking-tight">
						Suite
					</span>
				</Link>

				<nav
					aria-label="Main navigation"
					className="hidden items-center gap-10 md:flex"
				>
					{navLinks.map((link) => (
						<Link
							className={cn(
								"relative font-medium text-sm uppercase tracking-wide transition-colors hover:text-foreground",
								pathname === link.href
									? "text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-primary"
									: "text-muted-foreground",
							)}
							href={link.href}
							key={link.href}
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="hidden items-center gap-4 md:flex">
					<Button
						asChild
						className="rounded-full px-6 font-medium text-xs uppercase tracking-widest"
						size="sm"
					>
						<Link href="/dashboard">My Wedding</Link>
					</Button>
				</div>

				<Button
					aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
					className="md:hidden"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					size="icon"
					variant="ghost"
				>
					{mobileMenuOpen ? (
						<X className="size-5" />
					) : (
						<Menu className="size-5" />
					)}
				</Button>
			</div>

			{mobileMenuOpen && (
				<div className="border-border/60 border-t bg-background px-6 py-6 md:hidden">
					<nav aria-label="Mobile navigation" className="flex flex-col gap-1">
						{navLinks.map((link) => (
							<Link
								className={cn(
									"rounded-lg px-4 py-3 font-medium text-sm uppercase tracking-wide transition-colors",
									pathname === link.href
										? "bg-primary/8 text-primary"
										: "text-muted-foreground hover:bg-accent hover:text-foreground",
								)}
								href={link.href}
								key={link.href}
								onClick={() => setMobileMenuOpen(false)}
							>
								{link.label}
							</Link>
						))}
						<div className="mt-4 border-border/60 border-t pt-4">
							<Button
								asChild
								className="w-full rounded-full font-medium text-xs uppercase tracking-widest"
							>
								<Link href="/dashboard">My Wedding</Link>
							</Button>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
}
