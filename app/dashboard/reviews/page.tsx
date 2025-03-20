"use client"

import { ReviewsHeader } from "@/components/sections/dashboard/reviews/reviews-header"
import { ReviewsList } from "@/components/sections/dashboard/reviews/reviews-list"

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <ReviewsHeader />
      <ReviewsList />
    </div>
  )
}

