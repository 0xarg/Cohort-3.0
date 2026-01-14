"use client";
import { config } from "@/lib/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { WalletOptions } from "./WalletOptions";
import TotalSupply from "@/components/TotalSupply";

function page() {
  const client = new QueryClient();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <div className="flex justify-center flex-col  h-screen w-full">
          <WalletOptions>
            <></>
          </WalletOptions>
          <div>
            <TotalSupply />
          </div>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default page;
