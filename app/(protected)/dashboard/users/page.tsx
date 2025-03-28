import { UsersHeader } from "@/components/sections/dashboard/users/users-header"
import { UsersList } from "@/components/sections/dashboard/users/users-list"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <UsersHeader />
      <UsersList />
    </div>
  )
}

