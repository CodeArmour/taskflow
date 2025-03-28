// next-auth.d.ts
import { DefaultSession } from "next-auth";
import { Role } from "@prisma/client"; // Import Role enum

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role; // Ensure token has role typed as Role
  }
}
