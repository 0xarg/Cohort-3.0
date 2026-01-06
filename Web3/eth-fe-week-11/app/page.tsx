"use client";

import { useCallback, useRef } from "react";
import { parseEther } from "viem";
import { useSendTransaction } from "wagmi";

const page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const sendTransaction = useSendTransaction();
  const sendEth = useCallback(async () => {}, []);
  return (
    <div className="m-8 ">
      <input
        placeholder="Address..."
        ref={inputRef}
        type="text"
        className="border border-white"
      />
      <br />
      <button
        onClick={() =>
          sendTransaction.mutate({
            to:
              (inputRef.current?.value as `0x${string}`) ??
              "0xd2135CfB216b74109775236E36d4b433F1DF507B",
            value: parseEther("0.01"),
          })
        }
        className="py-1 px-2 cursor-pointer hover:border-red-600 hover:border bg-neutral-600 m-5 rounded-md"
      >
        Send
      </button>
    </div>
  );
};

export default page;
