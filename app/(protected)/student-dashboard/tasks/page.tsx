"use client"

import { StudentTasksHeader } from "@/components/sections/student-tasks/student-tasks-header"
import { StudentTasksList } from "@/components/sections/student-tasks/student-tasks-list"

export default function StudentTasksPage() {
  return (
    <div className="space-y-6">
      <StudentTasksHeader />
      <StudentTasksList />
    </div>
  )
}

