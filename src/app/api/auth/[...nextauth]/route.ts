import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

type User = {
  id: string;
  email: string;
  name: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<User | null> => {
        const email = credentials?.email;
        const password = credentials?.password || "";

        // get user by email
        const getUser = await prisma.user.findUnique({ where: { email } });
        if (!getUser) {
          throw new Error("User not found");
        }
        // compare password
        if (await compare(password, getUser.password)) {
          return getUser;
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
