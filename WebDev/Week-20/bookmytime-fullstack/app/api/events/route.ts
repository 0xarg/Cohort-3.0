import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    
    const session = await getServerSession(authOptions);
    const {title, description, location, date} = await req.json();

    try {
        const user = await prisma.user.findFirst({
            where:{
                email: session?.user?.email
            }
        })

        const event = await prisma.event.create({
            data:{
                title,
                description,
                location,
                date: new Date(date),
                creator: {connect: {id:user?.id}}
            },
            include:{
                creator: true,
                bookings: true
            }
        });

        console.log(event)

        return NextResponse.json({
            message: 'Event Created!',
            event: event
        }, {status: 201})



    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: error
        }, {status:500})
    }

}


export async function GET(){
    const session = await getServerSession(authOptions);

    try {
        const user = await prisma.user.findFirst({
                where:{
                    email: session?.user?.email
                }
            })
    
    
        const events = await prisma.event.findMany({
            where:{
                creatorId: user?.id
            },
           
            include:{
                creator: true,
                bookings: true
            }
        });
        
            return NextResponse.json({
                events: events
            }, {status: 200})
        
    } catch (error) {
        
    }


}


export async function DELETE(req:NextRequest){
    const {eventId} = await req.json();
    try {
        await prisma.event.delete({
            where:{
                id: eventId
            }
        })    
        return NextResponse.json({
            message: "Event Deleted!"
        }, {status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: error
        })
    }

}


export async function PUT(req: NextRequest){

    const { id, title, description, location, date } = await req.json();

    try {
        const event = await prisma.event.update({
            where:{
                id: id
            },
            data:{
                title,
                description,
                location,
                date: new Date(date)
            },
            include:{
                bookings: true
            }
        });
        return NextResponse.json({
            message: "Event changed!",
            event:event
        }, {status:200})
    } catch (error) {
      console.log(error);
              return NextResponse.json(
                {
                  error: error,
                },
                { status: 500 }
              );  
    }
}