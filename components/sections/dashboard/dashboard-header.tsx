"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

export function DashboardHeader() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("nav.dashboard")}</h1>
        <p className="text-muted-foreground">
          {t("dashboard.welcome")}, Admin! {t("dashboard.overview")}
        </p>
      </div>
      <div className="mt-4 md:mt-0 flex space-x-2">
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          <span>March 2025</span>
        </Button>
      </div>
    </div>
  )
}

