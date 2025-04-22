"use client";

import CountdownTimer from "@/components/custom/Countdown";
import { FadeIn } from "@/components/custom/ScrollAnimation";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import { useState, useCallback } from "react";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  VersionedTransaction,
} from "@solana/web3.js";
import { Buffer } from "buffer";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { postWithAuth } from "@/lib/api";

const TREASURY_ADDRESS = process.env.NEXT_PUBLIC_TREASURY_ADDRESS as string;

function Page() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, signTransaction } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handlePurchase = useCallback(async () => {
    if (!publicKey || !sendTransaction || !signTransaction) {
      setError("Wallet not connected or sign/send functions unavailable.");
      return;
    }

    if (isNaN(Number(amount))) {
      setError("Please enter a valid number for the amount.");
      return;
    }

    const solAmount = parseFloat(amount);
    if (solAmount <= 0) {
      setError("Please enter a valid SOL amount.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("Processing purchase...");
    setError("");

    let solTxSig: string | null = null;
    let partiallySignedTokenTxBase64: string | null = null;
    let finalTokenTxSig: string | null = null;

    try {
      setStatusMessage("Step 1/4: Preparing SOL payment...");
      const lamportsToSend = Math.round(solAmount * LAMPORTS_PER_SOL);
      const treasuryPublicKey = new PublicKey(TREASURY_ADDRESS);

      const solTransferTransaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: treasuryPublicKey,
          lamports: lamportsToSend,
        })
      );

      setStatusMessage(
        "Step 1/4: Please approve SOL payment in your wallet..."
      );
      solTxSig = await sendTransaction(solTransferTransaction, connection);
      setStatusMessage(
        `Step 1/4: SOL payment sent. Signature: ${solTxSig}. Waiting for confirmation...`
      );

      setStatusMessage("Step 2/4: Confirming payment with backend...");
      const payload = {
        buyerPublicKeyStr: publicKey.toBase58(),
        solTxSig: solTxSig,
        amountSol: solAmount,
      };

      const response = await postWithAuth<
        {
          partiallySignedTokenTx: string;
        },
        {
          buyerPublicKeyStr: string;
          solTxSig: string;
          amountSol: number;
        }
      >("/presale", payload);

      if (!response.success || !response.data?.partiallySignedTokenTx) {
        throw new Error(`Backend confirmation failed: ${response.message}`);
      }

      partiallySignedTokenTxBase64 = response.data.partiallySignedTokenTx;
      setStatusMessage(
        "Step 2/4: Backend confirmed. Preparing token transaction..."
      );

      setStatusMessage(
        "Step 3/4: Please approve token claim transaction in your wallet..."
      );

      const txBuffer = Buffer.from(partiallySignedTokenTxBase64, "base64");
      const partiallySignedTx = VersionedTransaction.deserialize(txBuffer);

      const fullySignedTx = await signTransaction(partiallySignedTx);
      setStatusMessage("Step 4/4: Sending token claim transaction...");
      finalTokenTxSig = await connection.sendTransaction(fullySignedTx, {
        preflightCommitment: "confirmed",
        skipPreflight: false,
      });
      setStatusMessage(
        `Step 4/4: Token claim transaction sent. Signature: ${finalTokenTxSig}. Waiting for confirmation...`
      );

      await new Promise((resolve) => setTimeout(resolve, 5_000));

      const confirmation = await connection.confirmTransaction(
        {
          signature: finalTokenTxSig,
          blockhash: fullySignedTx.message.recentBlockhash,
          lastValidBlockHeight: (
            await connection.getLatestBlockhash()
          ).lastValidBlockHeight,
        },
        "confirmed"
      );

      if (confirmation.value.err) {
        throw new Error(
          `Token claim transaction confirmation failed: ${JSON.stringify(
            confirmation.value.err
          )}`
        );
      }

      setStatusMessage(
        `Purchase complete! Token transaction confirmed: ${finalTokenTxSig}`
      );
    } catch (err: unknown) {
      console.error("Presale Purchase Error:", err);
      let displayError = "An unknown error occurred.";
      if (err instanceof Error && err.message) {
        displayError = err.message;
      }
      setError(`Purchase failed: ${displayError}`);
      if (solTxSig) console.error("SOL Tx Sig:", solTxSig);
      if (finalTokenTxSig) console.error("Token Tx Sig:", finalTokenTxSig);
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, sendTransaction, signTransaction, connection, amount]);

  return (
    <div>
      <div className="bg-black text-white p-4 sm:p-6 md:p-15 py-5 flex flex-col gap-5 justify-center items-center">
        <FadeIn>
          <h1 className="title md:text-[76px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka font-bold uppercase text-center">
            Buy $MetaDawgs
            <br />
            Token Now
          </h1>
        </FadeIn>
      </div>

      <div className="box md:p-[10%] p-6 md:pt-[5%] pt-10">
        <div className="wait rounded-2xl bg-[#F5F5F5] flex flex-col gap-5 max-w-lg mx-auto p-6 sm:p-8">
          <CountdownTimer targetDate="2025-12-31T00:00:00Z" />
          <div className="progress w-full bg-gray-300 rounded-full h-4 overflow-hidden">
            <div className="bg-green-500 h-full" style={{ width: "65%" }}></div>
          </div>
          <div className="progress-value">
            <p className="text-lg">
              Raised: <strong>89,353,663 SOL / 34,535,636 SOL</strong>
            </p>
          </div>
          <div className="balance shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)] z-1 rounded-2xl p-3 text-white text-center overflow-hidden relative">
            <h4 className="font-medium text-3xl">0.0003425</h4>
            <p className="text-sm">Solana balance</p>
            <Image
              src="/images/balance-bg.jpeg"
              alt="bg"
              width={400}
              height={100}
              className="image absolute top-0 left-0 size-full -z-1 text-transparent object-cover"
            />
          </div>
          <div className="amount-input flex flex-col gap-2">
            <label htmlFor="amount">Amount</label>
            <input
              className="h-[52px] font-semibold text-lg border border-[#9C9C9C] rounded-full w-full p-4 bg-white"
              type="number"
              value={amount}
              placeholder="0"
              onChange={(x) => {
                setAmount(x.target.value);
              }}
              disabled={isLoading || !publicKey}
            />
          </div>
          <Button
            className="bg-[#FFBE00] text-black !py-6 rounded-full cursor-pointer disabled:cursor-not-allowed!"
            onClick={handlePurchase}
            disabled={isLoading || !publicKey}
          >
            {isLoading ? "Processing..." : "Buy Tokens"}
            <ArrowUpRightIcon />
          </Button>
          {statusMessage && !error && <p>Status: {statusMessage}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!publicKey && <p>Please connect your wallet.</p>}
        </div>
      </div>
    </div>
  );
}

export default Page;
