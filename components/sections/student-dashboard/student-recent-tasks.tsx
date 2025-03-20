/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckSquare, Clock, FileText, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { StatusBadge } from "@/components/atoms/status-badge"

export function StudentRecentTasks() {
  const { t, language } = useLanguage()
  const isRtl = language === "ar"

  // Mock recent tasks for student
  const recentTasks = [
    {
      id: "task-1",
      title: "Build a REST API",
      category: "programming",
      status: "new",
      dueDate: "2025-03-25",
      createdAt: "2025-03-15T10:30:00Z",
    },
    {
      id: "task-2",
      title: "Design a Mobile App UI",
      category: "design",
      status: "in-progress",
      dueDate: "2025-03-28",
      createdAt: "2025-03-14T14:20:00Z",
    },
    {
      id: "task-3",
      title: "Research on AI Ethics",
      category: "research",
      status: "completed",
      dueDate: "2025-03-20",
      createdAt: "2025-03-10T09:15:00Z",
      feedback: "Excellent work! Very thorough research.",
    },
    {
      id: "task-4",
      title: "Database Schema Design",
      category: "programming",
      status: "rejected",
      dueDate: "2025-03-22",
      createdAt: "2025-03-12T16:30:00Z",
      feedback: "Please revise the relationships between tables.",
    },
  ]

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Tasks</CardTitle>
          <CardDescription>Your latest assigned tasks</CardDescription>
        </div>
        <Link href="/student-dashboard/tasks">
          <Button variant="outline" size="sm">
            View All Tasks
            <ArrowRight className={`${isRtl ? "mr-2" : "ml-2"} h-4 w-4`} />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-full ${
                    task.status === "completed"
                      ? "bg-green-100 dark:bg-green-900"
                      : task.status === "in-progress"
                        ? "bg-amber-100 dark:bg-amber-900"
                        : task.status === "rejected"
                          ? "bg-red-100 dark:bg-red-900"
                          : "bg-blue-100 dark:bg-blue-900"
                  }`}
                >
                  {task.status === "completed" ? (
                    <CheckSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : task.status === "in-progress" || task.status === "rejected" ? (
                    <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(task.dueDate).toLocaleDateString()} • {task.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <StatusBadge
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  status={task.status as any}
                  label={
                    task.status === "completed"
                      ? "Completed"
                      : task.status === "in-progress"
                        ? "In Progress"
                        : task.status === "rejected"
                          ? "Rejected"
                          : "New"
                  }
                  size="sm"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

