import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import prisma from "@/db";
import axios from "axios";

export async function POST(req: NextRequest){

    const data = await req.json();

    const email = data.email;

    const emailToken = await bcrypt.hash(email,10);

    try {
        await prisma.verificationToken.upsert({
          where:{
            identifier: email
          },
          update:{
            token:emailToken,
            expires: new Date(Date.now() + 15 * 60 * 1000)
          },
          create:{
            identifier: email,
            token: emailToken,
            expires: new Date (Date.now() + 15 * 60 * 1000)
          }
        });
        await axios.post(`${process.env.NEXTAUTH_URL}/api/mail`,{
            email,
            token: emailToken
        });
        console.log("mail sent")
        return NextResponse.json({
            message:"Verification started"
        }, {status:201})
    } catch (error) {
        return NextResponse.json({
            error: error
        })
    }



}