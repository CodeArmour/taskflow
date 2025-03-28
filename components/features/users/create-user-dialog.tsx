"use client"

import type { ReactNode } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createUser } from "@/actions/create-user"

export function CreateUserDialog({ children }: { children: ReactNode }) {
  const { t } = useLanguage()

  const handleCreateUser = (formData: FormData) => {
    // User creation logic would go here
    try{
      //createUser(Object.fromEntries(formData.entries()));

      console.log("Creating user with data:", Object.fromEntries(formData.entries()))
    }catch(error){
      console.error("Error creating user:", error)
    }
    
  }

  return (
    <Dialog>
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
              <Input id="name" name="name" placeholder={t("create_user.full_name")} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t("create_user.email")}</Label>
              <Input id="email" name="email" type="email" placeholder={t("create_user.email")} required />
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
            <Button type="submit">{t("create_user.submit")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

