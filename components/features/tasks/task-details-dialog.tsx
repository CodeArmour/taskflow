/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgressBar } from "@/components/molecules/progress-bar";
import { useLanguage } from "@/components/providers/language-provider";
import {
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  Paperclip,
  MessageSquare,
  Upload,
  BarChart,
  Tag,
} from "lucide-react";

interface TaskDetailDialogProps {
  task: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDetailDialog({
  task,
  open,
  onOpenChange,
}: TaskDetailDialogProps) {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const [activeTab, setActiveTab] = useState("overview");
  const [comment, setComment] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Mock comments data
  const comments = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Instructor",
      },
      content:
        "Please make sure to follow the guidelines provided in the lecture notes.",
      timestamp: "2023-04-15T14:30:00",
    },
    {
      id: 2,
      user: {
        name: "Ahmed Hassan",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      content:
        "I'm having trouble understanding the third requirement. Could you please clarify?",
      timestamp: "2023-04-16T09:15:00",
    },
    {
      id: 3,
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Instructor",
      },
      content:
        "The third requirement is about implementing the algorithm we discussed in class. You need to use the formula from slide 24.",
      timestamp: "2023-04-16T10:45:00",
    },
  ];

  // Mock submissions data
  const submissions = [
    {
      id: 1,
      student: {
        name: "Ahmed Hassan",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      submittedAt: "2023-04-14T15:30:00",
      status: "graded",
      grade: 85,
      feedback: "Good work, but could improve code organization.",
    },
    {
      id: 2,
      student: {
        name: "Fatima Ali",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      submittedAt: "2023-04-15T09:45:00",
      status: "pending",
      grade: null,
      feedback: null,
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmitComment = () => {
    // In a real app, this would send the comment to the server
    console.log("Submitting comment:", comment);
    setComment("");
  };

  const handleSubmitFile = () => {
    // In a real app, this would upload the file to the server
    console.log("Submitting file:", selectedFile);
    setSelectedFile(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "programming":
        return "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300";
      case "design":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
      case "research":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300";
      default:
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "submitted":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto z-50">
        <DialogHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl">{task.title}</DialogTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge
                  variant="outline"
                  className={getCategoryColor(task.category)}
                >
                  <FileText
                    className={`h-3.5 w-3.5 ${isRtl ? "ml-1.5" : "mr-1.5"}`}
                  />
                  {task.category.charAt(0).toUpperCase() +
                    task.category.slice(1)}
                </Badge>
                <Badge
                  variant="outline"
                  className={getStatusColor(task.status)}
                >
                  {task.status === "completed" ? (
                    <CheckCircle
                      className={`h-3.5 w-3.5 ${isRtl ? "ml-1.5" : "mr-1.5"}`}
                    />
                  ) : task.status === "submitted" ? (
                    <Clock
                      className={`h-3.5 w-3.5 ${isRtl ? "ml-1.5" : "mr-1.5"}`}
                    />
                  ) : (
                    <AlertCircle
                      className={`h-3.5 w-3.5 ${isRtl ? "ml-1.5" : "mr-1.5"}`}
                    />
                  )}
                  {task.status === "completed"
                    ? "Completed"
                    : task.status === "submitted"
                    ? "Submitted"
                    : "Active"}
                </Badge>
                {task.priority && (
                  <Badge
                    variant="outline"
                    className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  >
                    Priority
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className={`h-4 w-4 ${isRtl ? "ml-2" : "mr-2"}`} />
                {new Date(task.dueDate).toLocaleDateString()}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs
          defaultValue="overview"
          className="mt-6"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{task.description}</p>

                    {task.requirements && (
                      <div className="mt-6">
                        <h4 className="font-medium mb-2">Requirements</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {task.requirements.map(
                            (req: string, index: number) => (
                              <li key={index}>{req}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {task.resources && (
                      <div className="mt-6">
                        <h4 className="font-medium mb-2">Resources</h4>
                        <div className="space-y-2">
                          {task.resources.map(
                            (resource: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center p-2 border rounded-md"
                              >
                                <Paperclip className="h-4 w-4 text-muted-foreground mr-2" />
                                <span className="text-sm">{resource.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-auto"
                                >
                                  Download
                                </Button>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Assigned by</span>
                      <div className="flex items-center">
                        <Avatar className="h-5 w-5 mr-1">
                          <AvatarImage src="/placeholder.svg?height=30&width=30" />
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <span>Sarah Johnson</span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created at</span>
                      <span>
                        {new Date(
                          task.createdAt || Date.now() - 7 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Due date</span>
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Submissions</span>
                      <span>{task.submissions}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        File required
                      </span>
                      <span>{task.requiresFile ? "Yes" : "No"}</span>
                    </div>

                    <div className="pt-2">
                      <ProgressBar
                        value={task.completionRate}
                        label="Completion rate"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="bg-slate-100 dark:bg-slate-800"
                      >
                        <Tag
                          className={`h-3.5 w-3.5 ${
                            isRtl ? "ml-1.5" : "mr-1.5"
                          }`}
                        />
                        {task.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-slate-100 dark:bg-slate-800"
                      >
                        <Tag
                          className={`h-3.5 w-3.5 ${
                            isRtl ? "ml-1.5" : "mr-1.5"
                          }`}
                        />
                        {task.difficulty || "intermediate"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-slate-100 dark:bg-slate-800"
                      >
                        <Tag
                          className={`h-3.5 w-3.5 ${
                            isRtl ? "ml-1.5" : "mr-1.5"
                          }`}
                        />
                        {task.points ? `${task.points} points` : "10 points"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {task.requiresFile && (
              <Card>
                <CardHeader>
                  <CardTitle>Submit Solution</CardTitle>
                  <CardDescription>
                    Upload your solution files for this task
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="task-file">Select file</Label>
                      <Input
                        id="task-file"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </div>

                    {selectedFile && (
                      <div className="flex items-center p-2 border rounded-md">
                        <Paperclip className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm">{selectedFile.name}</span>
                      </div>
                    )}

                    <Button onClick={handleSubmitFile} disabled={!selectedFile}>
                      <Upload
                        className={`h-4 w-4 ${isRtl ? "ml-2" : "mr-2"}`}
                      />
                      Submit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Submissions Summary</CardTitle>
                <CardDescription>
                  Overview of all submissions for this task
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl">
                        {submissions.length}
                      </CardTitle>
                      <CardDescription>Total Submissions</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl">
                        {
                          submissions.filter((s) => s.status === "graded")
                            .length
                        }
                      </CardTitle>
                      <CardDescription>Graded Submissions</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl">
                        {submissions
                          .filter((s) => s.status === "graded")
                          .reduce((acc, s) => acc + (s.grade || 0), 0) /
                          (submissions.filter((s) => s.status === "graded")
                            .length || 1)}
                        %
                      </CardTitle>
                      <CardDescription>Average Grade</CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Recent Submissions</h3>

                  {submissions.map((submission) => (
                    <Card key={submission.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={submission.student.avatar} />
                              <AvatarFallback>
                                {submission.student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">
                                {submission.student.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(
                                  submission.submittedAt
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <Badge
                              variant="outline"
                              className={
                                submission.status === "graded"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                              }
                            >
                              {submission.status === "graded"
                                ? "Graded"
                                : "Pending"}
                            </Badge>

                            {submission.status === "graded" && (
                              <div className="flex items-center">
                                <BarChart className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span className="font-medium">
                                  {submission.grade}%
                                </span>
                              </div>
                            )}

                            <Button variant="outline" size="sm">
                              View Submission
                            </Button>
                          </div>
                        </div>

                        {submission.feedback && (
                          <div className="mt-4 p-3 bg-muted rounded-md">
                            <h5 className="text-sm font-medium mb-1">
                              Feedback
                            </h5>
                            <p className="text-sm">{submission.feedback}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussion" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Discussion</CardTitle>
                <CardDescription>
                  Ask questions and discuss this task with your instructor and
                  classmates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.user.avatar} />
                        <AvatarFallback>
                          {comment.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{comment.user.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {comment.user.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {new Date(comment.timestamp).toLocaleString()}
                        </p>
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Add Comment</h4>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Type your comment here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button
                        onClick={handleSubmitComment}
                        disabled={!comment.trim()}
                      >
                        <MessageSquare
                          className={`h-4 w-4 ${isRtl ? "ml-2" : "mr-2"}`}
                        />
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
