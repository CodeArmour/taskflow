"use server"
import { db } from "@/lib/db";

export const getUsers = async () => {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}