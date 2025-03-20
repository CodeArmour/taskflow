"use client"

import type { ReactNode } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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

export function CreateTaskDialog({ children }: { children: ReactNode }) {
  const { t } = useLanguage()

  const handleCreateTask = (formData: FormData) => {
    // Task creation logic would go here
    console.log("Creating task with data:", Object.fromEntries(formData.entries()))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("create_task.title")}</DialogTitle>
          <DialogDescription>{t("create_task.subtitle")}</DialogDescription>
        </DialogHeader>
        <form action={handleCreateTask}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">{t("create_task.task_title")}</Label>
              <Input id="title" name="title" placeholder={t("create_task.task_title")} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">{t("create_task.description")}</Label>
              <Textarea
                id="description"
                name="description"
                placeholder={t("create_task.description")}
                className="min-h-32"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">{t("create_task.category")}</Label>
                <Select name="category" defaultValue="programming">
                  <SelectTrigger id="category">
                    <SelectValue placeholder={t("create_task.category")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">{t("create_task.due_date")}</Label>
                <Input id="dueDate" name="dueDate" type="date" required />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="requiresFile" name="requiresFile" />
              <Label htmlFor="requiresFile">{t("create_task.requires_file")}</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{t("create_task.submit")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

