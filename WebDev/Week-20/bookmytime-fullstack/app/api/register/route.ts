import prisma from "@/db";
import { log } from "console";
import { z } from "zod";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const reqBody = z.object({
    email: z.email(),
    name: z.string().min(3).max(20),
    password: z.string().min(3).max(20)
  })

  const SafeData = reqBody.safeParse(data);
  log(SafeData)

  if (!SafeData.success){
    return NextResponse.json({
      message:SafeData.error.issues[0].message
    }, {status:500})
  }

  const hashedPassword = await bcrypt.hash(data.password,10)
  try {
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    await prisma.verificationToken.delete({
      where:{
        identifier: data.email
      }
    })
    return NextResponse.json({
      message: "User registered Succesfully !",
    }, {status:201});
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 400 }
    );
  }
}
