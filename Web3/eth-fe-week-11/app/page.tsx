"use client";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { createPublicClient, http } from "viem";
import { getBalance } from "viem/actions";
import { mainnet } from "viem/chains";

const page = () => {
  const [balance, setBalance] = useState<bigint>();
  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const fetchBalace = useCallback(async () => {
    const res = await getBalance(client, {
      address: "0x075c299cf3b9FCF7C9fD5272cd2ed21A4688bEeD",
    });
    setBalance(res);
    console.log(res);
  }, [client]);

  return (
    <div>
      <p>{balance}</p>
      <button onClick={() => fetchBalace()}>Get Balance</button>
    </div>
  );
};

export default page;
