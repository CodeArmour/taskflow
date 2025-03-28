import type React from "react"
import { StudentDashboardLayout } from "@/components/layouts/student-dashboard-layout"

export default function StudentDashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <StudentDashboardLayout>{children}</StudentDashboardLayout>
}

