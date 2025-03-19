"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Moon, Sun, Globe, Menu } from "lucide-react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#", label: t("home") },
    { href: "#services", label: t("services") },
    { href: "#about", label: t("about") },
    { href: "#testimonials", label: t("testimonials") },
    { href: "#contact", label: t("contact") },
  ]

  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
    { code: "hu", label: "Magyar" },
  ]

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              TF
            </motion.div>
            <span className="font-bold text-xl">TaskFlow</span>
          </Link>

          {!isMobile && (
            <nav className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <motion.div key={link.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as typeof language)}
                  className={language === lang.code ? "bg-accent" : ""}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/login">
              <Button variant="default" size={isMobile ? "sm" : "default"}>
                {t("login")}
              </Button>
            </Link>
          </motion.div>

          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-foreground py-2 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </motion.header>
  )
}

