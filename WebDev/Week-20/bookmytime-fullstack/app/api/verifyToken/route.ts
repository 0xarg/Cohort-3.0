import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { email } from "zod";

export async function POST(req: NextRequest){
    const {token} = await req.json();
try {
    const tokenDb = await prisma.verificationToken.findFirst({
        where:{
            token
        },
        select:{
            identifier: true
        }
    });

    if (!tokenDb){
        return NextResponse.json({
            message: "token expired or invalid"
        }, {status: 401})
    }
    // await prisma.verificationToken.delete({
    //     where:{
    //         identifier: tokenDb.identifier
    //     }
    // })
    return NextResponse.json({
        message: "Token Verified!",
        email: tokenDb.identifier
    }, {status: 200})
    
} catch (error) {
    console.log(`Error while validating the token, ${error} ` )
    return NextResponse.json({
        error: error
    }, {status: 500})
}
} 