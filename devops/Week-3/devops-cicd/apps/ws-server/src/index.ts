import { WebSocketServer } from "ws";
import { client } from "@repo/db/client"

const server = new WebSocketServer({port:3003});


server.on("connection",async(socket)=>{
    const user = await client.user.create({
        data:{
            name:Math.random().toString(),
            email:Math.random().toString(),
            password:Math.random().toString(),
        }
    });
    console.log(user);
    socket.send("Hi from serevr ws")
})