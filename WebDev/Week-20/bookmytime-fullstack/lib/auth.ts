import prisma from "@/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import  CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt"
import Email from "next-auth/providers/email";


export const authOptions = {
  // adapter: PrismaAdapter(prisma),
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
    // Email({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
  ],

  pages: {
    signIn: "/signin",
    // verifyRequest:"/"
  },
  // session: {
  //   strategy: "database",
  // },
};