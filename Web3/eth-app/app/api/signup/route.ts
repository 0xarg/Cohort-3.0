import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { HDNodeWallet } from "ethers";
import { NextResponse } from "next/server";

export async function GET() {
  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(`m/44/60/1'/0`);
  return NextResponse.json({
    privatekey: child.privateKey,
    publicKey: child.publicKey,
  });
}
