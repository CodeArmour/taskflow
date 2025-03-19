"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, User, Mail, Calendar, MoreHorizontal, Edit, Trash, Shield } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockUsers } from "@/lib/mock-data"

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter users based on search and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  })

  // Create a new user
  const handleCreateUser = (formData: FormData) => {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as string

    const newUser = {
      id: `user-${users.length + 1}`,
      name,
      email,
      role,
      joinedAt: new Date().toISOString(),
      tasksCompleted: 0,
      tasksAssigned: 0,
      profileCompletion: 30,
      status: "active",
    }

    setUsers([newUser, ...users])
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage users and their access to the system</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>Add a new user to the system</DialogDescription>
              </DialogHeader>
              <form action={handleCreateUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="Enter user's full name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="Enter user's email" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select name="role" defaultValue="student">
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create User</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <Tabs defaultValue="all" className="w-full" onValueChange={setStatusFilter}>
          <TabsList className="mb-2 md:mb-0">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="student">Student</SelectItem>
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
            <h3 className="text-lg font-medium">No users found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UserCard({ user, index }: { user: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="h-full enhanced-card">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.status === "active"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {user.status === "active" ? "Active" : "Inactive"}
            </div>
            <div className="z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  <span>Edit User</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Change Role</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash className="h-4 w-4 mr-2" />
                  <span>Delete User</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <CardDescription className="flex items-center">
                <Mail className="h-3 w-3 mr-1" />
                {user.email}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <div
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                }`}
              >
                {user.role === "admin" ? "Admin" : "Student"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-muted/50 p-3 rounded-md text-center">
              <div className="text-2xl font-bold">{user.tasksCompleted}</div>
              <div className="text-xs text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="bg-muted/50 p-3 rounded-md text-center">
              <div className="text-2xl font-bold">{user.tasksAssigned}</div>
              <div className="text-xs text-muted-foreground">Tasks Assigned</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Profile Completion</span>
              <span className="font-medium">{user.profileCompletion}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  user.profileCompletion < 50
                    ? "bg-amber-500"
                    : user.profileCompletion < 80
                      ? "bg-blue-500"
                      : "bg-green-500"
                }`}
                style={{ width: `${user.profileCompletion}%` }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button variant="outline" className="w-full z-10">
            View Profile
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

