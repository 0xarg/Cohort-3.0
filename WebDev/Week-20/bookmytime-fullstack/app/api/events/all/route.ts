import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await getServerSession(authOptions);
    try {

        const email = session?.user?.email; 
        const events = await prisma.event.findMany({include:{
            bookings: true,
            creator: true
        }});
        return NextResponse.json({
            events:events,
            email: email
        }, {status:200})
    } catch (error) {

        console.log(error)

        return NextResponse.json({
            error: error
        })
        
    }
}