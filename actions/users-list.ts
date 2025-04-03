"use server"

import { db } from "@/lib/db"

export async function getUsers() {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      }
    })

    return users
  } catch (error) {
    console.error("Failed to fetch users:", error)
    throw new Error("Failed to fetch users")
  }
}