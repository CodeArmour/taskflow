"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckSquare, Clock, FileText, ArrowRight } from "lucide-react"
import { mockTasks } from "@/lib/mock-data"
import { useLanguage } from "@/components/providers/language-provider"
import { StatusBadge } from "@/components/atoms/status-badge"

export function RecentTasks() {
  const { t, language } = useLanguage()
  const isRtl = language === "ar"

  // Get recent tasks (last 5)
  const recentTasks = [...mockTasks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("dashboard.recent_tasks")}</CardTitle>
          <CardDescription>{t("tasks.subtitle")}</CardDescription>
        </div>
        <Link href="/dashboard/tasks">
          <Button variant="outline" size="sm">
            {t("dashboard.view_all")}
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
                      : task.status === "submitted"
                        ? "bg-amber-100 dark:bg-amber-900"
                        : "bg-blue-100 dark:bg-blue-900"
                  }`}
                >
                  {task.status === "completed" ? (
                    <CheckSquare
                      className={`h-5 w-5 ${
                        task.status === "completed"
                          ? "text-green-600 dark:text-green-400"
                          : task.status === "submitted"
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-blue-600 dark:text-blue-400"
                      }`}
                    />
                  ) : task.status === "submitted" ? (
                    <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(task.createdAt).toLocaleDateString()} • {task.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm text-muted-foreground mr-4">
                  {task.submissions} {t("tasks.submissions")}
                </div>
                <StatusBadge
                  status={task.status as any}
                  label={
                    task.status === "completed"
                      ? t("tasks.status.completed")
                      : task.status === "submitted"
                        ? t("tasks.status.submitted")
                        : t("tasks.status.active")
                  }
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

