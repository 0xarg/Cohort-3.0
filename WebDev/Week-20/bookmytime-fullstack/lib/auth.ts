import prisma from "@/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import  CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";


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
          select: {
            password: true,
            id: true,
            name: true,
            email: true,
          },
        });

        if (userDb && userDb.password) {
          return {
            id: userDb.id,
            name: userDb.name,
            email: userDb.email,
          };
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
};