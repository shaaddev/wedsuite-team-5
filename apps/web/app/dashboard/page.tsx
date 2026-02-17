import type { Metadata } from "next"
import { DashboardContent } from "@/components/dashboard-content"

export const metadata: Metadata = {
  title: "My Dashboard | WedSuite",
  description: "Manage your wedding timeline, budget, and booked vendors all in one place.",
}

export default function DashboardPage() {
  return <DashboardContent />
}
