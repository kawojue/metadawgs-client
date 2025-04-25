"use client";

import CountdownTimer from "@/components/custom/Countdown";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
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
import { debounce, formatNumberWithCommas } from "@/lib/common";
import NumberInput from "@/components/custom/NumberInput";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
// import { SignupAlert } from "@/components/custom/modals/SignupAlert";

type Metrics = {
  totalSoldSol: number;
  endTime: string;
  startTime: string;
  targetSol: number;
  minPerWallet: number | null;
  maxPerWallet: number;
  tokenMint: string;
};

const TREASURY_ADDRESS = process.env.NEXT_PUBLIC_TREASURY_ADDRESS as string;

function PresaleForm() {
  const { connection } = useConnection();
  const { setVisible } = useWalletModal();
  const { publicKey, sendTransaction, signTransaction } = useWallet();

  const [amount, setAmount] = useState<string>("");
  const [exchangedToken, setExchangedToken] = useState<number>(0);
  const [exchanging, setExchanging] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  // const [openSignUpAlert, setOpenSignUpAlert] = useState<boolean>(false);

  const handlePurchase = useCallback(async () => {
    if (!publicKey || !sendTransaction || !signTransaction) {
      setError("Wallet not connected or sign/send functions unavailable.");
      return;
    }

    if (isNaN(Number(amount)) || parseFloat(amount) <= 0) {
      setError("Please enter a valid SOL amount.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("Processing purchase...");
    setError("");

    let solTxSig = null;
    let partiallySignedTokenTxBase64 = null;
    let finalTokenTxSig = null;

    try {
      setStatusMessage("Step 1/4: Preparing SOL payment...");
      const lamportsToSend = Math.round(parseFloat(amount) * LAMPORTS_PER_SOL);
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

      setStatusMessage("Step 2/4: Confirming payment with server...");
      const payload = {
        buyerPublicKeyStr: publicKey.toBase58(),
        solTxSig,
        amountSol: parseFloat(amount),
      };

      const response = await postWithAuth<
        { partiallySignedTokenTx: string },
        { buyerPublicKeyStr: string; solTxSig: string; amountSol: number }
      >("/confirm-purchase-and-prepare-claim", payload, {
        baseUrl: process.env.NEXT_PUBLIC_PRESALE_API_ENDPOINT,
      });

      if (!response.success || !response.data?.partiallySignedTokenTx) {
        console.log("response");
        throw new Error(`Server confirmation failed`);
      }

      partiallySignedTokenTxBase64 = response.data.partiallySignedTokenTx;
      setStatusMessage(
        "Step 2/4: Server confirmed. Preparing token transaction..."
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

      await new Promise((resolve) => setTimeout(resolve, 5000));

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
      const displayError =
        err instanceof Error && err.message
          ? err.message
          : "An unknown error occurred.";
      setError(`Purchase failed: ${displayError}`);
      if (solTxSig) console.error("SOL Tx Sig:", solTxSig);
      if (finalTokenTxSig) console.error("Token Tx Sig:", finalTokenTxSig);
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, sendTransaction, signTransaction, connection, amount]);

  useEffect(() => {
    const fetchExchangeRate = debounce(async () => {
      setExchanging(true);
      try {
        const parsedAmount = Number(amount);

        if (isNaN(parsedAmount) || parsedAmount <= 0) return null;

        const body = { amountSol: parsedAmount };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PRESALE_API_ENDPOINT}/calculate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        if (!res.ok) {
          throw new Error("Error during exchange occurred.");
        }

        const data = (await res.json()) as { tokens: number };
        setExchangedToken(data.tokens);
      } catch (err) {
        console.error("Error fetching exchange rate:", err);
      } finally {
        setExchanging(false);
      }
    }, 500);

    fetchExchangeRate();
    return () => fetchExchangeRate.cancel?.();
  }, [amount]);

  useEffect(() => {
    const getWalletBalance = async () => {
      if (!publicKey || !connection) return;

      try {
        const balance = await connection.getBalance(publicKey);
        setWalletBalance(balance / LAMPORTS_PER_SOL); // Convert lamports to SOL
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    };

    getWalletBalance();

    // Set up an interval to refresh the balance periodically
    const intervalId = setInterval(getWalletBalance, 30000); // Every 30 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [publicKey]);

  useEffect(() => {
    async function getMetrics() {
      try {
        setIsInitializing(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PRESALE_API_ENDPOINT}/metrics`
        );

        if (!res.ok) {
          throw new Error("Couldn't get metrics.");
        }

        const result = (await res.json()) as {
          data: Metrics;
        };

        setMetrics(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsInitializing(false);
      }
    }

    getMetrics();
  }, []);

  function connectWallet() {
    setVisible(true);
  }

  // Return point

  if (isInitializing) {
    return <div className="p-4 text-center">Initializing Presale Form.</div>;
  }

  if (!isInitializing && !metrics) {
    return (
      <div className="p-4 text-center">
        {"Couldn't"} get presale form metrics.
      </div>
    );
  }

  if (metrics)
    return (
      <>
        <form
          className="wait rounded-2xl bg-[#F5F5F5] flex flex-col gap-5 max-w-lg mx-auto p-6 sm:p-8"
          onInput={() => {
            setExchangedToken(0);
          }}
        >
          <CountdownTimer targetDate={metrics?.endTime} />
          <div className="progress w-full bg-gray-300 rounded-full h-4 overflow-hidden">
            <div
              className="bg-green-500 h-full"
              style={{
                width: `${(metrics.totalSoldSol * 100) / metrics.targetSol}%`,
              }}
            ></div>
          </div>
          <div className="progress-value">
            <p className="text-lg">
              Raised:{" "}
              <strong>
                {formatNumberWithCommas(metrics?.totalSoldSol)} SOL /{" "}
                {metrics?.targetSol} SOL
              </strong>
            </p>
          </div>
          <div className="balance shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)] z-1 rounded-2xl p-3 text-white text-center overflow-hidden relative">
            <h4 className="font-medium text-3xl">
              {publicKey
                ? `${walletBalance.toFixed(4)} SOL`
                : "Wallet not connected"}
            </h4>
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
            <div className="flex justify-between items-center gap-4">
              <label htmlFor="amount">Amount</label>
              <p className="text-sm font-semibold">
                Max: {metrics.maxPerWallet}
              </p>
            </div>
            <NumberInput
              value={amount}
              onChange={setAmount}
              minValue={metrics.minPerWallet || 0}
              maxValue={metrics.maxPerWallet}
              disabled={isLoading || !publicKey}
              id="amount"
            />

            {!exchanging && !!exchangedToken && (
              <p className="flex">Exchange: {exchangedToken} Token(s)</p>
            )}

            {exchanging && <p className="flex">Converting amount....</p>}
          </div>
          {!!publicKey && (
            <Button
              className="bg-[#FFBE00] text-black !py-6 rounded-full cursor-pointer disabled:cursor-not-allowed!"
              onClick={handlePurchase}
              disabled={isLoading || exchanging}
            >
              {isLoading ? "Processing..." : "Buy Tokens"}
              <ArrowUpRightIcon />
            </Button>
          )}
          {!publicKey && (
            <Button
              className="bg-[#FFBE00] text-black !py-6 rounded-full cursor-pointer disabled:cursor-not-allowed!"
              onClick={connectWallet}
            >
              Connect Wallet
              <ArrowUpRightIcon />
            </Button>
          )}
          {statusMessage && !error && <p>Status: {statusMessage}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!publicKey && <p>Please connect your wallet.</p>}
        </form>

        {/* {openSignUpAlert && (
          <SignupAlert
            open={openSignUpAlert}
            onClose={() => setOpenSignUpAlert(false)}
          />
        )} */}
      </>
    );
}

export default PresaleForm;
