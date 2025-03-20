/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FileText, Calendar, Paperclip, Upload, MessageSquare, AlertCircle } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { StatusBadge } from "@/components/atoms/status-badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function TaskDetailDialog({
  task,
  open,
  onOpenChange,
}: {
  task: any
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useLanguage()
  const [notes, setNotes] = useState(task.notes || "")
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [updatedTask, setUpdatedTask] = useState(task)

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleStartTask = () => {
    // Update task status to in-progress
    const updated = { ...updatedTask, status: "in-progress" }
    setUpdatedTask(updated)
  }

  const handleSubmitTask = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Update task status to submitted
      const updated = {
        ...updatedTask,
        status: "submitted",
        notes: notes,
        submittedAt: new Date().toISOString(),
      }
      setUpdatedTask(updated)
      setIsSubmitting(false)
    }, 1500)
  }

  const handleResubmitTask = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Update task status to submitted
      const updated = {
        ...updatedTask,
        status: "submitted",
        notes: notes,
        submittedAt: new Date().toISOString(),
      }
      setUpdatedTask(updated)
      setIsSubmitting(false)
    }, 1500)
  }

  const isEditable =
    updatedTask.status === "new" || updatedTask.status === "in-progress" || updatedTask.status === "rejected"
  const isSubmittable =
    (updatedTask.status === "in-progress" || updatedTask.status === "rejected") &&
    (notes.trim() !== "" || !updatedTask.requiresFile || file)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>{updatedTask.title}</DialogTitle>
            <StatusBadge status={updatedTask.status as any} label={getStatusLabel(updatedTask.status)} />
          </div>
          <DialogDescription>Category: {updatedTask.category}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Due Date: {new Date(updatedTask.dueDate).toLocaleDateString()}</span>
            </div>
            {updatedTask.requiresFile && (
              <div className="flex items-center">
                <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>File Submission Required</span>
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <h3 className="font-medium">Task Description</h3>
            <p className="text-sm">{updatedTask.description}</p>
          </div>

          {(updatedTask.status === "completed" || updatedTask.status === "rejected") && updatedTask.feedback && (
            <div className="grid gap-2">
              <h3 className="font-medium flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                Feedback from Admin
              </h3>
              <div className="p-3 bg-muted rounded-md text-sm">
                <p>{updatedTask.feedback}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Reviewed on {new Date(updatedTask.reviewedAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {updatedTask.status === "rejected" && (
            <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-700 dark:text-red-300">Task Rejected</h4>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Please review the feedback and resubmit your work.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="notes">Your Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add your notes about this task..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-24"
              disabled={!isEditable || updatedTask.status === "submitted"}
            />
          </div>

          {updatedTask.requiresFile && (
            <div className="grid gap-2">
              <Label htmlFor="file">Attachment</Label>
              {isEditable && updatedTask.status !== "submitted" ? (
                <div className="flex items-center gap-2">
                  <Input id="file" type="file" onChange={handleFileChange} className="flex-1" />
                  {file && (
                    <Button variant="outline" size="sm" className="shrink-0">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload
                    </Button>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-muted rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <span>
                      {file ? file.name : updatedTask.status === "submitted" ? "File submitted" : "No file attached"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex space-x-2 justify-end">
          {updatedTask.status === "new" && <Button onClick={handleStartTask}>Start Working on Task</Button>}

          {(updatedTask.status === "in-progress" || updatedTask.status === "rejected") && (
            <Button
              onClick={updatedTask.status === "rejected" ? handleResubmitTask : handleSubmitTask}
              disabled={!isSubmittable || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {updatedTask.status === "rejected" ? "Resubmitting..." : "Submitting..."}
                </>
              ) : updatedTask.status === "rejected" ? (
                "Resubmit Task"
              ) : (
                "Submit for Review"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

