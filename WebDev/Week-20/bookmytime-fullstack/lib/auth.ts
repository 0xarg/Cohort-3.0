import prisma from "@/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import  CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt"


export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "bookmytime.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const userDb = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (userDb && userDb.password && await bcrypt.compare(credentials.password, userDb.password)) {
          return userDb
        } else {
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? ""
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session:{
    strategy:"jwt"
  }
};