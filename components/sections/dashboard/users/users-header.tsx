"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { CreateUserDialog } from "@/components/features/users/create-user-dialog"

export function UsersHeader() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("users.title")}</h1>
        <p className="text-muted-foreground">
          {t("users.subtitle")}
        </p>
      </div>
      <CreateUserDialog>
        <Button size="sm" className="h-9">
          <PlusCircle className="mr-2 h-4 w-4" />
          create user
        </Button>
      </CreateUserDialog>
    </div>
  )
}