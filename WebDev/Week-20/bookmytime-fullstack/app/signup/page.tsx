"use client";

import axios from "axios";
import { useRef } from "react";
import { NavBar } from "../components/Navbar";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useRouter } from "next/navigation";

export default function Register() {
  const nameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
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
              let res;
              try {
                res = await axios.post("http://localhost:3000/api/register", {
                  name: nameRef.current?.value,
                  email: emailRef.current?.value,
                  password: passRef.current?.value,
                });
                if (res.status === 200) {
                  alert("User created successfully !");
                  router.push("/api/auth/signin")
                }else{
                  alert(res)
                }
              } catch (error: any) {
                if (error.response && error.response.status === 400) {
                  alert(
                    "User Already Exists, Try again with Different Credentials"
                  );
                }
                if(error.response && error.response.status === 500){
                  alert(error.response.data.message)
                }
                else{
                  alert("Something went wrong")
                }

                
              }
            }}
            name="Submit"
          />
        </div>
      </div>
    </div>
  );
}
