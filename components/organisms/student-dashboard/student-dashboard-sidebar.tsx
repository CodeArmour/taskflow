"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Bell, Home, ClipboardList, UserCircle } from "lucide-react"
import { Logo } from "@/components/atoms/logo"
import { NavLink } from "@/components/molecules/nav-link"
import { useRouter } from "next/navigation"

export function StudentDashboardSidebar() {
  const { t } = useLanguage()
  const router = useRouter()

  const handleLogout = () => {
    // Add logout logic here

    router.push("/login")
  }

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
    <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 border-r bg-card">
      <div className="p-4 border-b">
        <Logo href="/student-dashboard" />
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.title}
            icon={item.icon}
            variant="sidebar"
            showActiveIndicator
          />
        ))}
      </nav>

      <div className="p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <User className="h-5 w-5 mr-2" />
              <span>John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{t("nav.my_account")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              <span>{t("nav.profile")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="h-4 w-4 mr-2" />
              <span>{t("nav.notifications")}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              <span>{t("nav.logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}

