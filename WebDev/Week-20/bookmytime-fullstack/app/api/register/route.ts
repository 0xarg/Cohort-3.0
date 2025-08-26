import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const data = await req.json()
    let user;
    try {
        user = await prisma.user.create({
        data: {
          name: data.name,
          password: data.password,
          email: data.email,
        },
      });  

      return NextResponse.json({
        message:"registered"
      })    
    } catch (error) {
      return NextResponse.json({
        message:error
      }, {status:400}, )
    }
    }
