/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, Users, Paperclip } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { StatusBadge } from "@/components/atoms/status-badge"
import { ProgressBar } from "@/components/molecules/progress-bar"

export function TaskCard({ task, index }: { task: any; index: number }) {
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
          <div className="flex justify-between items-start">
            <StatusBadge
              status={task.status as any}
              label={
                task.status === "completed"
                  ? t("tasks.status.completed")
                  : task.status === "submitted"
                    ? t("tasks.status.submitted")
                    : t("tasks.status.active")
              }
            />
            <div
              className={`p-2 rounded-full ${
                task.category === "programming"
                  ? "bg-violet-100 dark:bg-violet-900"
                  : task.category === "design"
                    ? "bg-pink-100 dark:bg-pink-900"
                    : task.category === "research"
                      ? "bg-cyan-100 dark:bg-cyan-900"
                      : "bg-orange-100 dark:bg-orange-900"
              }`}
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <CardDescription className="line-clamp-2">{task.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar className={`h-4 w-4 ${isRtl ? "ml-1" : "mr-1"}`} />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Users className={`h-4 w-4 ${isRtl ? "ml-1" : "mr-1"}`} />
              <span>
                {task.submissions} {t("tasks.submissions")}
              </span>
            </div>
          </div>

          <ProgressBar value={task.completionRate} label={t("tasks.completion_rate")} />
        </CardContent>
        <CardFooter className="pt-2">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              {task.requiresFile && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Paperclip className={`h-3 w-3 ${isRtl ? "ml-1" : "mr-1"}`} />
                  <span>{t("tasks.file_required")}</span>
                </div>
              )}
            </div>
            <Button variant="outline" className="z-10" size="sm">
              {t("tasks.view_details")}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

