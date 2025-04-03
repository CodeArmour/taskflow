// app/actions/create-user.ts
"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

type CreateUserData = {
  name: string
  email: string
  role: "admin" | "student"
}

export async function createUser(data: CreateUserData) {
  try {
    // Split name into first and last name
    const nameParts = data.name.trim().split(" ")
    const firstName = nameParts[0]
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : ""

    // Create the user in the database
    await db.user.create({
      data: {
        firstName,
        lastName,
        email: data.email,
        role: data.role.toUpperCase() as "ADMIN" | "STUDENT",
        status: "ACTIVE", // Default to active
        createdAt: new Date(),
        password: "defaultPassword123", // Replace with a secure default or hashed password
        
      }
    })

    // Revalidate the users page to reflect the changes
    revalidatePath("/dashboard/users")
    
    return { success: true }
  } catch (error) {
    console.error("Failed to create user:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to create user" 
    }
  }
}