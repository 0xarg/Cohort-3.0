"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./Button";

export function NavBar() {
  const session = useSession();


  return (
    <div className="outline-1 outline-neutral-500 shadow-lg p-5 items-center  rounded-3xl  hover:bg-neutral-950 flex justify-around text-white ">
      <span className="font-bold text-xl shadow-lg text-neutral-200">
        {session.status !== "authenticated" ? (
          <div>
            {/* {JSON.stringify(session)} */}
            BookMyTime

          </div>
        ) : (
          <>
          <img src={session.data?.user?.image ?? undefined} alt="ok" />
          {session.data?.user?.name}
          </>
        )}
      </span>
      <div className="flex gap-6">
        <div>
          {session.status === "authenticated" ? (
            <button
              className="border-1 py-2 px-3 rounded-lg hover:bg-white hover:text-black font-[550] hover:shadow-lg duration-300 cursor-pointer"
              onClick={() => {
                signOut();
              }}
            >
              Log Out
            </button>
          ) : (
            <Button
              name="Log In"
              onClick={() => {
                signIn();
              }}
            />
            // <button
            //   className="border-1 py-2 px-3 rounded-lg hover:bg-white hover:text-black font-[550] hover:shadow-lg duration-300 cursor-pointer"
            //   onClick={() => {
            //     signIn();
            //   }}
            // >
            //   Log In
            // </button>
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
    </div>
  );
}
