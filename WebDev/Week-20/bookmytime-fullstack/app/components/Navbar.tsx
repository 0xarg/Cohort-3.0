"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./Button";
import { useRef, useState } from "react";

import { IoClose } from "react-icons/io5";
import { Input } from "./Input";
import axios from "axios";
import { useRouter } from "next/navigation";



export function NavBar({ onEventAdded }: { onEventAdded?: (event: any) => void }) {
  const session = useSession();
  const [addEventDialog, setDialog] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  return (
    <div className="outline-[1px] outline-neutral-900 shadow-lg p-5 items-center  rounded-3xl sticky top-2 bg-black hover:bg-neutral-950 flex justify-around text-white ">
      {addEventDialog ? (
        <div className=" absolute inset-0 max-w-95  max-h-150 min-h-130 m-auto translate-y-120 bg-neutral-950 rounded-2xl outline-neutral-300 p-4 outline-1 ">
          <div>
            <div className="flex justify-end ">
              <IoClose
                onClick={() => {
                  setDialog(false);
                }}
                className="hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div className="flex justify-center text-lg">Add Event</div>
            <div className=" space-y-4 my-8">
              <Input
                label="Title"
                placeholder={"Name of the event"}
                type={"text"}
                ref={titleRef}
              />
              <Input
                label="Description"
                placeholder={"About the event"}
                type={"text"}
                ref={descriptionRef}
              />
              <Input
                label="Location"
                placeholder={"Place of the event"}
                type={"text"}
                ref={locationRef}
              />
              <Input
                label="Date"
                placeholder={"Date of the event"}
                type={"Date"}
                ref={dateRef}
              />
            </div>
          </div>
          <div className="flex justify-center my-5">
            <Button
              name="Add Event"
              onClick={async () => {
                try {
                  await axios
                    .post("http://localhost:3000/api/events", {
                      title: titleRef.current?.value,
                      description: descriptionRef.current?.value,
                      location: locationRef.current?.value,
                      date: dateRef.current?.value,
                    })
                    .then((res) => {
                      if (res.status === 201) {
                        alert("Event Created");
                        setDialog(false);
                        onEventAdded?.(res.data.event)
                      }
                    });
                } catch (error: any) {
                  alert("Error: " + error);
                  return;
                }
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      {session.status !== "loading" ? (
        <>
          <span className="font-bold text-xl shadow-lg text-neutral-200">
            {session.status !== "authenticated" ? (
              <div>
                {/* {JSON.stringify(session)} */}
                BookMyTime
              </div>
            ) : (
              <>
                {session.data?.user?.image ? (
                  <img src={session.data.user.image} alt="" />
                ) : (
                  session.data.user?.name
                )}
              </>
            )}
          </span>
          <div className="flex gap-6">
            <div>
              {session.status === "authenticated" ? (
                <div className="flex gap-6">
                  <Button name="Add event" onClick={() => setDialog(true)} />
                  <button
                    className="border-1 py-2 px-3 rounded-lg hover:bg-white hover:text-black font-[550] hover:shadow-lg duration-300 cursor-pointer"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <Button
                  name="Log In"
                  onClick={() => {
                    signIn();
                  }}
                />
              )}
            </div>

            {session.status !== "authenticated" && (
              <Link
                className="border-1 py-2 px-3 rounded-lg hover:bg-white hover:text-black font-[550] hover:shadow-lg duration-300 cursor-pointer"
                href={"/signup"}
              >
                Sign Up
              </Link>
            )}
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
