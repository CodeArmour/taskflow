"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { 
  DEFULT_USER_LOGIN_REDIRECT, 
  DEFULT_ADMIN_LOGIN_REDIRECT 
} from "@/routes";
import { getUserByEmail } from "@/data/user";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: "Email not found!" };
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || existingUser.role === 'ADMIN' 
        ? DEFULT_ADMIN_LOGIN_REDIRECT
        : DEFULT_USER_LOGIN_REDIRECT
    });

    return result;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};