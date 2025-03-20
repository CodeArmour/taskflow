/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, MessageSquare } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { StatusBadge } from "@/components/atoms/status-badge"

export function SubmissionCard({
  submission,
  index,
  onReview,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submission: any
  index: number
  onReview: () => void
}) {
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
              status={submission.status as any}
              label={
                submission.status === "approved"
                  ? t("reviews.approved")
                  : submission.status === "rejected"
                    ? t("reviews.rejected")
                    : t("reviews.pending")
              }
            />
          </div>
          <CardTitle className="text-lg">{submission.taskTitle}</CardTitle>
          <CardDescription>
            {t("reviews.submitted_by")} {submission.userName}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar className={`h-4 w-4 ${isRtl ? "ml-1" : "mr-1"}`} />
              <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
            </div>
            {submission.fileUrl && (
              <div className="flex items-center">
                <FileText className={`h-4 w-4 ${isRtl ? "ml-1" : "mr-1"}`} />
                <span>{t("reviews.file_attached")}</span>
              </div>
            )}
          </div>

          <div className="text-sm line-clamp-3">{submission.notes}</div>

          {submission.reviewComment && (
            <div className="mt-4 p-3 bg-muted rounded-md text-sm">
              <div className="flex items-center mb-1">
                <MessageSquare className={`h-3 w-3 ${isRtl ? "ml-1" : "mr-1"} text-primary`} />
                <span className="font-medium text-xs">{t("reviews.feedback")}</span>
              </div>
              <p className="text-muted-foreground line-clamp-2">{submission.reviewComment}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2">
          <div className="w-full z-10">
            {submission.status === "pending" ? (
              <Button onClick={onReview} className="w-full">
                {t("reviews.review_submission")}
              </Button>
            ) : (
              <Button variant="outline" onClick={onReview} className="w-full">
                {t("reviews.view_details")}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

