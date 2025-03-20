"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { ProgressBar } from "@/components/molecules/progress-bar"
import Link from "next/link"

export function StudentProfileCompletion() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useLanguage()

  // Mock profile completion data
  const profileSections = [
    { name: "Basic Information", status: "completed", percentage: 100 },
    { name: "Contact Details", status: "completed", percentage: 100 },
    { name: "Education History", status: "in-progress", percentage: 50 },
    { name: "Skills & Expertise", status: "not-started", percentage: 0 },
  ]

  // Calculate overall completion
  const overallCompletion =
    profileSections.reduce((acc, section) => acc + section.percentage, 0) / profileSections.length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Completion</CardTitle>
        <CardDescription>Complete your profile to unlock all features</CardDescription>
      </CardHeader>
      <CardContent>
        <ProgressBar value={overallCompletion} label="Overall Completion" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {profileSections.map((section, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-sm">{section.name}</h3>
                  {section.status === "completed" && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
                <ProgressBar
                  value={section.percentage}
                  size="sm"
                  color={
                    section.status === "completed"
                      ? "success"
                      : section.status === "in-progress"
                        ? "warning"
                        : "primary"
                  }
                  showLabel={false}
                />
                <p className="text-xs text-muted-foreground mt-2 capitalize">{section.status.replace("-", " ")}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Button asChild>
            <Link href="/student-dashboard/profile">Complete Your Profile</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

