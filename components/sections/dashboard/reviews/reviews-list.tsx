"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle } from "lucide-react"
import { mockSubmissions } from "@/lib/mock-data"
import { useLanguage } from "@/components/providers/language-provider"
import { SubmissionCard } from "@/components/features/reviews/submission-card"
import { ReviewDialog } from "@/components/features/reviews/review-dialog"

export function ReviewsList() {
  const { t } = useLanguage()
  const [submissions, setSubmissions] = useState(mockSubmissions)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchQuery, setSearchQuery] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const [reviewComment, setReviewComment] = useState("")

  // Filter submissions based on search
  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.userName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle review submission
  const handleReview = (submissionId: string, approved: boolean) => {
    setSubmissions(
      submissions.map((submission) =>
        submission.id === submissionId
          ? {
              ...submission,
              status: approved ? "approved" : "rejected",
              reviewComment: reviewComment,
            }
          : submission,
      ),
    )
    setSelectedSubmission(null)
    setReviewComment("")
  }

  return (
    <>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">{t("reviews.pending")}</TabsTrigger>
          <TabsTrigger value="approved">{t("reviews.approved")}</TabsTrigger>
          <TabsTrigger value="rejected">{t("reviews.rejected")}</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubmissions
              .filter((submission) => submission.status === "pending")
              .map((submission, index) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  index={index}
                  onReview={() => setSelectedSubmission(submission)}
                />
              ))}

            {filteredSubmissions.filter((submission) => submission.status === "pending").length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">{t("reviews.no_pending")}</h3>
                <p className="text-muted-foreground mt-1">{t("reviews.all_reviewed")}</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubmissions
              .filter((submission) => submission.status === "approved")
              .map((submission, index) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  index={index}
                  onReview={() => setSelectedSubmission(submission)}
                />
              ))}

            {filteredSubmissions.filter((submission) => submission.status === "approved").length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">{t("reviews.no_approved")}</h3>
                <p className="text-muted-foreground mt-1">{t("reviews.no_approved")}</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubmissions
              .filter((submission) => submission.status === "rejected")
              .map((submission, index) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  index={index}
                  onReview={() => setSelectedSubmission(submission)}
                />
              ))}

            {filteredSubmissions.filter((submission) => submission.status === "rejected").length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <XCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">{t("reviews.no_rejected")}</h3>
                <p className="text-muted-foreground mt-1">{t("reviews.no_rejected")}</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      {selectedSubmission && (
        <ReviewDialog
          submission={selectedSubmission}
          reviewComment={reviewComment}
          setReviewComment={setReviewComment}
          onClose={() => setSelectedSubmission(null)}
          onReview={handleReview}
        />
      )}
    </>
  )
}

