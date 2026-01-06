import { useConnect, useConnectors } from "wagmi";

export function WalletOptions({ children }: { children: React.ReactNode }) {
  const connect = useConnect();
  const connectors = useConnectors();

  return (
    <>
      {connectors.map((connector) => (
        <button
          className="py-1 px-2 cursor-pointer hover:border-red-600 hover:border bg-neutral-600 m-5 rounded-md"
          key={connector.uid}
          onClick={() => connect.mutate({ connector })}
        >
          {connector.name}
        </button>
      ))}

      {children}
    </>
  );
}
