import express  from "express";
import {client} from "@repo/db/client"

const app = express();

app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Hi, welcome to the server")
});


app.post("/signup",async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = await client.user.create({
        data:{
            name,
            email,
            password
        }
    });

    console.log(user);
    res.json({
        message:"User created successfully",
        id:user.id
    
    })
})

app.listen(3002)