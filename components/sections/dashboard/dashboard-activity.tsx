"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

export function DashboardActivity() {
  const { t } = useLanguage()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.activity")}</CardTitle>
          <CardDescription>{t("dashboard.overview")}</CardDescription>
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
          <CardTitle>{t("dashboard.system_overview")}</CardTitle>
          <CardDescription>{t("dashboard.overview")}</CardDescription>
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
  )
}

