"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NavBar } from "../components/Navbar";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import axios from "axios";

export default function () {
  const nameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState("Verifying....");
  const [data, setData] = useState("");
  const router = useRouter();

  const params = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    if (!token) {
      setStatus(
        "Not the valid link, please use the link provided in the email!"
      );
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/verifyToken`,
          {
            token,
          }
        );

        if (res.status === 200) {
          setData(res.data.email);
          setStatus("Token Verified !");
          setVerified(true);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setStatus("Invalid token!");
          return;
        }
        if (error.response && error.respone.status === 500) {
          setStatus("Internal server error!");
          return;
        }
      }
    };
    verifyToken()
  },[token]);

  try {
  } catch (error) {}

  return (
    <div className="text-white flex flex-col h-screen ">
      {/* <NavBar /> */}

      <div className=" flex  h-lvh justify-center items-center">
        {verified === true ? (
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
                value={data}
                disabled = {true}
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
                  res = await axios.post(
                    "http://localhost:3000/api/register",
                    {
                      email: data,
                      name: nameRef.current?.value,
                      password: passRef.current?.value
                    }
                  );
                  if (res.status === 201) {
                    alert(
                        `User Created Succesfully, Please login with Creds Now, `
                    );
                    router.push('/signin')
                  } else {
                    alert("Error creating user!");
                  }
                } catch (error: any) {
                  if (error.response && error.response.status === 400) {
                    alert(
                      "User Already Exists, Try again with Different Credentials"
                    );
                  }
                  if (error.response && error.response.status === 500) {
                    alert(error.response.data.message);
                  } else {
                    alert("Something went wrong");
                  }
                }
              }}
              name="Register"
            />
          </div>
        ) : (
            <div className="flex flex-col items-center gap-6">

          <div className="text-xl text-red-400">{status}</div>
          <Button name="Return to Sign Up" onClick={()=>router.push('/signup')} />
            </div>
        )}
      </div> 
    </div>
  );
}
