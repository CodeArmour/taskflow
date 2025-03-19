"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, ClipboardList, CheckSquare, Clock, ArrowRight, Calendar, FileText, AlertCircle } from "lucide-react"
import { mockTasks } from "@/lib/mock-data"

export default function DashboardPage() {
  // Mock statistics
  const stats = [
    {
      title: "Total Tasks",
      value: mockTasks.length,
      icon: ClipboardList,
      color: "bg-blue-500",
    },
    {
      title: "Completed Tasks",
      value: mockTasks.filter((task) => task.status === "completed").length,
      icon: CheckSquare,
      color: "bg-green-500",
    },
    {
      title: "Pending Reviews",
      value: mockTasks.filter((task) => task.status === "submitted").length,
      icon: Clock,
      color: "bg-amber-500",
    },
    {
      title: "Total Users",
      value: 24,
      icon: Users,
      color: "bg-purple-500",
    },
  ]

  // Get recent tasks (last 5)
  const recentTasks = [...mockTasks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Admin! Here&apos;s an overview of your task management system.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            <span>March 2025</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Recent Tasks */}
      <Card className="col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>The latest tasks created in your system</CardDescription>
          </div>
          <Link href="/dashboard/tasks">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
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
                  <div className="text-sm text-muted-foreground mr-4">{task.submissions} submissions</div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : task.status === "submitted"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    }`}
                  >
                    {task.status === "completed"
                      ? "Completed"
                      : task.status === "submitted"
                        ? "Needs Review"
                        : "Active"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity and Notifications */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>Recent activity in your system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { text: "New task 'Database Design' created", time: "2 hours ago" },
                { text: "User John D. submitted task 'API Integration'", time: "5 hours ago" },
                { text: "Task 'UI Design' marked as completed", time: "Yesterday" },
                { text: "New user Sarah J. registered", time: "2 days ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="mt-1 bg-primary/20 p-1.5 rounded-full">
                    <AlertCircle className="h-3 w-3 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>Performance and usage statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Task Completion Rate", value: "78%" },
                { label: "Average Review Time", value: "1.2 days" },
                { label: "Active Users", value: "18/24" },
                { label: "System Uptime", value: "99.9%" },
              ].map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className="font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

