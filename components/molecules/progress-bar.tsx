interface ProgressBarProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  color?: "primary" | "success" | "warning" | "danger" | "info"
  showLabel?: boolean
  label?: string
}

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  color = "primary",
  showLabel = true,
  label,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100)

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  }

  const colorClasses = {
    primary: "bg-primary",
    success: "bg-green-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    info: "bg-blue-500",
  }

  // Determine color based on percentage if not explicitly set
  const dynamicColor =
    color === "primary" && !label
      ? percentage < 50
        ? colorClasses.warning
        : percentage < 80
          ? colorClasses.info
          : colorClasses.success
      : colorClasses[color]

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span>{label || "Progress"}</span>
          <span className="font-medium">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className={`w-full ${sizeClasses[size]} bg-muted rounded-full overflow-hidden`}>
        <div className={`h-full ${dynamicColor}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

