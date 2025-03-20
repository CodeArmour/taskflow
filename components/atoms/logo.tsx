import Link from "next/link"

interface LogoProps {
  href?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ href = "/", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-sm",
    md: "w-8 h-8 text-base",
    lg: "w-10 h-10 text-lg",
  }

  const logo = (
    <div className="flex items-center space-x-2">
      <div
        className={`${sizeClasses[size]} rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold`}
      >
        TF
      </div>
      <span className={`font-bold ${size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl"}`}>
        TaskFlow
      </span>
    </div>
  )

  if (href) {
    return <Link href={href}>{logo}</Link>
  }

  return logo
}

