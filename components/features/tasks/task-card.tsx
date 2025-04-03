/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Users, Paperclip } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { StatusBadge } from "@/components/atoms/status-badge";
import { ProgressBar } from "@/components/molecules/progress-bar";
import { TaskCategory, TaskState } from "@prisma/client";
import Link from "next/link";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    category: TaskCategory;
    state: TaskState;
    dueDate: string | Date;
    requiresFileSubmission: boolean;
    _count?: { userTasks: number };
  };
  index: number;
}

// Helper function to map category to color
function getCategoryColorClass(category: TaskCategory): string {
  switch (category) {
    case "ASSIGNMENT":
      return "bg-violet-100 dark:bg-violet-900";
    case "PROJECT":
      return "bg-pink-100 dark:bg-pink-900";
    case "QUIZ":
      return "bg-yellow-100 dark:bg-yellow-900";
    case "RESEARCH":
      return "bg-cyan-100 dark:bg-cyan-900";
    case "HOMEWORK":
      return "bg-blue-100 dark:bg-blue-900";
    case "EXAM":
      return "bg-red-100 dark:bg-red-900";
    case "PRESENTATION":
      return "bg-green-100 dark:bg-green-900";
    default:
      return "bg-orange-100 dark:bg-orange-900";
  }
}

// Helper function to get status label
function getStatusLabel(state: TaskState): string {
  // Ensure we handle the status correctly regardless of case
  // The TaskState enum values should be normalized before comparison
  const normalizedState = state.toString().toUpperCase();

  switch (normalizedState) {
    case "TODO":
      return "To Do";
    case "IN_PROGRESS":
      return "In Progress";
    case "COMPLETED":
      return "Completed";
    case "OVERDUE":
      return "Overdue";
    case "CANCELED":
      return "Canceled";
    default:
      return state.toString();
  }
}

// Helper function to format category name for display
function formatCategoryName(category: TaskCategory): string {
  return category
    .toString()
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function TaskCard({ task, index }: TaskCardProps) {
  const { language } = useLanguage();
  const isRtl = language === "ar";

  // Calculate completion rate (this is a placeholder - implement based on your data)
  const completionRate = task._count?.userTasks ? 100 : 0;

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
              status={
                getStatusLabel(task.state).toLowerCase() as
                  | "active"
                  | "inactive"
                  | "completed"
                  | "submitted"
                  | "pending"
                  | "approved"
                  | "rejected"
              }
              label={getStatusLabel(task.state)}
            />
            <div
              className={`flex items-center gap-1 px-3 py-1 rounded-full ${getCategoryColorClass(
                task.category
              )}`}
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">
                {formatCategoryName(task.category)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <CardTitle className="text-lg">{task.title}</CardTitle>
          </div>
          <CardDescription className="line-clamp-2">
            {task.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar className={`h-4 w-4 ${isRtl ? "ml-1" : "mr-1"}`} />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Users className={`h-4 w-4 ${isRtl ? "ml-1" : "mr-1"}`} />
              <span>{task._count?.userTasks || 0} submissions</span>
            </div>
          </div>

          <ProgressBar value={completionRate} label="Completion Rate" />
        </CardContent>
        <CardFooter className="pt-2">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              {task.requiresFileSubmission && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Paperclip className={`h-3 w-3 ${isRtl ? "ml-1" : "mr-1"}`} />
                  <span>File Required</span>
                </div>
              )}
            </div>
            <Link href={`/tasks/${task.id}`}>
              <Button variant="outline" className="z-10" size="sm">
                View Details
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
