"use client";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { useState } from "react";
import {
  useBalance,
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
} from "wagmi";
import { disconnect, getConnection } from "wagmi/actions";

export function WalletOptions({ children }: { children: React.ReactNode }) {
  const connect = useConnect();
  const connection = useConnection();
  const connectors = useConnectors();
  const { connector } = getConnection(config);
  const disconnect = useDisconnect(); // Use the hook for disconnection

  const balance = useBalance({ address: connection.address });
  const [open, setOpen] = useState(false);
  return (
    <>
      {!open && !connection.address && (
        <Button onClick={() => setOpen(true)}>Connect to Wallet</Button>
      )}

      {!connection.address &&
        open &&
        connectors.map((connector) => (
          <button
            className="py-1 px-2 cursor-pointer hover:border-red-600 hover:border bg-neutral-600 m-5 rounded-md"
            key={connector.uid}
            onClick={() => {
              connect.mutate({ connector });
              setOpen(false);
            }}
          >
            {connector.name}
          </button>
        ))}
      {connection.address && (
        <div className="flex gap-3 justify-center items-center">
          <span>
            You are connected! <span> {connection.address}</span>
          </span>
          <button
            className="py-1 px-2 cursor-pointer hover:border-red-600 hover:border bg-neutral-600 m-5 rounded-md"
            onClick={() => disconnect.mutate({ connector })}
          >
            Disconnect
          </button>
        </div>
      )}

      <br />
      {children}
    </>
  );
}
