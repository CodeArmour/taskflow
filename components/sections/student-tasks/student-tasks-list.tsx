/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { StudentTaskCard } from "@/components/features/student-tasks/student-task-card"

export function StudentTasksList() {
  const { t, language } = useLanguage()
  const isRtl = language === "ar"

  // Mock tasks for student
  const [tasks] = useState([
    {
      id: "task-1",
      title: "Build a REST API",
      description:
        "Create a RESTful API using Node.js and Express with MongoDB as the database. The API should include authentication, CRUD operations, and proper error handling.",
      category: "programming",
      status: "new",
      dueDate: "2025-03-25",
      createdAt: "2025-03-15T10:30:00Z",
      requiresFile: true,
    },
    {
      id: "task-2",
      title: "Design a Mobile App UI",
      description:
        "Create a modern UI design for a mobile app focused on task management. Include screens for dashboard, task list, task details, and user profile.",
      category: "design",
      status: "in-progress",
      dueDate: "2025-03-28",
      createdAt: "2025-03-14T14:20:00Z",
      requiresFile: true,
      notes: "Working on the dashboard and task list screens. Will complete the user profile screen next.",
    },
    {
      id: "task-3",
      title: "Research on AI Ethics",
      description:
        "Conduct research on ethical considerations in artificial intelligence. Write a comprehensive report covering privacy concerns, bias in algorithms, and regulatory frameworks.",
      category: "research",
      status: "submitted",
      dueDate: "2025-03-20",
      createdAt: "2025-03-10T09:15:00Z",
      requiresFile: true,
      notes: "Completed the research and submitted a comprehensive report covering all required topics.",
      submittedAt: "2025-03-18T14:30:00Z",
    },
    {
      id: "task-4",
      title: "Write Technical Documentation",
      description:
        "Create comprehensive technical documentation for a software project. Include installation instructions, API reference, and usage examples.",
      category: "writing",
      status: "completed",
      dueDate: "2025-03-15",
      createdAt: "2025-03-05T11:45:00Z",
      requiresFile: false,
      notes: "Completed the documentation with all required sections.",
      submittedAt: "2025-03-14T11:30:00Z",
      feedback:
        "Great job on the documentation! It's well-structured, clear, and covers all the required aspects. The examples are particularly helpful.",
      reviewedAt: "2025-03-15T09:45:00Z",
    },
    {
      id: "task-5",
      title: "Database Schema Design",
      description:
        "Design a normalized database schema for an e-commerce application. Include tables for products, users, orders, and reviews with proper relationships.",
      category: "programming",
      status: "rejected",
      dueDate: "2025-03-22",
      createdAt: "2025-03-12T16:30:00Z",
      requiresFile: true,
      notes: "Designed the schema with tables for products, users, orders, and reviews.",
      submittedAt: "2025-03-15T16:20:00Z",
      feedback:
        "The schema needs improvement in the relationships between orders and products. Please revise the foreign key constraints and consider adding a junction table for the many-to-many relationship.",
      reviewedAt: "2025-03-16T10:15:00Z",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("due-date-asc")

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Sort tasks based on selected order
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortOrder) {
      case "due-date-asc":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      case "due-date-desc":
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
      case "title-asc":
        return a.title.localeCompare(b.title)
      case "title-desc":
        return b.title.localeCompare(a.title)
      case "status":
        const statusOrder = { new: 1, "in-progress": 2, submitted: 3, rejected: 4, completed: 5 }
        return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder]
      default:
        return 0
    }
  })

  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <TabsList className="mb-2 md:mb-0">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className={`absolute ${isRtl ? "right-2.5" : "left-2.5"} top-2.5 h-4 w-4 text-muted-foreground`} />
            <Input
              placeholder="Search tasks..."
              className={`${isRtl ? "pr-8" : "pl-8"} w-full md:w-[200px] lg:w-[250px]`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="writing">Writing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="due-date-asc">Due Date (Earliest)</SelectItem>
              <SelectItem value="due-date-desc">Due Date (Latest)</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TabsContent value="all" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTasks.map((task, index) => (
            <StudentTaskCard key={task.id} task={task} index={index} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="new" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTasks
            .filter((task) => task.status === "new")
            .map((task, index) => (
              <StudentTaskCard key={task.id} task={task} index={index} />
            ))}
        </div>
      </TabsContent>

      <TabsContent value="in-progress" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTasks
            .filter((task) => task.status === "in-progress" || task.status === "submitted")
            .map((task, index) => (
              <StudentTaskCard key={task.id} task={task} index={index} />
            ))}
        </div>
      </TabsContent>

      <TabsContent value="submitted" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTasks
            .filter((task) => task.status === "submitted")
            .map((task, index) => (
              <StudentTaskCard key={task.id} task={task} index={index} />
            ))}
        </div>
      </TabsContent>

      <TabsContent value="completed" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTasks
            .filter((task) => task.status === "completed")
            .map((task, index) => (
              <StudentTaskCard key={task.id} task={task} index={index} />
            ))}
        </div>
      </TabsContent>

      <TabsContent value="rejected" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTasks
            .filter((task) => task.status === "rejected")
            .map((task, index) => (
              <StudentTaskCard key={task.id} task={task} index={index} />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

