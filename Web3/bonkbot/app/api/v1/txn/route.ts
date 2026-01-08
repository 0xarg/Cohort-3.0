import { Connection, Keypair, Transaction } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";
import bs58 from "bs58";

export async function GET() {}

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (
    !data.message ||
    data.message.type !== "Buffer" ||
    !Array.isArray(data.message.data)
  ) {
    return NextResponse.json(
      { error: "Invalid transaction payload" },
      { status: 400 }
    );
  }

  const txBuffer = Buffer.from(data.message.data);
  const tx = Transaction.from(txBuffer);

  const connection = new Connection(
    "https://solana-devnet.g.alchemy.com/v2/nsie4CkPWDSvgFDKT6Yhg"
  );

  const keypair = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY!));

  tx.sign(keypair);

  const signature = await connection.sendRawTransaction(tx.serialize());
  console.log(signature);

  return NextResponse.json({ signature });
}
