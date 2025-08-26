"use client";

import { prisma } from "@/prisma/prisma";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRef } from "react";
import { NavBar } from "../components/Navbar";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

 export default  function Register() {
    const nameRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

     return (
       <>
         <div className="text-white flex flex-col h-screen ">
           <NavBar />

           <div className=" flex  h-lvh justify-center items-center">
             <div className="outline-1 outline-neutral-400 rounded-xl min-w-90 flex flex-col items-center p-10 justify-around gap-10">
               <div className="text-xl text-neutral-200">Sign Up</div>
               <div className="flex flex-col gap-4 text-neutral-200">
                 <Input
                   placeholder="JohnDoe"
                   type="text"
                   label="Username"
                   ref={nameRef}
                 />
                 <Input
                   placeholder="johndoe.com"
                   type="text"
                   label="Email"
                   ref={emailRef}
                 />
                 <Input
                   placeholder="Secure"
                   type="password"
                   label="Password"
                   ref={passRef}
                 />
               </div>
               <Button
                 onClick={async () => {
                   await axios.post("http://localhost:3000/api/register", {
                     name: nameRef.current?.value,
                     email: emailRef.current?.value,
                     password: passRef.current?.value,
                   });

                   redirect("/api/auth/signin");
                 }}
                 name="Submit"
               />
             </div>
           </div>
         </div>

         {/* <div className="text-white border-1">
         Username
         <input type="text" ref={nameRef} />
         <br />
         Passowrd
         <input type="password" ref={passRef} />
         <br />
         Email
         <input type="text" ref={emailRef} />
         <br />
         <br />
         <button onClick={ async() => {
           await axios.post("http://localhost:3000/api/register",{
             name: nameRef.current?.value,
             email: emailRef.current?.value,
             password: passRef.current?.value
            })
            redirect('/api/auth/signin')
          }}>Submit</button>
       </div> */}
       </>
     );
  }

