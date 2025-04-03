"use client";

import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { TaskCard } from "@/components/features/tasks/task-card";
import { listTasks } from "@/actions/tasks-actions";
import { TaskCategory, TaskState } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { CreateTaskDialog } from "@/components/features/tasks/create-task-dialog";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a skeleton component

interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  state: TaskState;
  dueDate: string | Date;
  requiresFileSubmission: boolean;
  _count?: { userTasks: number };
}

export function TasksList() {
  const { language } = useLanguage();
  const isRtl = language === "ar";

  // State management
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentTab, setCurrentTab] = useState("all");
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 9,
    totalCount: 0,
    totalPages: 1,
  });

  // Fetch tasks function - memoized to prevent unnecessary rerenders
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      // Convert UI filters to API filter parameters
      const filters = {
        category:
          categoryFilter !== "all"
            ? (categoryFilter as TaskCategory)
            : undefined,
        state: statusFilter !== "all" ? (statusFilter as TaskState) : undefined,
        searchTerm: searchQuery || undefined,
      };

      const result = await listTasks(
        filters,
        pagination.page,
        pagination.pageSize
      );

      if (result.success) {
        setTasks(result.tasks || []);
        setPagination(result.pagination || { page: 1, pageSize: 9, totalCount: 0, totalPages: 1 });
      } else {
        console.error("Failed to fetch tasks:", result.error);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [
    categoryFilter,
    statusFilter,
    searchQuery,
    pagination.page,
    pagination.pageSize,
  ]);

  // Initial fetch and refetch when filters change
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setCurrentTab(value);

    // Update status filter based on tab
    if (value !== "all") {
      setStatusFilter(value.toUpperCase());
    } else {
      setStatusFilter("all");
    }
  };

  // Handle task creation - refresh the list
  const handleTaskCreated = () => {
    fetchTasks();
  };

  // Filtered tasks based on current tab (for client-side filtering)
  const filteredTasks = tasks.filter((task) => {
    if (currentTab === "all") return true;
    return task.state.toLowerCase() === currentTab;
  });

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-[220px]">
          <Skeleton className="h-full w-full" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <CreateTaskDialog onTaskCreated={handleTaskCreated}>
          <Button size="sm">
            <Plus className="mr-1 h-4 w-4" />
            Create New Task
          </Button>
        </CreateTaskDialog>
      </div>

      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <TabsList className="mb-2 md:mb-0">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <Search
                className={`absolute ${
                  isRtl ? "right-2.5" : "left-2.5"
                } top-2.5 h-4 w-4 text-muted-foreground`}
              />
              <Input
                placeholder="Search tasks..."
                className={`${
                  isRtl ? "pr-8" : "pl-8"
                } w-full md:w-[200px] lg:w-[300px]`}
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
                <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                <SelectItem value="PROJECT">Project</SelectItem>
                <SelectItem value="QUIZ">Quiz</SelectItem>
                <SelectItem value="HOMEWORK">Homework</SelectItem>
                <SelectItem value="RESEARCH">Research</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : tasks.length === 0 ? (
          <div className="text-center p-12 border rounded-lg bg-muted/20">
            <h3 className="text-lg font-medium">No tasks found</h3>
            <p className="text-muted-foreground mt-1">
              You haven&apos;t created any tasks yet
            </p>
            <CreateTaskDialog onTaskCreated={handleTaskCreated}>
              <Button className="mt-4">
                <Plus className="mr-1 h-4 w-4" />
                Create your first task
              </Button>
            </CreateTaskDialog>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
          </div>
        )}

        {!loading && tasks.length > 0 && pagination.totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === 1}
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                }
              >
                Previous
              </Button>
              <div className="flex items-center px-4 text-sm">
                Page {pagination.page} of {pagination.totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === pagination.totalPages}
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Tabs>
    </div>
  );
}
