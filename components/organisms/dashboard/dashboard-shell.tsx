"use client"

import type React from "react"
import { DashboardHeader } from "@/components/sections/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/organisms/dashboard/dashboard-sidebar"

export function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30 flex">
      <DashboardSidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

