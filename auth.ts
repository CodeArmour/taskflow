import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import Credentials  from "next-auth/providers/credentials"
import { getUserByEmail } from "./data/user";

export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        const user = await getUserByEmail(email);
        if (user && user.password === password) {
          return user;
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
});
