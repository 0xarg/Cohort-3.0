"use client";

import axios from "axios";
import { useRef } from "react";
import { NavBar } from "../components/Navbar";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { redirect, useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { FaGoogle } from "react-icons/fa6";
import Google from "next-auth/providers/google";

export default function Signin() {
  const passRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
    <div className="text-white flex flex-col h-screen ">
      <NavBar />

      <div className=" flex  h-lvh justify-center items-center">
        <div className="outline-1 outline-neutral-400 rounded-xl min-w-90 flex flex-col items-center p-10 justify-around gap-10">
          <div className="text-xl text-neutral-200">Log In</div>
          <div className="flex flex-col gap-4 text-neutral-200">
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
              try {
                const res = await signIn("credentials",{
                redirect:true,
                email:emailRef.current?.value,
                password:passRef.current?.value,
                callbackUrl:'/dashboard'
              });
              if (res?.error){
                alert(res.error)
              }else{
                alert("Loged In")
              }
                
              } catch (error) {
                alert(error);
                console.log(error)
              }
            }}
            name="Submit"
          />
          <div>
          <Button name="Sign In with Google" icon={<FaGoogle />} onClick={()=>{signIn("google",{ redirect:true,callbackUrl:"/dashboard"})}} />
          </div>
        </div>
      </div>
    </div>
  );
}
