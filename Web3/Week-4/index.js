const { createMint } = require("@solana/spl-token");
const { LAMPORTS_PER_SOL } = require("@solana/web3.js");
const { PublicKey } = require("@solana/web3.js");
const { clusterApiUrl } = require("@solana/web3.js");
const { Connection } = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl('devnet'));

async function airdrop(pubKey,amount){
    const publicKey = new PublicKey(pubKey)
    const signatureAirDrop = await connection.requestAirdrop(publicKey, amount);
    await connection.confirmTransaction(signatureAirDrop);
}


airdrop("7RXm8WfPH5U5GZkFsoXFAbUio9p4BdP4LSbr94e1ytpx", 100000).then(
  (signature) => {
    console.log("Airdrop Signature: ", signature);
  }
);

await createMint