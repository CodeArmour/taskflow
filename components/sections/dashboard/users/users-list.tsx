"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, User } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { UserCard } from "@/components/features/users/user-card"
import { getUsers } from "@/actions/users-list"

export function UsersList() {
  const { t, language } = useLanguage()
  const isRtl = language === "ar"

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const fetchedUsers = await getUsers()
        setUsers(fetchedUsers)
      } catch (error) {
        console.error("Failed to fetch users:", error)
        setUsers([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Filter users based on search and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = 
      statusFilter === "all" || 
      user.status.toLowerCase() === statusFilter.toLowerCase()
  
    return matchesSearch && matchesRole && matchesStatus
  })

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading ... </p>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <Tabs defaultValue="all" className="w-full" onValueChange={setStatusFilter}>
          <TabsList className="mb-2 md:mb-0">
            <TabsTrigger value="all">{t("users.all_users")}</TabsTrigger>
            <TabsTrigger value="active">{t("users.active")}</TabsTrigger>
            <TabsTrigger value="inactive">{t("users.inactive")}</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className={`absolute ${isRtl ? "right-2.5" : "left-2.5"} top-2.5 h-4 w-4 text-muted-foreground`} />
            <Input
              placeholder={t("users.search")}
              className={`${isRtl ? "pr-8" : "pl-8"} w-full md:w-[250px]`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder={t("users.role")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("users.all_roles")}</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="STUDENT">Student</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user, index) => (
          <UserCard key={user.id} user={user} index={index} />
        ))}

        {filteredUsers.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">{t("users.no_users")}</h3>
            <p className="text-muted-foreground mt-1">{t("users.adjust_search")}</p>
          </div>
        )}
      </div>
    </>
  )
}