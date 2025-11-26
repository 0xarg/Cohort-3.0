const express = require("express");

const app = express();

app.get('/',(req,res)=>{
    res.send("Hello world");
});


app.listen(3000);

console.log("ENV Variable");

console.log(process.env.DATABASE_URL);