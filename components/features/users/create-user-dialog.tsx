"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createUser } from "@/actions/create-user";
import { useToast } from "@/hooks/use-toast";

export function CreateUserDialog({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateUser = async (formData: FormData) => {
    try {
      setIsLoading(true);

      const userData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        role: formData.get("role") as "admin" | "student",
      };

      const result = await createUser(userData);

      if (result.success) {
        toast({
          title: "Success",
          description: "User has been created successfully",
        });

        setIsOpen(false); // Close the dialog on success

        // Dispatch a custom event to notify that a user was created
        // This will trigger the event listener in the UsersList component
        window.dispatchEvent(new CustomEvent("user-created"));
      } else {
        toast({
          title: "Error Creating User",
          description:
            result.error ||
            "There was a problem creating the user. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        title: "Error Creating User",
        description: "There was a problem creating the user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("create_user.title")}</DialogTitle>
          <DialogDescription>{t("create_user.subtitle")}</DialogDescription>
        </DialogHeader>
        <form action={handleCreateUser}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t("create_user.full_name")}</Label>
              <Input
                id="name"
                name="name"
                placeholder={t("create_user.full_name")}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t("create_user.email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t("create_user.email")}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">{t("create_user.role")}</Label>
              <Select name="role" defaultValue="student">
                <SelectTrigger id="role">
                  <SelectValue placeholder={t("create_user.role")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating User..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
