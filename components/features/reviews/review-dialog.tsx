"use client"

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
import { CheckCircle, XCircle, User, FileText, Download } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

export function ReviewDialog({
  submission,
  reviewComment,
  setReviewComment,
  onClose,
  onReview,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submission: any
  reviewComment: string
  setReviewComment: (comment: string) => void
  onClose: () => void
  onReview: (id: string, approved: boolean) => void
}) {
  const { t } = useLanguage()

  return (
    <Dialog open={!!submission} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("reviews.review_submission")}</DialogTitle>
          <DialogDescription>{t("reviews.subtitle")}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <h3 className="font-medium">Task</h3>
            <p>{submission.taskTitle}</p>
          </div>

          <div className="grid gap-2">
            <h3 className="font-medium">{t("reviews.submitted_by")}</h3>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span>{submission.userName}</span>
            </div>
          </div>

          <div className="grid gap-2">
            <h3 className="font-medium">{t("reviews.submission_date")}</h3>
            <p>{new Date(submission.submittedAt).toLocaleString()}</p>
          </div>

          <div className="grid gap-2">
            <h3 className="font-medium">{t("reviews.submission_notes")}</h3>
            <p className="p-3 bg-muted rounded-md">{submission.notes}</p>
          </div>

          {submission.fileUrl && (
            <div className="grid gap-2">
              <h3 className="font-medium">{t("reviews.attached_file")}</h3>
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  <span>submission-file.pdf</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  {t("reviews.download")}
                </Button>
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <h3 className="font-medium">{t("reviews.review_comment")}</h3>
            <Textarea
              placeholder={t("reviews.review_comment")}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              className="min-h-24"
            />
          </div>
        </div>

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={() => onReview(submission.id, false)}>
            <XCircle className="h-4 w-4 mr-2" />
            {t("reviews.reject")}
          </Button>
          <Button onClick={() => onReview(submission.id, true)} className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            {t("reviews.approve")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

