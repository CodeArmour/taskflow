/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, MessageSquare, User } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { StudentProfileCompletion } from "./student-profile-completion"

export function StudentDashboardActivity() {
  const { t } = useLanguage()

  // Mock recent activity data
  const recentActivities = [
    {
      text: "Submitted 'Research on AI Ethics' task",
      time: "2 hours ago",
      icon: FileText,
    },
    {
      text: "Started working on 'Design a Mobile App UI'",
      time: "Yesterday",
      icon: Clock,
    },
    {
      text: "Received feedback on 'Database Schema Design'",
      time: "2 days ago",
      icon: MessageSquare,
    },
    {
      text: "Completed profile information",
      time: "3 days ago",
      icon: User,
    },
  ]

  return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="mt-1 bg-primary/20 p-1.5 rounded-full">
                  <activity.icon className="h-3 w-3 text-primary" />
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
  )
}

