"use client";
import { abi } from "@/lib/abi";
import { useWriteContract, useReadContract } from "wagmi";
function Dashboard() {
  const { data: hash, mutate } = useWriteContract();

  return (
    <div className="h-screen w-scren flex justify-center items-center">
      <div>
        <button
          className="mx-2 border rounded p-2 text-2xl"
          onClick={() => {
            mutate({
              address: "0x9Dfc8C3143E01cA01A90c3E313bA31bFfD9C1BA9",
              abi,
              functionName: "stake",
              args: [BigInt(1000000000000000000)],
              value: BigInt(1000000000000000000),
            });
          }}
        >
          Stake
        </button>
        <div>
          <ShowStake />
        </div>
      </div>
    </div>
  );
}

function ShowStake() {
  const { data: balance } = useReadContract({
    address: "0x9Dfc8C3143E01cA01A90c3E313bA31bFfD9C1BA9",
    abi,
    functionName: "stakedBalances",
    args: ["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"],
  });
  console.log(balance);
  return <div>You have staked {balance?.toString()} ETH</div>;
}

export default Dashboard;
