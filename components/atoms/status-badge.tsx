import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "active" | "inactive" | "completed" | "submitted" | "pending" | "approved" | "rejected"
  label: string
  size?: "sm" | "md"
}

export function StatusBadge({ status, label, size = "md" }: StatusBadgeProps) {
  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-xs",
    md: "px-2 py-1 text-xs",
  }

  const statusClasses = {
    active: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    submitted: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  return <div className={cn("rounded-full font-medium", sizeClasses[size], statusClasses[status])}>{label}</div>
}

