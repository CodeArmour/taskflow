"use client"

import { useLanguage } from "@/components/providers/language-provider"

export function StudentProfileHeader() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useLanguage()

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Complete your profile information to unlock all features</p>
      </div>
    </div>
  )
}

