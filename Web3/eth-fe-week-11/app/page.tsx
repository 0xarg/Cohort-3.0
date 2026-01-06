"use client";

import { useRef } from "react";

const page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="m-8 ">
      <input
        placeholder="Address..."
        ref={inputRef}
        type="text"
        className="border border-white"
      />
      <br />
      <button className="py-1 px-2 cursor-pointer hover:border-red-600 hover:border bg-neutral-600 m-5 rounded-md">
        Send
      </button>
    </div>
  );
};

export default page;
