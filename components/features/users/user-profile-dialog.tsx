/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Send,
  BarChart,
  BookOpen,
  UserCheck,
} from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { ProgressBar } from "@/components/molecules/progress-bar"
import { StatusBadge } from "@/components/atoms/status-badge"

interface UserProfileDialogProps {
  user: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserProfileDialog({ user, open, onOpenChange }: UserProfileDialogProps) {
  const { language } = useLanguage()
  const isRtl = language === "ar"
  const [activeTab, setActiveTab] = useState("overview")

  if (!user) return null

  // Mock data for the profile sections
  const profileSections = [
    { name: "Basic Info", completion: 100 },
    { name: "Contact Details", completion: 75 },
    { name: "Education", completion: 50 },
    { name: "Skills", completion: 25 },
  ]

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "task_completed",
      description: "Completed Mathematics Assignment",
      date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: 2,
      type: "submission",
      description: "Submitted Physics Lab Report",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      id: 3,
      type: "feedback",
      description: "Received feedback on English Essay",
      date: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
  ]

  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: "Mathematics Assignment",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      status: "in_progress",
      priority: "high",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      status: "not_started",
      priority: "medium",
    },
    {
      id: 3,
      title: "English Essay",
      dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: "completed",
      priority: "low",
    },
  ]

  // Function to get activity icon based on type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "task_completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "submission":
        return <Send className="h-4 w-4 text-blue-500" />
      case "feedback":
        return <FileText className="h-4 w-4 text-purple-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  // Function to get task status badge
  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <StatusBadge status="completed" label="Completed" />
        //ADD MORE CASES
    }
  }

  // Function to get task priority badge
  const getTaskPriorityBadge = (priority: string) => {
    const classes = {
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      medium: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
      low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    }

    return (
      <Badge className={`${classes[priority as keyof typeof classes]} font-normal`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">User Profile</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          {/* Left sidebar with user info */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <CardDescription className="flex items-center justify-center mt-1">
                    <Mail className="h-3 w-3 mr-1" />
                    {user.email}
                  </CardDescription>

                  <div className="mt-2">
                    <StatusBadge
                      status={user.status as any}
                      label={user.status === "active" ? "Active" : "Inactive"}
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className={`h-5 w-5 ${isRtl ? "ml-3" : "mr-3"} text-muted-foreground mt-0.5`} />
                    <div>
                      <p className="text-sm font-medium">Joined Date</p>
                      <p className="text-sm text-muted-foreground">{new Date(user.joinedAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Briefcase className={`h-5 w-5 ${isRtl ? "ml-3" : "mr-3"} text-muted-foreground mt-0.5`} />
                    <div>
                      <p className="text-sm font-medium">Role</p>
                      <p className="text-sm text-muted-foreground">
                        {user.role === "admin" ? "Administrator" : "Student"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className={`h-5 w-5 ${isRtl ? "ml-3" : "mr-3"} text-muted-foreground mt-0.5`} />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{user.location || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className={`h-5 w-5 ${isRtl ? "ml-3" : "mr-3"} text-muted-foreground mt-0.5`} />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{user.phone || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Profile Completion</h4>
                  <ProgressBar value={user.profileCompletion} label="" />

                  <div className="space-y-2 mt-4">
                    {profileSections.map((section) => (
                      <div key={section.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{section.name}</span>
                          <span className="font-medium">{section.completion}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              section.completion < 50
                                ? "bg-amber-500"
                                : section.completion < 80
                                  ? "bg-blue-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${section.completion}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right content area with tabs */}
          <div className="w-full md:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">
                  <BarChart className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="tasks">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="activity">
                  <Clock className="h-4 w-4 mr-2" />
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-muted/50 p-4 rounded-md text-center">
                        <div className="text-3xl font-bold">{user.tasksCompleted}</div>
                        <div className="text-xs text-muted-foreground">Tasks Completed</div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-md text-center">
                        <div className="text-3xl font-bold">{user.tasksAssigned}</div>
                        <div className="text-xs text-muted-foreground">Tasks Assigned</div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-md text-center">
                        <div className="text-3xl font-bold">
                          {Math.round((user.tasksCompleted / (user.tasksAssigned || 1)) * 100)}%
                        </div>
                        <div className="text-xs text-muted-foreground">Completion Rate</div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-md text-center">
                        <div className="text-3xl font-bold">4.8</div>
                        <div className="text-xs text-muted-foreground">Average Rating</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Mathematics</Badge>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Physics</Badge>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Chemistry</Badge>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Biology</Badge>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">English</Badge>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">History</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Education</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <GraduationCap className={`h-5 w-5 ${isRtl ? "ml-3" : "mr-3"} text-muted-foreground mt-0.5`} />
                        <div>
                          <p className="text-sm font-medium">University of Technology</p>
                          <p className="text-sm text-muted-foreground">Bachelor of Science in Computer Science</p>
                          <p className="text-xs text-muted-foreground">2018 - 2022</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <GraduationCap className={`h-5 w-5 ${isRtl ? "ml-3" : "mr-3"} text-muted-foreground mt-0.5`} />
                        <div>
                          <p className="text-sm font-medium">Central High School</p>
                          <p className="text-sm text-muted-foreground">High School Diploma</p>
                          <p className="text-xs text-muted-foreground">2014 - 2018</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Achievements</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Award className={`h-5 w-5 ${isRtl ? "ml-3" : "mr-3"} text-amber-500 mt-0.5`} />
                        <div>
                          <p className="text-sm font-medium">Top Performer</p>
                          <p className="text-sm text-muted-foreground">Achieved highest score in Mathematics</p>
                          <p className="text-xs text-muted-foreground">June 2023</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Award className={`h-5 w-5 ${isRtl ? "ml-3" : "mr-3"} text-amber-500 mt-0.5`} />
                        <div>
                          <p className="text-sm font-medium">Perfect Attendance</p>
                          <p className="text-sm text-muted-foreground">Maintained 100% attendance for the semester</p>
                          <p className="text-xs text-muted-foreground">December 2022</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tasks" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium">Assigned Tasks</h3>
                      <Button variant="outline" size="sm">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Assign Task
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {tasks.length > 0 ? (
                        tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-lg"
                          >
                            <div className="flex items-start space-x-3 mb-3 sm:mb-0">
                              <div>
                                <h4 className="font-medium">{task.title}</h4>
                                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                  <Calendar className="h-3.5 w-3.5 mr-1" />
                                  <span>
                                    Due: {task.dueDate.toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {getTaskStatusBadge(task.status)}
                              {getTaskPriorityBadge(task.priority)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">No tasks assigned</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-6">Recent Activity</h3>

                    <div className="space-y-6">
                      {recentActivities.length > 0 ? (
                        recentActivities.map((activity) => (
                          <div
                            key={activity.id}
                            className="relative pl-6 pb-6 border-l border-muted-foreground/20 last:pb-0"
                          >
                            <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary" />
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                              <div>
                                <div className="flex items-center">
                                  {getActivityIcon(activity.type)}
                                  <span className="ml-2 font-medium">{activity.description}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{activity.date.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">No recent activity</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

