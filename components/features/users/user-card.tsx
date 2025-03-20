/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Calendar, MoreHorizontal, Edit, Trash, Shield } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/providers/language-provider"
import { StatusBadge } from "@/components/atoms/status-badge"
import { ProgressBar } from "@/components/molecules/progress-bar"

export function UserCard({ user, index }: { user: any; index: number }) {
  const { t, language } = useLanguage()
  const isRtl = language === "ar"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="h-full enhanced-card">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start z-10">
            <StatusBadge
              status={user.status as any}
              label={user.status === "active" ? t("users.active") : t("users.inactive")}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("user_actions.title")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  <span>{t("user_actions.edit")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Shield className="h-4 w-4 mr-2" />
                  <span>{t("user_actions.change_role")}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash className="h-4 w-4 mr-2" />
                  <span>{t("user_actions.delete")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <CardDescription className="flex items-center">
                <Mail className="h-3 w-3 mr-1" />
                {user.email}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar className={`h-4 w-4 ${isRtl ? "ml-1" : "mr-1"}`} />
              <span>
                {t("users.joined")} {new Date(user.joinedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <div
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                }`}
              >
                {user.role === "admin" ? "Admin" : "Student"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-muted/50 p-3 rounded-md text-center">
              <div className="text-2xl font-bold">{user.tasksCompleted}</div>
              <div className="text-xs text-muted-foreground">{t("users.tasks_completed")}</div>
            </div>
            <div className="bg-muted/50 p-3 rounded-md text-center">
              <div className="text-2xl font-bold">{user.tasksAssigned}</div>
              <div className="text-xs text-muted-foreground">{t("users.tasks_assigned")}</div>
            </div>
          </div>

          <ProgressBar value={user.profileCompletion} label={t("users.profile_completion")} />
        </CardContent>
        <CardFooter className="pt-2">
          <Button variant="outline" className="w-full z-10">
            {t("users.view_profile")}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

