/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { StatusBadge } from "@/components/atoms/status-badge"
import { FileText, Calendar, Upload, Send, AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TaskDetailDialog({
  task,
  open,
  onOpenChange,
}: {
  task: any
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { t, language } = useLanguage()
  const isRtl = language === "ar"

  const [notes, setNotes] = useState(task.notes || "")
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [currentStatus, setCurrentStatus] = useState(task.status)

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
    setCurrentStatus("in-progress")
  }

  const handleSubmitTask = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setCurrentStatus("submitted")
      setIsSubmitting(false)
    }, 1500)
  }

  const handleResubmitTask = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setCurrentStatus("submitted")
      setIsSubmitting(false)
    }, 1500)
  }

  const isDisabled = currentStatus === "submitted" || currentStatus === "completed"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <StatusBadge status={currentStatus as any} label={getStatusLabel(currentStatus)} />
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className={`h-4 w-4 ${isRtl ? "ml-1" : "mr-1"}`} />
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
          <DialogDescription className="text-base mt-2">{task.description}</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="flex flex-wrap h-auto p-1 mb-4">
            <TabsTrigger value="details" className="text-xs sm:text-sm">
              Task Details
            </TabsTrigger>
            <TabsTrigger value="submission" className="text-xs sm:text-sm">
              Submission
            </TabsTrigger>
            {(currentStatus === "completed" || currentStatus === "rejected") && (
              <TabsTrigger value="feedback" className="text-xs sm:text-sm">
                Feedback
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <div className="flex items-center mb-2">
                  <FileText className={`h-4 w-4 ${isRtl ? "ml-2" : "mr-2"} text-primary`} />
                  <span className="font-medium">Category</span>
                </div>
                <p className="text-muted-foreground capitalize">{task.category}</p>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <div className="flex items-center mb-2">
                  <Calendar className={`h-4 w-4 ${isRtl ? "ml-2" : "mr-2"} text-primary`} />
                  <span className="font-medium">Created</span>
                </div>
                <p className="text-muted-foreground">{new Date(task.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {currentStatus === "new" && (
              <div className="mt-6 p-4 border border-dashed rounded-md flex flex-col items-center justify-center text-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="font-medium">Ready to start working on this task?</h3>
                <p className="text-muted-foreground mb-4">Click the button below to begin working on this task.</p>
                <Button onClick={handleStartTask}>Start Task</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="submission" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add your notes about the task here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={isDisabled}
                className="min-h-[120px]"
              />
            </div>

            {task.requiresFile && (
              <div className="space-y-2">
                <Label htmlFor="file">Attachment</Label>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="w-full">
                    <div
                      className={`border-2 border-dashed rounded-md p-4 text-center ${isDisabled ? "bg-muted" : ""}`}
                    >
                      {file ? (
                        <div className="flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary mr-2" />
                          <span>{file.name}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            {isDisabled ? "No file attached" : "Drag and drop your file here, or click to browse"}
                          </p>
                        </div>
                      )}
                      <input
                        id="file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={isDisabled}
                      />
                    </div>
                  </div>
                  {!isDisabled && (
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("file")?.click()}
                      className="w-full sm:w-auto"
                    >
                      Browse
                    </Button>
                  )}
                </div>
              </div>
            )}

            {currentStatus === "in-progress" && (
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleSubmitTask}
                  disabled={isSubmitting || (task.requiresFile && !file)}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit for Review
                    </>
                  )}
                </Button>
              </div>
            )}

            {currentStatus === "submitted" && (
              <div className="mt-6 p-4 border border-dashed rounded-md flex flex-col items-center justify-center text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                <h3 className="font-medium">Task Submitted</h3>
                <p className="text-muted-foreground">Your task has been submitted and is awaiting review.</p>
                <p className="text-muted-foreground text-sm mt-2">Submitted on: {new Date().toLocaleDateString()}</p>
              </div>
            )}

            {currentStatus === "rejected" && (
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleResubmitTask}
                  disabled={isSubmitting || (task.requiresFile && !file)}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Resubmitting...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Resubmit Task
                    </>
                  )}
                </Button>
              </div>
            )}
          </TabsContent>

          {(currentStatus === "completed" || currentStatus === "rejected") && (
            <TabsContent value="feedback" className="space-y-4">
              <div className="p-4 bg-muted rounded-md">
                <div className="flex items-center mb-2">
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
                      currentStatus === "completed" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    } mr-2`}
                  >
                    {currentStatus === "completed" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                  </span>
                  <span className="font-medium">
                    {currentStatus === "completed" ? "Task Approved" : "Task Needs Revision"}
                  </span>
                </div>
                <p className="text-muted-foreground mt-2">{task.feedback}</p>
                <p className="text-xs text-muted-foreground mt-4">
                  Reviewed on: {new Date(task.reviewedAt).toLocaleDateString()}
                </p>
              </div>
            </TabsContent>
          )}
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
          <div className="text-xs text-muted-foreground">
            {task.requiresFile && (
              <div className="flex items-center">
                <FileText className="h-3 w-3 mr-1" />
                <span>File attachment required</span>
              </div>
            )}
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

