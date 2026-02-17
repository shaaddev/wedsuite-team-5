"use client"

import { useState } from "react"
import { format, isPast, isToday } from "date-fns"
import { CalendarDays, Check, Circle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { timelineItems as initialItems, type TimelineItem } from "@/lib/data"

export function DashboardTimeline() {
  const [items, setItems] = useState<TimelineItem[]>(initialItems)

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const completedCount = items.filter((i) => i.completed).length
  const totalCount = items.length
  const progressPercent = Math.round((completedCount / totalCount) * 100)

  const sortedItems = [...items].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  return (
    <Card className="rounded-2xl border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-serif text-2xl font-light">Wedding Timeline</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" />
            <span>{completedCount} of {totalCount}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-accent">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{progressPercent}% complete</p>
      </CardHeader>
      <CardContent>
        <div className="relative flex flex-col">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border/60" />

          {sortedItems.map((item, index) => {
            const date = new Date(item.date)
            const isPastDate = isPast(date) && !isToday(date)

            return (
              <div
                key={item.id}
                className={cn(
                  "relative flex items-start gap-4 pb-6",
                  index === sortedItems.length - 1 && "pb-0"
                )}
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-border/60 bg-card">
                  {item.completed ? (
                    <div className="flex size-6 items-center justify-center rounded-full bg-primary">
                      <Check className="size-3.5 text-primary-foreground" />
                    </div>
                  ) : (
                    <Circle
                      className={cn(
                        "size-3",
                        isPastDate ? "text-destructive" : "text-muted-foreground/40"
                      )}
                      fill="currentColor"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 items-start justify-between gap-4 pt-0.5">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`timeline-${item.id}`}
                      checked={item.completed}
                      onCheckedChange={() => toggleItem(item.id)}
                      aria-label={`Mark "${item.title}" as ${item.completed ? "incomplete" : "complete"}`}
                    />
                    <label
                      htmlFor={`timeline-${item.id}`}
                      className={cn(
                        "text-sm font-medium cursor-pointer transition-colors",
                        item.completed
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      )}
                    >
                      {item.title}
                    </label>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {item.category}
                    </span>
                    <time
                      dateTime={item.date}
                      className={cn(
                        "text-xs tabular-nums",
                        isPastDate && !item.completed
                          ? "font-medium text-destructive"
                          : "text-muted-foreground"
                      )}
                    >
                      {format(date, "MMM d, yyyy")}
                    </time>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
