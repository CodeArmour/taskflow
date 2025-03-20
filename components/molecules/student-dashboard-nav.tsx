"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Home, ClipboardList, UserCircle } from "lucide-react"
import { NavLink } from "@/components/molecules/nav-link"

export function StudentDashboardNav({ mobile = false }: { mobile?: boolean }) {
  const { t } = useLanguage()

  const navItems = [
    {
      title: t("nav.dashboard"),
      href: "/student-dashboard",
      icon: Home,
    },
    {
      title: t("nav.tasks"),
      href: "/student-dashboard/tasks",
      icon: ClipboardList,
    },
    {
      title: t("nav.profile"),
      href: "/student-dashboard/profile",
      icon: UserCircle,
    },
  ]

  return (
    <nav className={`${mobile ? "flex-1 p-4 space-y-2" : "flex-1 p-4 space-y-1 overflow-auto"}`}>
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.title}
          icon={item.icon}
          variant={mobile ? "mobile" : "sidebar"}
          showActiveIndicator={!mobile}
        />
      ))}
    </nav>
  )
}

