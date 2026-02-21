"use client";

import { CalendarDays, LayoutDashboard, Wallet } from "lucide-react";
import { DashboardBudget } from "@/components/dashboard-budget";
import { DashboardOverview } from "@/components/dashboard-overview";
import { DashboardTimeline } from "@/components/dashboard-timeline";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardContent() {
	return (
		<div className="flex min-h-screen flex-col">
			<SiteHeader />
			<main className="flex-1">
				<div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">
					{/* Header */}
					<div className="mb-10">
						<p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
							Your Wedding
						</p>
						<h1 className="mt-3 font-serif text-3xl font-light text-foreground lg:text-5xl">
							Planning Dashboard
						</h1>
						<p className="mt-3 max-w-lg text-muted-foreground leading-relaxed">
							Track your progress, manage your budget, and stay on schedule for
							the big day.
						</p>
					</div>

					{/* Overview Stats */}
					<div className="mb-10">
						<DashboardOverview />
					</div>

					{/* Tabs */}
					<Tabs defaultValue="timeline" className="w-full">
						<TabsList className="h-auto rounded-full bg-accent/80 p-1 w-full sm:w-auto">
							<TabsTrigger
								value="timeline"
								className="rounded-full gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm"
							>
								<CalendarDays className="size-3.5" />
								<span className="hidden sm:inline">Timeline</span>
							</TabsTrigger>
							<TabsTrigger
								value="budget"
								className="rounded-full gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm"
							>
								<Wallet className="size-3.5" />
								<span className="hidden sm:inline">Budget</span>
							</TabsTrigger>
							<TabsTrigger
								value="overview"
								className="rounded-full gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm"
							>
								<LayoutDashboard className="size-3.5" />
								<span className="hidden sm:inline">Summary</span>
							</TabsTrigger>
						</TabsList>

						<TabsContent value="timeline" className="mt-8">
							<DashboardTimeline />
						</TabsContent>

						<TabsContent value="budget" className="mt-8">
							<DashboardBudget />
						</TabsContent>

						<TabsContent value="overview" className="mt-8">
							<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
								<DashboardTimeline />
								<DashboardBudget />
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</main>
			<SiteFooter />
		</div>
	);
}
