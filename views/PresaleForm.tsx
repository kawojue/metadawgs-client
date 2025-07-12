"use client";

import CountdownTimer from "@/components/custom/Countdown";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
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
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { debounce, formatNumberWithCommas } from "@/lib/common";
import NumberInput from "@/components/custom/NumberInput";
import useLocalStorage from "use-local-storage";
import { XComingSoonModal } from "@/lib/values";
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

function PresaleForm({ isComing }: { isComing: boolean }) {
    const { connection } = useConnection();
    const { setVisible } = useWalletModal();
    const { publicKey, sendTransaction, signTransaction } = useWallet();

    const [amount, setAmount] = useState<string>("");
    const [exchangedToken, setExchangedToken] = useState<number>(0);
    const [exchanging, setExchanging] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPresaleClosed, setIsPresaleClosed] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [isInitializing, setIsInitializing] = useState<boolean>(true);
    const [walletBalance, setWalletBalance] = useState<number>(0);
    // const [openSignUpAlert, setOpenSignUpAlert] = useState<boolean>(false);
    const [, setComingSoon] = useLocalStorage(XComingSoonModal, false);

    const handlePurchase = useCallback(async () => {
        if (isComing) {
            setComingSoon(true);
            return;
        }

        if (!publicKey || !sendTransaction || !signTransaction) {
            setError(
                "Wallet not connected or sign/send functions unavailable."
            );
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
            setStatusMessage("Preparing SOL payment...");
            const lamportsToSend = BigInt(
                Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL)
            );
            const treasuryPublicKey = new PublicKey(TREASURY_ADDRESS);

            const solTransferTransaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: treasuryPublicKey,
                    lamports: lamportsToSend,
                })
            );

            setStatusMessage("Please approve SOL payment in your wallet...");
            solTxSig = await sendTransaction(
                solTransferTransaction,
                connection
            );
            setStatusMessage(
                `SOL payment sent. Waiting for confirmation (Don't Quit!)...`
            );

            setStatusMessage("Confirming payment...");
            const payload = {
                buyerPublicKeyStr: publicKey.toBase58(),
                solTxSig,
                amountSol: parseFloat(amount),
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_PRESALE_API_ENDPOINT}/confirm-purchase-and-prepare-claim`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                throw new Error("Confirmation failed");
            }

            const data = (await response.json()) as {
                partiallySignedTokenTx: string;
            };

            if (!data?.partiallySignedTokenTx) {
                throw new Error(
                    "Confirmation failed: Missing token transaction"
                );
            }

            setStatusMessage("Confirmed. Preparing token transaction...");

            partiallySignedTokenTxBase64 = data.partiallySignedTokenTx;

            setStatusMessage(
                "Please approve token claim transaction in your wallet..."
            );

            const txBuffer = Buffer.from(
                partiallySignedTokenTxBase64,
                "base64"
            );
            const partiallySignedTx =
                VersionedTransaction.deserialize(txBuffer);

            const fullySignedTx = await signTransaction(partiallySignedTx);
            setStatusMessage("Sending token claim transaction...");
            finalTokenTxSig = await connection.sendTransaction(fullySignedTx, {
                preflightCommitment: "confirmed",
                skipPreflight: false,
            });
            setStatusMessage(
                `Token claim transaction sent. Waiting for confirmation...`
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
                throw new Error(`Token claim transaction confirmation failed`);
            }

            setStatusMessage(`Purchase complete! Token transaction confirmed`);

            setAmount("");
        } catch (err: unknown) {
            console.error("Presale Purchase Error:", err);
            const displayError =
                err instanceof Error && err.message
                    ? err.message
                    : "An unknown error occurred.";
            setError(`Purchase failed: ${displayError}`);
            if (solTxSig) console.error("SOL Tx Sig:", solTxSig);
            if (finalTokenTxSig)
                console.error("Token Tx Sig:", finalTokenTxSig);
        } finally {
            setIsLoading(false);
        }
    }, [publicKey, sendTransaction, signTransaction, connection, amount]);

    useEffect(() => {
        setError("");
        setStatusMessage("");
        setIsLoading(false);
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
    }, [connection, publicKey]);

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

                const isPresaleClosed =
                    new Date(result.data.endTime).getTime() < Date.now() ||
                    result.data.totalSoldSol >= result.data.targetSol;
                setIsPresaleClosed(isPresaleClosed);

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

    if (isInitializing) {
        return <div className="p-4 text-center">Initializing TGE.</div>;
    }

    if (!isInitializing && !metrics) {
        return (
            <div className="p-4 text-center">
                {"Couldn't"} get TGE form metrics.
            </div>
        );
    }

    if (metrics)
        return (
            <>
                <form
                    className="wait rounded-2xl pool after:rounded-2xl flex flex-col gap-5 max-w-lg mx-auto p-6 sm:p-8 after:bg-[#101928]!"
                    onInput={() => {
                        setExchangedToken(0);
                    }}
                >
                    <CountdownTimer
                        targetDate={metrics?.endTime}
                        isComing={isComing}
                    />
                    <div className="progress w-full bg-white rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-[#F9C580] h-full"
                            style={{
                                width: `${
                                    (metrics.totalSoldSol * 100) /
                                    metrics.targetSol
                                }%`,
                            }}
                        ></div>
                    </div>
                    <div className="progress-value">
                        <p className="text-lg">
                            MetaDawgs:{" "}
                            <strong>
                                {isComing
                                    ? "TBA"
                                    : formatNumberWithCommas(
                                          metrics?.totalSoldSol
                                      )}{" "}
                                SOL
                            </strong>
                        </p>
                    </div>
                    <div className="pool balance shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)] z-1 rounded-2xl after:rounded-2xl p-3 py-4 text-white text-center overflow-hidden relative">
                        <h4 className="font-medium text-3xl font-fredoka">
                            {publicKey
                                ? `${walletBalance.toFixed(4)} SOL`
                                : "Wallet not connected"}
                        </h4>
                        <p className="text-sm">Solana Balance</p>
                    </div>
                    <div className="amount-input flex flex-col gap-2">
                        <div className="flex flex-col items-start gap-0 mb-2">
                            <span className="text-lg font-semibold">
                                Verified Entry:{" "}
                                <span className="font-fredoka font-semibold">
                                    {isComing
                                        ? "TBA"
                                        : formatNumberWithCommas(
                                              metrics.targetSol || 0
                                          )}
                                </span>
                            </span>
                            <span className="text-lg font-semibold">
                                Listing Time:{" "}
                                <span className="font-fredoka font-semibold">
                                    {isComing
                                        ? "TBA"
                                        : formatNumberWithCommas(
                                              metrics.minPerWallet || 0
                                          )}
                                </span>
                            </span>
                            <span className="text-lg font-semibold">
                                Maximum Buy:{" "}
                                <span className="font-fredoka font-semibold">
                                    {isComing
                                        ? "TBA"
                                        : formatNumberWithCommas(
                                              metrics.maxPerWallet
                                          )}
                                </span>
                            </span>
                            <span className="text-lg font-semibold">
                                Allocated Token:{" "}
                                <span className="font-fredoka font-semibold">
                                    {isComing
                                        ? "TBA"
                                        : formatNumberWithCommas(0)}
                                </span>
                            </span>
                        </div>
                        <label htmlFor="amount">Amount</label>
                        <NumberInput
                            value={amount}
                            onChange={setAmount}
                            minValue={metrics.minPerWallet || 0}
                            maxValue={metrics.maxPerWallet}
                            disabled={
                                isLoading ||
                                !publicKey ||
                                isPresaleClosed ||
                                isComing
                            }
                            id="amount"
                            className="h-[52px] font-semibold text-lg border border-[#9C9C9C] rounded-full w-full p-4 bg-white text-black disabled:cursor-not-allowed disabled:opacity-50"
                        />

                        {!exchanging && !!exchangedToken && (
                            <div className="flex justify-between items-center gap-4">
                                <span className="block">Tokens</span>
                                <span className="block text-lg font-fredoka font-semibold">
                                    {formatNumberWithCommas(exchangedToken)}
                                </span>
                            </div>
                        )}

                        {exchanging && (
                            <p className="flex">Converting amount....</p>
                        )}
                    </div>
                    {!!publicKey && (
                        <Button
                            className="bg-[#FFBE00] text-black !py-6 rounded-full cursor-pointer disabled:cursor-not-allowed!"
                            onClick={handlePurchase}
                            disabled={isLoading || exchanging}
                        >
                            {isLoading ? "Processing..." : "Enter TGE"}
                            <ArrowUpRightIcon />
                        </Button>
                    )}
                    {!publicKey && (
                        <Button
                            type="button"
                            className="bg-[#FFBE00] text-black !py-6 rounded-full cursor-pointer disabled:cursor-not-allowed!"
                            onClick={connectWallet}
                        >
                            Connect Wallet
                            <ArrowUpRightIcon />
                        </Button>
                    )}
                    {statusMessage && !error && (
                        <p className="line-clamp-2">Status: {statusMessage}</p>
                    )}
                    {error && (
                        <p className="line-clamp-2" style={{ color: "red" }}>
                            {error}
                        </p>
                    )}
                    {!publicKey && <p>Please connect your wallet.</p>}
                    {isPresaleClosed && (
                        <p className="text-center text-lg uppercase text-[#FFBE00] font-fredoka font-semibold tracking-wide">
                            {isComing ? "COMING SOON" : "Presale is closed"}
                        </p>
                    )}
                </form>
            </>
        );
}

export default PresaleForm;
