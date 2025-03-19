"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, CheckCircle, XCircle, User, Calendar, FileText, Download, MessageSquare } from "lucide-react"
import { mockSubmissions } from "@/lib/mock-data"

export default function ReviewsPage() {
  const [submissions, setSubmissions] = useState(mockSubmissions)
  const [searchQuery, setSearchQuery] = useState("")
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Reviews</h1>
          <p className="text-muted-foreground">Review and evaluate submitted tasks</p>
        </div>
        <div className="mt-4 md:mt-0 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
            className="pl-8 w-full md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
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
                <h3 className="text-lg font-medium">No pending reviews</h3>
                <p className="text-muted-foreground mt-1">All submissions have been reviewed</p>
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
                <h3 className="text-lg font-medium">No approved submissions</h3>
                <p className="text-muted-foreground mt-1">Approved submissions will appear here</p>
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
                <h3 className="text-lg font-medium">No rejected submissions</h3>
                <p className="text-muted-foreground mt-1">Rejected submissions will appear here</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      {selectedSubmission && (
        <Dialog open={!!selectedSubmission} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Review Submission</DialogTitle>
              <DialogDescription>Review the submission and provide feedback</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <h3 className="font-medium">Task</h3>
                <p>{selectedSubmission.taskTitle}</p>
              </div>

              <div className="grid gap-2">
                <h3 className="font-medium">Submitted by</h3>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span>{selectedSubmission.userName}</span>
                </div>
              </div>

              <div className="grid gap-2">
                <h3 className="font-medium">Submission Date</h3>
                <p>{new Date(selectedSubmission.submittedAt).toLocaleString()}</p>
              </div>

              <div className="grid gap-2">
                <h3 className="font-medium">Submission Notes</h3>
                <p className="p-3 bg-muted rounded-md">{selectedSubmission.notes}</p>
              </div>

              {selectedSubmission.fileUrl && (
                <div className="grid gap-2">
                  <h3 className="font-medium">Attached File</h3>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      <span>submission-file.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid gap-2">
                <h3 className="font-medium">Review Comment</h3>
                <Textarea
                  placeholder="Provide feedback on this submission..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="min-h-24"
                />
              </div>
            </div>

            <DialogFooter className="flex space-x-2 justify-end">
              <Button variant="outline" onClick={() => handleReview(selectedSubmission.id, false)}>
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button
                onClick={() => handleReview(selectedSubmission.id, true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function SubmissionCard({ submission, index, onReview }: { submission: any; index: number; onReview: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="h-full enhanced-card">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                submission.status === "approved"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : submission.status === "rejected"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
              }`}
            >
              {submission.status === "approved"
                ? "Approved"
                : submission.status === "rejected"
                  ? "Rejected"
                  : "Pending Review"}
            </div>
          </div>
          <CardTitle className="text-lg">{submission.taskTitle}</CardTitle>
          <CardDescription>Submitted by {submission.userName}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
            </div>
            {submission.fileUrl && (
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                <span>File attached</span>
              </div>
            )}
          </div>

          <div className="text-sm line-clamp-3">{submission.notes}</div>

          {submission.reviewComment && (
            <div className="mt-4 p-3 bg-muted rounded-md text-sm">
              <div className="flex items-center mb-1">
                <MessageSquare className="h-3 w-3 mr-1 text-primary" />
                <span className="font-medium text-xs">Feedback</span>
              </div>
              <p className="text-muted-foreground line-clamp-2">{submission.reviewComment}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2">
          <div className="w-full">
            {submission.status === "pending" ? (
              <Button onClick={onReview} className="w-full">
                Review Submission
              </Button>
            ) : (
              <Button variant="outline" onClick={onReview} className="w-full">
                View Details
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

