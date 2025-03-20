"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface NavLinkProps {
  href: string
  label: string
  icon?: LucideIcon
  showActiveIndicator?: boolean
  variant?: "default" | "sidebar" | "mobile"
}

export function NavLink({ href, label, icon: Icon, showActiveIndicator = false, variant = "default" }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  const variants = {
    default: "text-muted-foreground hover:text-foreground transition-colors text-base font-medium",
    sidebar: cn(
      "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground",
    ),
    mobile: "text-foreground py-3 hover:text-primary transition-colors text-lg font-medium",
  }

  return (
    <Link href={href} className={variants[variant]}>
      {Icon && <Icon className="h-5 w-5" />}
      <span>{label}</span>

      {showActiveIndicator && isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute right-0 w-1 h-8 bg-primary rounded-l-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  )
}

