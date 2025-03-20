"use client"

import { StudentDashboardHeader } from "@/components/organisms/student-dashboard/student-dashboard-header"
import { StudentDashboardStats } from "@/components/sections/student-dashboard/student-dashboard-stats"
import { StudentRecentTasks } from "@/components/sections/student-dashboard/student-recent-tasks"
import { StudentDashboardActivity } from "@/components/sections/student-dashboard/student-dashboard-activity"

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <StudentDashboardHeader />
      <StudentDashboardStats />
      <StudentRecentTasks />
      <StudentDashboardActivity />
    </div>
  )
}

