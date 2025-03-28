"use client";

import { StudentDashboardHeader } from "@/components/sections/student-dashboard/student-dashboard-header";
import { StudentDashboardStats } from "@/components/sections/student-dashboard/student-dashboard-stats";
import { StudentRecentTasks } from "@/components/sections/student-dashboard/student-recent-tasks";
import { StudentDashboardActivity } from "@/components/sections/student-dashboard/student-dashboard-activity";
import { StudentProfileCompletion } from "@/components/sections/student-dashboard/student-profile-completion";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <StudentDashboardHeader />
      <StudentDashboardStats />
      <StudentRecentTasks />
      <StudentDashboardActivity />
      <StudentProfileCompletion />
    </div>
  );
}
