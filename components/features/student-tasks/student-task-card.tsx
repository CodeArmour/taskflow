/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, Paperclip, MessageSquare } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { StatusBadge } from "@/components/atoms/status-badge"
import { TaskDetailDialog } from "@/components/features/student-tasks/task-detail-dialog"

export function StudentTaskCard({ task, index }: { task: any; index: number }) {
  const { t, language } = useLanguage()
  const isRtl = language === "ar"
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Function to get appropriate status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "new":
        return "New"
      case "in-progress":
        return "In Progress"
      case "submitted":
        return "Submitted"
      case "completed":
        return "Completed"
      case "rejected":
        return "Rejected"
      default:
        return status
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="h-full"
      >
        <Card className="h-full enhanced-card">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <StatusBadge status={task.status as any} label={getStatusLabel(task.status)} />
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
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
              {task.requiresFile && (
                <div className="flex items-center">
                  <Paperclip className={`h-4 w-4 ${isRtl ? "ml-1" : "mr-1"}`} />
                  <span>File Required</span>
                </div>
              )}
            </div>

            {(task.status === "completed" || task.status === "rejected") && task.feedback && (
              <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                <div className="flex items-center mb-1">
                  <MessageSquare className={`h-3 w-3 ${isRtl ? "ml-1" : "mr-1"} text-primary`} />
                  <span className="font-medium text-xs">Feedback</span>
                </div>
                <p className="text-muted-foreground line-clamp-2">{task.feedback}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="default" className="w-full" onClick={() => setIsDialogOpen(true)}>
              {task.status === "new" ? "View Details" : "Manage Task"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <TaskDetailDialog task={task} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  )
}

