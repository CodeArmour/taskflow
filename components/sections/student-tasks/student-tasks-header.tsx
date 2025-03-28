/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Input } from "@/components/ui/input"
import { Calendar, Search } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { Button } from "@/components/ui/button"

export function StudentTasksHeader() {
  const { t, language } = useLanguage()
  const isRtl = language === "ar"

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
        <p className="text-muted-foreground">View and manage your assigned tasks</p>
      </div>
      <Button>
          <Calendar className="mr-2 h-4 w-4" />
          <span>March 2025</span>
      </Button>
    </div>
  )
}

