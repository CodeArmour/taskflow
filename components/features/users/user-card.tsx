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
import {
  User,
  Mail,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash,
  Shield,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/components/providers/language-provider";
import { StatusBadge } from "@/components/atoms/status-badge";
import { ProgressBar } from "@/components/molecules/progress-bar";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserProfileDialog } from "./user-profile-dialog";

type UserCardProps = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "ADMIN" | "STUDENT";
    status: "ACTIVE" | "INACTIVE";
    createdAt: Date;
    profileImageUrl?: string;
    tasksCompleted: number;
    tasksAssigned: number;
    profileCompletion: number;
  };
  index: number;
  onDelete?: (userId: string) => void;
};

export function UserCard({ user, index, onDelete }: UserCardProps) {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false)

  // Set default values if they're not provided
  const profileCompletion = user.profileCompletion || 20;
  const tasksCompleted = user.tasksCompleted || 0;
  const tasksAssigned = user.tasksAssigned || 0;

  // In your UserCard.tsx file, update the handleDelete function:
const handleDelete = async () => {
  if (onDelete) {
    try {
      await onDelete(user.id);
      // You might want to add a success notification here
    } catch (error) {
      console.error("Error deleting user:", error);
      // You might want to add an error notification here
    }
  }
  setShowDeleteDialog(false);
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="h-full enhanced-card">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start z-10">
            <StatusBadge
              status={user.status.toLowerCase() as "active" | "inactive"}
              label={user.status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>User Actions</DropdownMenuLabel>
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
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  <span>Delete User</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">
                {user.firstName} {user.lastName}
              </CardTitle>
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
              <Calendar className={`h-4 w-4 ${isRtl ? "ml-1" : "mr-1"}`} />
              <span>
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <div
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.role === "ADMIN"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                }`}
              >
                {user.role === "ADMIN" ? "ADMIN" : "STUDENT"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-muted/50 p-3 rounded-md text-center">
              <div className="text-2xl font-bold">{tasksCompleted}</div>
              <div className="text-xs text-muted-foreground">
                Tasks Completed
              </div>
            </div>
            <div className="bg-muted/50 p-3 rounded-md text-center">
              <div className="text-2xl font-bold">{tasksAssigned}</div>
              <div className="text-xs text-muted-foreground">
                Tasks Assigned
              </div>
            </div>
          </div>

          <ProgressBar value={profileCompletion} label="Profile Completion" />
        </CardContent>
        <CardFooter className="pt-2">
          <Button variant="outline" className="w-full z-10" onClick={() => setShowProfileDialog(true)}>
            View Profile
          </Button>
        </CardFooter>
      </Card>
      <UserProfileDialog user={user} open={showProfileDialog} onOpenChange={setShowProfileDialog} />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {user.firstName} {user.lastName}?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
