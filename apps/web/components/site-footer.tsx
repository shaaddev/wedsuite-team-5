import Link from "next/link";

export function SiteFooter() {
	return (
		<footer className="border-t border-border/60 bg-foreground">
			<div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
				<div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
					{/* Brand */}
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-1.5">
							<span className="font-serif text-2xl font-semibold tracking-tight text-primary-foreground">
								Wed
							</span>
							<span className="font-serif text-2xl font-light italic tracking-tight text-primary-foreground/70">
								Suite
							</span>
						</div>
						<p className="text-sm leading-relaxed text-primary-foreground/50 max-w-xs">
							A curated marketplace connecting couples with exceptional wedding
							professionals.
						</p>
					</div>

					{/* Navigation */}
					<div className="flex flex-col gap-4">
						<h3 className="text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/40">
							Navigate
						</h3>
						<nav className="flex flex-col gap-3" aria-label="Footer navigation">
							<Link
								href="/"
								className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
							>
								Browse Vendors
							</Link>
							<Link
								href="/dashboard"
								className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
							>
								Wedding Dashboard
							</Link>
						</nav>
					</div>

					{/* Info */}
					<div className="flex flex-col gap-4">
						<h3 className="text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/40">
							About
						</h3>
						<p className="text-sm leading-relaxed text-primary-foreground/50">
							Helping couples create celebrations that are as unique as their
							love story.
						</p>
					</div>
				</div>

				<div className="mt-16 flex flex-col items-center gap-4 border-t border-primary-foreground/10 pt-8 sm:flex-row sm:justify-between">
					<p className="text-xs text-primary-foreground/40">
						WedSuite. Crafted with care.
					</p>
					<p className="text-xs text-primary-foreground/30">
						All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
