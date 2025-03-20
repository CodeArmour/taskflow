"use client"

import { DashboardHeader } from "@/components/sections/dashboard/dashboard-header"
import { DashboardStats } from "@/components/sections/dashboard/dashboard-stats"
import { RecentTasks } from "@/components/sections/dashboard/recent-tasks"
import { DashboardActivity } from "@/components/sections/dashboard/dashboard-activity"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardStats />
      <RecentTasks />
      <DashboardActivity />
    </div>
  )
}

