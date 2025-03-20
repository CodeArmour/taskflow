"use client";

import type React from "react";
import { StudentDashboardSidebar } from "@/components/organisms/student-dashboard/student-dashboard-sidebar";
import { StudentDashboardHeader } from "@/components/organisms/student-dashboard/student-dashboard-header"

export function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30 flex">
      <StudentDashboardSidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <StudentDashboardHeader />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
