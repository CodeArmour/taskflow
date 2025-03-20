"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, ClipboardList, CheckSquare, Clock } from "lucide-react"
import { mockTasks } from "@/lib/mock-data"
import { useLanguage } from "@/components/providers/language-provider"

export function DashboardStats() {
  const { t } = useLanguage()

  // Mock statistics
  const stats = [
    {
      title: t("dashboard.stats.total_tasks"),
      value: mockTasks.length,
      icon: ClipboardList,
      color: "bg-blue-500",
    },
    {
      title: t("dashboard.stats.completed_tasks"),
      value: mockTasks.filter((task) => task.status === "completed").length,
      icon: CheckSquare,
      color: "bg-green-500",
    },
    {
      title: t("dashboard.stats.pending_reviews"),
      value: mockTasks.filter((task) => task.status === "submitted").length,
      icon: Clock,
      color: "bg-amber-500",
    },
    {
      title: t("dashboard.stats.total_users"),
      value: 24,
      icon: Users,
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-muted-foreground text-sm">{stat.title}</span>
                  <span className="text-3xl font-bold">{stat.value}</span>
                </div>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

