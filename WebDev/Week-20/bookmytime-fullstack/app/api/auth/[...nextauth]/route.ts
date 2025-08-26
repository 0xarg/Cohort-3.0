import { prisma } from "@/prisma/prisma";
import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
 const handler= NextAuth({
  //   adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "email",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user  = await prisma.user.findFirst({
            where:{
                email:credentials?.email,
                password: credentials?.password
            }
        })
        console.log("--------------")
        console.log(user)
        if (user){
            return user
        }else{
            return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export const GET = handler;
export const POST = handler;
