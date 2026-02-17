"use client"

import { CalendarHeart, Clock, Heart, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { timelineItems, budgetItems } from "@/lib/data"

export function DashboardOverview() {
  const completedTasks = timelineItems.filter((i) => i.completed).length
  const totalTasks = timelineItems.length
  const totalBudget = budgetItems.reduce((sum, item) => sum + item.estimated, 0)
  const spentBudget = budgetItems.reduce((sum, item) => sum + item.actual, 0)
  const bookedVendors = budgetItems.filter((i) => i.vendor).length

  const weddingDate = new Date("2026-09-12")
  const today = new Date()
  const daysUntilWedding = Math.ceil(
    (weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)

  const stats = [
    {
      label: "Days Until Wedding",
      value: daysUntilWedding.toString(),
      subtitle: "September 12, 2026",
      icon: CalendarHeart,
    },
    {
      label: "Tasks Completed",
      value: `${completedTasks}/${totalTasks}`,
      subtitle: `${Math.round((completedTasks / totalTasks) * 100)}% progress`,
      icon: Clock,
    },
    {
      label: "Budget Spent",
      value: formatCurrency(spentBudget),
      subtitle: `of ${formatCurrency(totalBudget)} total`,
      icon: Heart,
    },
    {
      label: "Vendors Booked",
      value: bookedVendors.toString(),
      subtitle: `of ${budgetItems.length} categories`,
      icon: Users,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="rounded-2xl border-border/60 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/8">
              <stat.icon className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
