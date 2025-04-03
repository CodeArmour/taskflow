"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type DeleteUserResponse = {
  success: boolean;
  error?: string;
};

export async function deleteUser(userId: string): Promise<DeleteUserResponse> {
  try {
    // Perform the deletion directly
    await db.user.delete({
      where: { id: userId },
    });

    // Revalidate the users page to reflect the changes
    revalidatePath("/dashboard/users");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);

    // Handle specific Prisma errors
    if (error instanceof PrismaClientKnownRequestError) {
      // P2025 is "Record not found"
      if (error.code === "P2025") {
        return {
          success: false,
          error: "User not found",
        };
      }
      // P2003 is "Foreign key constraint failed"
      if (error.code === "P2003") {
        return {
          success: false,
          error: "Cannot delete user because they have related data",
        };
      }
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete user",
    };
  }
}