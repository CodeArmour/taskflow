"use client"

import { useLanguage } from "@/components/providers/language-provider"

export function TasksHeader() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("tasks.title")}</h1>
        <p className="text-muted-foreground">{t("tasks.subtitle")}</p>
      </div>
    </div>
  )
}

