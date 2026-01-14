import React from "react";
import { useReadContract } from "wagmi";

const TotalSupply = () => {
  const { data, isLoading, error } = useReadContract({
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    abi: [
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "totalSupply",
  });
  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className=" flex justify-center">
      {isLoading && "Loading..."}
      {!isLoading && data?.toString().slice(0, 12)} USDT
    </div>
  );
};

export default TotalSupply;
