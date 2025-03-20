"use client"

import { TasksHeader } from "@/components/sections/dashboard/tasks/tasks-header"
import { TasksList } from "@/components/sections/dashboard/tasks/tasks-list"

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <TasksHeader />
      <TasksList />
    </div>
  )
}

