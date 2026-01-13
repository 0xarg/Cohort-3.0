import { config } from "@/lib/config";
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
  const balance = useBalance({ address: connection.address });
  const handleDisconnect = async () => {
    const res = await disconnect(config, {
      connector,
    });
  };
  return (
    <>
      {connection.address ? (
        connectors.map((connector) => (
          <button
            className="py-1 px-2 cursor-pointer hover:border-red-600 hover:border bg-neutral-600 m-5 rounded-md"
            key={connector.uid}
            onClick={() => connect.mutate({ connector })}
          >
            {connector.name}
          </button>
        ))
      ) : (
        <div className="flex gap-3">
          <span>
            You are connected! <span> {connection.address}</span>
          </span>
          <button
            className="py-1 px-2 cursor-pointer hover:border-red-600 hover:border bg-neutral-600 m-5 rounded-md"
            onClick={() => handleDisconnect()}
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
