"use client";

import {
	CircleDollarSign,
	TrendingDown,
	TrendingUp,
	Wallet,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { type BudgetItem, budgetItems as initialItems } from "@/lib/data";
import { cn } from "@/lib/utils";

function formatCurrency(amount: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
	}).format(amount);
}

export function DashboardBudget() {
	const [items, setItems] = useState<BudgetItem[]>(initialItems);

	const togglePaid = (id: string) => {
		setItems((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, paid: !item.paid } : item,
			),
		);
	};

	const totalEstimated = items.reduce((sum, item) => sum + item.estimated, 0);
	const totalActual = items.reduce((sum, item) => sum + item.actual, 0);
	const totalPaid = items
		.filter((i) => i.paid)
		.reduce((sum, item) => sum + item.actual, 0);
	const remaining = totalEstimated - totalActual;
	const paidCategories = items.filter((i) => i.paid).length;
	const budgetUsedPercent = Math.round((totalActual / totalEstimated) * 100);

	return (
		<div className="flex flex-col gap-6">
			{/* Summary Cards */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<Card className="rounded-2xl border-border/60 shadow-sm">
					<CardContent className="flex items-center gap-4 p-5">
						<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/8">
							<Wallet className="size-5 text-primary" />
						</div>
						<div>
							<p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
								Total Budget
							</p>
							<p className="text-xl font-semibold text-foreground">
								{formatCurrency(totalEstimated)}
							</p>
						</div>
					</CardContent>
				</Card>
				<Card className="rounded-2xl border-border/60 shadow-sm">
					<CardContent className="flex items-center gap-4 p-5">
						<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/8">
							<CircleDollarSign className="size-5 text-primary" />
						</div>
						<div>
							<p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
								Spent So Far
							</p>
							<p className="text-xl font-semibold text-foreground">
								{formatCurrency(totalActual)}
							</p>
						</div>
					</CardContent>
				</Card>
				<Card className="rounded-2xl border-border/60 shadow-sm">
					<CardContent className="flex items-center gap-4 p-5">
						<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/8">
							{remaining >= 0 ? (
								<TrendingDown className="size-5 text-primary" />
							) : (
								<TrendingUp className="size-5 text-destructive" />
							)}
						</div>
						<div>
							<p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
								Remaining
							</p>
							<p
								className={cn(
									"text-xl font-semibold",
									remaining >= 0 ? "text-foreground" : "text-destructive",
								)}
							>
								{formatCurrency(remaining)}
							</p>
						</div>
					</CardContent>
				</Card>
				<Card className="rounded-2xl border-border/60 shadow-sm">
					<CardContent className="flex items-center gap-4 p-5">
						<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/8">
							<Wallet className="size-5 text-primary" />
						</div>
						<div>
							<p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
								Paid
							</p>
							<p className="text-xl font-semibold text-foreground">
								{formatCurrency(totalPaid)}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Budget Progress */}
			<Card className="rounded-2xl border-border/60 shadow-sm">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="font-serif text-2xl font-light">
							Budget Overview
						</CardTitle>
						<span className="text-xs text-muted-foreground">
							{budgetUsedPercent}% used &middot; {paidCategories}/{items.length}{" "}
							paid
						</span>
					</div>
					<div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-accent">
						<div
							className={cn(
								"h-full rounded-full transition-all duration-500",
								budgetUsedPercent > 100 ? "bg-destructive" : "bg-primary",
							)}
							style={{ width: `${Math.min(budgetUsedPercent, 100)}%` }}
						/>
					</div>
				</CardHeader>
			</Card>

			{/* Budget Table */}
			<Card className="rounded-2xl border-border/60 shadow-sm">
				<CardHeader>
					<CardTitle className="font-serif text-2xl font-light">
						Budget Breakdown
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow className="border-border/60 hover:bg-transparent">
									<TableHead className="w-12 text-[10px] uppercase tracking-widest">
										Paid
									</TableHead>
									<TableHead className="text-[10px] uppercase tracking-widest">
										Category
									</TableHead>
									<TableHead className="text-[10px] uppercase tracking-widest">
										Vendor
									</TableHead>
									<TableHead className="text-right text-[10px] uppercase tracking-widest">
										Estimated
									</TableHead>
									<TableHead className="text-right text-[10px] uppercase tracking-widest">
										Actual
									</TableHead>
									<TableHead className="text-right text-[10px] uppercase tracking-widest">
										Difference
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{items.map((item) => {
									const difference = item.estimated - item.actual;
									return (
										<TableRow key={item.id} className="border-border/40">
											<TableCell>
												<Checkbox
													checked={item.paid}
													onCheckedChange={() => togglePaid(item.id)}
													aria-label={`Mark ${item.category} as ${item.paid ? "unpaid" : "paid"}`}
												/>
											</TableCell>
											<TableCell className="font-medium text-foreground">
												{item.category}
											</TableCell>
											<TableCell>
												{item.vendor ? (
													<span className="text-foreground">{item.vendor}</span>
												) : (
													<span className="text-muted-foreground/60 italic text-sm">
														Not booked
													</span>
												)}
											</TableCell>
											<TableCell className="text-right font-medium tabular-nums text-foreground">
												{formatCurrency(item.estimated)}
											</TableCell>
											<TableCell className="text-right tabular-nums">
												{item.actual > 0 ? (
													<span className="font-medium text-foreground">
														{formatCurrency(item.actual)}
													</span>
												) : (
													<span className="text-muted-foreground/40">
														&mdash;
													</span>
												)}
											</TableCell>
											<TableCell className="text-right">
												{item.actual > 0 ? (
													<Badge
														variant={
															difference >= 0 ? "secondary" : "destructive"
														}
														className={cn(
															"rounded-full text-[10px] font-medium",
															difference >= 0
																? "bg-primary/10 text-primary"
																: "",
														)}
													>
														{difference >= 0 ? "Under" : "Over"}{" "}
														{formatCurrency(Math.abs(difference))}
													</Badge>
												) : (
													<span className="text-muted-foreground/40">
														&mdash;
													</span>
												)}
											</TableCell>
										</TableRow>
									);
								})}
								{/* Totals Row */}
								<TableRow className="border-t-2 border-border/60 font-semibold hover:bg-transparent">
									<TableCell />
									<TableCell className="text-foreground">Total</TableCell>
									<TableCell />
									<TableCell className="text-right tabular-nums text-foreground">
										{formatCurrency(totalEstimated)}
									</TableCell>
									<TableCell className="text-right tabular-nums text-foreground">
										{formatCurrency(totalActual)}
									</TableCell>
									<TableCell className="text-right">
										<Badge
											variant={remaining >= 0 ? "secondary" : "destructive"}
											className={cn(
												"rounded-full text-[10px] font-medium",
												remaining >= 0 ? "bg-primary/10 text-primary" : "",
											)}
										>
											{remaining >= 0 ? "Under" : "Over"}{" "}
											{formatCurrency(Math.abs(remaining))}
										</Badge>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
