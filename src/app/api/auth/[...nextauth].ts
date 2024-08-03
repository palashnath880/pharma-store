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
        const password = credentials?.password;

        console.log(email, password);

        const user: User = {
          name: "palash",
          id: "s22323",
          email: "email@gmail.com",
        };
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
