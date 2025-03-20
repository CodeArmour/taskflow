"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { CreateUserDialog } from "@/components/features/users/create-user-dialog"
import { ThemeToggle } from "@/components/molecules/theme-toggle"
import { LanguageSwitcher } from "@/components/molecules/language-switcher"

export function UsersHeader() {
  const { t, language } = useLanguage()
  const isRtl = language === "ar"

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("users.title")}</h1>
        <p className="text-muted-foreground">{t("users.subtitle")}</p>
      </div>
      <div className="mt-4 md:mt-0">
      <ThemeToggle />
      <LanguageSwitcher />
        <CreateUserDialog>
          <Button className="btn-primary">
            <Plus className={`${isRtl ? "ml-2" : "mr-2"} h-4 w-4`} />
            {t("users.add_user")}
          </Button>
        </CreateUserDialog>
      </div>
    </div>
  )
}

