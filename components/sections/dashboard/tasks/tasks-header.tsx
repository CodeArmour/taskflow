"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { CreateTaskDialog } from "@/components/features/tasks/create-task-dialog"
import { ThemeToggle } from "@/components/molecules/theme-toggle"
import { LanguageSwitcher } from "@/components/molecules/language-switcher"

export function TasksHeader() {
  const { t, language } = useLanguage()
  const isRtl = language === "ar"

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("tasks.title")}</h1>
        <p className="text-muted-foreground">{t("tasks.subtitle")}</p>
      </div>
      <div className="mt-4 md:mt-0">
      <ThemeToggle />
      <LanguageSwitcher />
        <CreateTaskDialog>
          <Button className="btn-primary">
            <Plus className={`${isRtl ? "ml-2" : "mr-2"} h-4 w-4`} />
            {t("tasks.create")}
          </Button>
        </CreateTaskDialog>
      </div>
    </div>
  )
}

