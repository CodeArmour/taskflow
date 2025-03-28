import { getUserById } from "./data/user";
import { Role } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";

export default {
  pages: {
    signIn: "/auth/login",
  },
  providers: [],
  callbacks: {
    async session({ session, token }) {
      //console.log("Session Callback:", { session, token }); // Debug log for session

      // Ensure session.user exists before trying to assign values
      if (session.user) {
        session.user.name = token.name ?? "";
        session.user.email = token.email ?? "";
        session.user.id = token.sub ?? ""; // Ensure user ID is set
        session.user.role = (token.role as Role) ?? "STUDENT"; // If role is missing, set to 'USER' by default
      }

      //console.log("Updated session:", session); // Log updated session to verify

      return session;
    },
    async jwt({ token }) {
      //console.log("JWT Callback:", token); // Debug log for token

      // Check if token has sub (user ID)
      if (token.sub) {
        const existingUser = await getUserById(token.sub);
        if (existingUser) {
          // Set user details into token
          token.name = existingUser.firstName;
          token.email = existingUser.email;
          token.role = existingUser.role; // Ensure role is set
        }
      }

      //console.log("Updated token:", token); // Log updated token to verify
      return token;
    },
  },
} satisfies NextAuthConfig;
