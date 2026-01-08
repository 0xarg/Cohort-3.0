"use client";
import React, { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import axios from "axios";

const page = () => {
  const addressRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const sendSol = useCallback(async () => {
    const connection = new Connection(
      "https://solana-devnet.g.alchemy.com/v2/nsie4CkPWDSvgFDKT6Yhg"
    );
    const ix = SystemProgram.transfer({
      fromPubkey: new PublicKey("CdhbQ7NWuWDLtfRgNAQixNAFfkmWGJBMS9R5numMCqSC"),
      toPubkey: new PublicKey("7RXm8WfPH5U5GZkFsoXFAbUio9p4BdP4LSbr94e1ytpx"),
      lamports: 0.001 * LAMPORTS_PER_SOL,
    });

    const tx = new Transaction().add(ix);

    // convert tx into bunch of bytes

    const { blockhash }: any = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    console.log(blockhash);
    tx.feePayer = new PublicKey("CdhbQ7NWuWDLtfRgNAQixNAFfkmWGJBMS9R5numMCqSC");
    const serializeTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    try {
      const res = await axios.post("/api/v1/txn", {
        message: serializeTx,
        retry: false,
      });
      const data = res.data;
    } catch (error) {}
  }, []);
  return (
    <div className="flex h-screen w-full justify-center items-center ">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Send SOL</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Address</Label>
                <Input
                  id="email"
                  type="email"
                  ref={addressRef}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Amount</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="amount" type="text" ref={amountRef} required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" onClick={() => sendSol()} className="w-full">
            SendSol
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
