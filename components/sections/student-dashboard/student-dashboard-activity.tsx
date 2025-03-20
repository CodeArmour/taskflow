"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { ProgressBar } from "@/components/molecules/progress-bar"

export function StudentDashboardActivity() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useLanguage()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { text: "Submitted 'Research on AI Ethics' task", time: "2 hours ago" },
              { text: "Started working on 'Design a Mobile App UI'", time: "Yesterday" },
              { text: "Received feedback on 'Database Schema Design'", time: "2 days ago" },
              { text: "Completed profile information", time: "3 days ago" },
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
          <CardTitle>Profile Completion</CardTitle>
          <CardDescription>Complete your profile to unlock all features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ProgressBar value={65} label="Profile Completion" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Basic Information</span>
                </div>
                <span className="text-sm font-medium">Completed</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Contact Details</span>
                </div>
                <span className="text-sm font-medium">Completed</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-sm">Education History</span>
                </div>
                <span className="text-sm font-medium">In Progress</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                  <span className="text-sm">Skills & Expertise</span>
                </div>
                <span className="text-sm font-medium">Not Started</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

