"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ReviewsHeader({ searchQuery = "", setSearchQuery = (q: string) => {} }) {
  const { t, language } = useLanguage()
  const isRtl = language === "ar"

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("reviews.title")}</h1>
        <p className="text-muted-foreground">{t("reviews.subtitle")}</p>
      </div>
      <div className="mt-4 md:mt-0 relative">
        <Search className={`absolute ${isRtl ? "right-2.5" : "left-2.5"} top-2.5 h-4 w-4 text-muted-foreground`} />
        <Input
          placeholder={t("reviews.search")}
          className={`${isRtl ? "pr-8" : "pl-8"} w-full md:w-[300px]`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  )
}

