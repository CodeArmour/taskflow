"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { mockTasks } from "@/lib/mock-data"
import { useLanguage } from "@/components/providers/language-provider"
import { TaskCard } from "@/components/features/tasks/task-card"

export function TasksList() {
  const { t, language } = useLanguage()
  const isRtl = language === "ar"

  const [tasks] = useState(mockTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter
    const matchesStatus = statusFilter === "all" || task.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <TabsList className="mb-2 md:mb-0">
          <TabsTrigger value="all">{t("tasks.all")}</TabsTrigger>
          <TabsTrigger value="active">{t("tasks.active")}</TabsTrigger>
          <TabsTrigger value="submitted">{t("tasks.submitted")}</TabsTrigger>
          <TabsTrigger value="completed">{t("tasks.completed")}</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className={`absolute ${isRtl ? "right-2.5" : "left-2.5"} top-2.5 h-4 w-4 text-muted-foreground`} />
            <Input
              placeholder={t("tasks.search")}
              className={`${isRtl ? "pr-8" : "pl-8"} w-full md:w-[200px] lg:w-[300px]`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder={t("tasks.category")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("tasks.all_categories")}</SelectItem>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="writing">Writing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TabsContent value="all" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="active" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks
            .filter((task) => task.status === "active")
            .map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
        </div>
      </TabsContent>

      <TabsContent value="submitted" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks
            .filter((task) => task.status === "submitted")
            .map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
        </div>
      </TabsContent>

      <TabsContent value="completed" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks
            .filter((task) => task.status === "completed")
            .map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

