"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskCategory } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createTask } from "@/actions/tasks-actions"; // Update with your actual import path
import { useToast } from "@/hooks/use-toast"; // Assuming you have toast notifications
import { useSession } from "next-auth/react"; // Add this import

export function CreateTaskDialog({
  children,
  onTaskCreated,
}: {
  children: ReactNode;
  onTaskCreated?: () => void;
}) {
  const { toast } = useToast();
  const { data: session } = useSession(); // Get the session data
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCreateTask = async (formData: FormData) => {
    try {
      setIsSubmitting(true);

      // Extract form values
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const category = formData.get("category") as TaskCategory;
      const dueDateStr = formData.get("dueDate") as string;
      const requiresFileSubmission = formData.has("requiresFile");
      const maxSubmissions =
        parseInt(formData.get("maxSubmissions") as string) || 1;

      // Convert date string to Date object
      const dueDate = new Date(dueDateStr);

      // Check if user is authenticated
      if (!session?.user?.id) {
        throw new Error("You must be logged in to create a task");
      }

      // Create task using the action
      const result = await createTask({
        title,
        description,
        category,
        dueDate,
        requiresFileSubmission,
        maxSubmissions,
        createdBy: session.user.id, // Use the user ID from the session
      });

      if (result.success) {
        toast({
          title: "Task Created",
          description: "Your task has been created successfully",
          variant: "default",
        });

        // Close dialog and refresh data if needed
        setOpen(false);
        if (onTaskCreated) {
          onTaskCreated();
        }
      } else {
        toast({
          title: "Error Creating Task",
          description:
            result.error ||
            "There was an error creating your task. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error Creating Task",
        description: "There was an error creating your task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Create a new task for your students or team members.
          </DialogDescription>
        </DialogHeader>
        <form action={handleCreateTask}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Task Title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Description"
                className="min-h-32"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue="ASSIGNMENT">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                    <SelectItem value="PROJECT">Project</SelectItem>
                    <SelectItem value="QUIZ">Quiz</SelectItem>
                    <SelectItem value="HOMEWORK">Homework</SelectItem>
                    <SelectItem value="RESEARCH">Research</SelectItem>
                    <SelectItem value="EXAM">Exam</SelectItem>
                    <SelectItem value="PRESENTATION">Presentation</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" name="dueDate" type="date" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="requiresFile" name="requiresFile" />
                <Label htmlFor="requiresFile">Requires File Submission</Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxSubmissions">Max Submissions</Label>
                <Input
                  id="maxSubmissions"
                  name="maxSubmissions"
                  type="number"
                  defaultValue="1"
                  min="1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}