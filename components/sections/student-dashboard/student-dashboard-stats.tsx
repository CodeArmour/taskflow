/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ClipboardList, CheckSquare, Clock, AlertCircle } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

export function StudentDashboardStats() {
  const { t } = useLanguage()

  // Mock statistics for student
  const stats = [
    {
      title: "New Tasks",
      value: 3,
      icon: ClipboardList,
      color: "bg-blue-500",
    },
    {
      title: "In Progress",
      value: 2,
      icon: Clock,
      color: "bg-amber-500",
    },
    {
      title: "Completed",
      value: 8,
      icon: CheckSquare,
      color: "bg-green-500",
    },
    {
      title: "Rejected",
      value: 1,
      icon: AlertCircle,
      color: "bg-red-500",
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

