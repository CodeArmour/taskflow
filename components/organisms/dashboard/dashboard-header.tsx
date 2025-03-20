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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, Bell, LogOut } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { Logo } from "@/components/atoms/logo"
import { LanguageSwitcher } from "@/components/molecules/language-switcher"
import { ThemeToggle } from "@/components/molecules/theme-toggle"
import { DashboardNav } from "@/components/molecules/dashboard-nav"

export function DashboardHeader() {
  const { t } = useLanguage()
  const isMobile = useMobile()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Mobile Menu */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-4 border-b">
                <Logo href="/dashboard" />
              </div>
              <DashboardNav mobile />
            </SheetContent>
          </Sheet>
        )}

        <div className="md:hidden">
          <Logo href="/dashboard" />
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile User Menu */}
          {isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Admin User</DropdownMenuLabel>
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
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>{t("nav.logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}

