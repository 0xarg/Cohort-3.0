import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    const {event, creator} = await req.json();

    try {
        await prisma.booking.create({
          data: {
            user: { connect: { id: creator?.id } },
            event: { connect: { id: event?.id } },
          },
        });

        return NextResponse.json({
            message: "Event Booked!"
        }, {status:201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: error
        })
    }

}