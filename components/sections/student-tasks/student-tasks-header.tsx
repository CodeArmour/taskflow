/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

export function StudentTasksHeader() {
  const { t, language } = useLanguage()
  const isRtl = language === "ar"

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
        <p className="text-muted-foreground">View and manage your assigned tasks</p>
      </div>
      <div className="mt-4 md:mt-0 relative">
        <Search className={`absolute ${isRtl ? "right-2.5" : "left-2.5"} top-2.5 h-4 w-4 text-muted-foreground`} />
        <Input placeholder="Search tasks..." className={`${isRtl ? "pr-8" : "pl-8"} w-full md:w-[300px]`} />
      </div>
    </div>
  )
}

