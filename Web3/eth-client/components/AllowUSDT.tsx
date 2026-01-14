import React from "react";
import { useWriteContract } from "wagmi";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const AllowUSDT = () => {
  const { data, mutate } = useWriteContract();
  async function submit() {
    mutate({
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: "_spender",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      functionName: "approve",
      args: ["0x2966473D85A76A190697B5b9b66b769436EFE8e5", BigInt(1)],
    });
  }
  return (
    <div className=" my-12 flex  justify-center items-center">
      <div className="flex gap-2 justify-center items-center">
        <Input placeholder="69450..." />
        <Button onClick={() => submit()}>Approve</Button>
      </div>
      {data && <Input disabled placeholder="Txn hash" value={data} />}
    </div>
  );
};

export default AllowUSDT;
