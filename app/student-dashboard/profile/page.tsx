"use client"

import { StudentProfileHeader } from "@/components/sections/student-profile/student-profile-header"
import { StudentProfileForm } from "@/components/sections/student-profile/student-profile-form"

export default function StudentProfilePage() {
  return (
    <div className="space-y-6">
      <StudentProfileHeader />
      <StudentProfileForm />
    </div>
  )
}

