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
import { Search, User, RefreshCw } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { UserCard } from "@/components/features/users/user-card";
import { getUsers } from "@/actions/users-list";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/actions/delete-user";
import { toast } from "@/hooks/use-toast";

export function UsersList() {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch users function that can be called to refresh the list
  const fetchUsers = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial data fetch on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Listen for specific custom events from the createUser action
  useEffect(() => {
    // Setup listener for user creation event
    const handleUserCreated = () => {
      fetchUsers();
    };

    // Add the event listener
    window.addEventListener("user-created", handleUserCreated);

    // Clean up
    return () => {
      window.removeEventListener("user-created", handleUserCreated);
    };
  }, [fetchUsers]);

  const handleDeleteUser = async (userId: string) => {
    try {
      const result = await deleteUser(userId);

      if (result.success) {
        toast({
          title: "User deleted",
          description: "The user has been successfully deleted.",
        });
        // Refresh the users list after successful deletion
        fetchUsers();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete user",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" ||
      user.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handle manual refresh
  const handleRefresh = () => {
    fetchUsers();
  };

  // Loading state (initial load)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full py-12">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setStatusFilter}
        >
          <TabsList className="mb-2 md:mb-0">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search
              className={`absolute ${
                isRtl ? "right-2.5" : "left-2.5"
              } top-2.5 h-4 w-4 text-muted-foreground`}
            />
            <Input
              placeholder="Search users..."
              className={`${isRtl ? "pr-8" : "pl-8"} w-full md:w-[250px]`}
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
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="STUDENT">Student</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={handleRefresh}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Refresh"
            title="Refresh"
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user, index) => (
          <UserCard
            key={user.id}
            user={user}
            index={index}
            onDelete={handleDeleteUser}
          />
        ))}

        {filteredUsers.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No users found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </>
  );
}
