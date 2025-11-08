import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useRef } from "react";

export function Airdrop(){
    const wallet = useWallet();
    const { connection } = useConnection();
    const amountRef = useRef(null);

    async function sendAirDrop() {
      console.log("Iam here");
      let amount = amountRef.current.value;
      console.log(wallet);
      const res = await connection.requestAirdrop(
        wallet.publicKey,
        amount * LAMPORTS_PER_SOL
      );
    //   await connection.confirmTransaction(res, "confirmed");

      console.log(res)
      alert(`Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`);
    }
    return (
      <div>
        <br />
        <br />
        <input type="text" ref={amountRef} />
        <br />
        <br />
        <button
          onClick={() => {
            sendAirDrop();
          }}
        >
          Request Airdrop
        </button>
        <br />
        <br />
      </div>
    );
}