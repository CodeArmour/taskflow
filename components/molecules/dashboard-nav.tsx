"use client"
import { useLanguage } from "@/components/providers/language-provider"
import { Home, ClipboardList, CheckSquare, Users } from "lucide-react"
import { NavLink } from "@/components/molecules/nav-link"

export function DashboardNav({ mobile = false }: { mobile?: boolean }) {
  const { t } = useLanguage()

  const navItems = [
    {
      title: t("nav.dashboard"),
      href: "/dashboard",
      icon: Home,
    },
    {
      title: t("nav.tasks"),
      href: "/dashboard/tasks",
      icon: ClipboardList,
    },
    {
      title: t("nav.reviews"),
      href: "/dashboard/reviews",
      icon: CheckSquare,
    },
    {
      title: t("nav.users"),
      href: "/dashboard/users",
      icon: Users,
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

