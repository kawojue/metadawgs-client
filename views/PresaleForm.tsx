"use client";

import CountdownTimer from "@/components/custom/Countdown";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    VersionedTransaction,
} from "@solana/web3.js";
import { Buffer } from "buffer";
import useLocalStorage from "use-local-storage";
import { XComingSoonModal } from "@/lib/values";
import { useMetrics } from "@/context/MetricsProvider";
import NumberInput from "@/components/custom/NumberInput";
import { debounce, formatNumberWithCommas } from "@/lib/common";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import ReferralCodeDisplay from "@/components/custom/ReferralCodeDisplay";
import TokenClaimWaitModal from "@/components/custom/modals/TokenClaimWaitModal";

const TREASURY_ADDRESS = process.env.NEXT_PUBLIC_TREASURY_ADDRESS as string;

function PresaleForm({
    isComing,
    referralCode,
}: {
    isComing: boolean;
    referralCode?: string;
}) {
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
    const [walletBalance, setWalletBalance] = useState<number>(0);
    const [canPurchase, setCanPurchase] = useState<boolean>(false);
    const [, setComingSoon] = useLocalStorage(XComingSoonModal, false);
    const [showSuccessAnimation, setShowSuccessAnimation] =
        useState<boolean>(false);
    const [showTokenClaimModal, setShowTokenClaimModal] =
        useState<boolean>(false);
    const [solTransactionSig, setSolTransactionSig] = useState<string>("");

    const { metrics, isLoading: isInitializing } = useMetrics();
    const searchParams = useSearchParams();

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
            setStatusMessage("💰 Preparing SOL payment...");
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

            setStatusMessage("🔐 Please approve SOL payment in your wallet...");
            solTxSig = await sendTransaction(
                solTransferTransaction,
                connection
            );
            setStatusMessage(
                `📡 SOL payment sent. Waiting for confirmation (Don't Quit!)...`
            );

            setStatusMessage("✅ Confirming payment...");
            setSolTransactionSig(solTxSig);
            setShowTokenClaimModal(true);

            await new Promise<void>((resolve) => {
                window.tokenClaimResolver = resolve;
            });

            const refCode = searchParams.get("ref");

            const payload = {
                buyerPublicKeyStr: publicKey.toBase58(),
                solTxSig,
                amountSol: parseFloat(amount),
                ...(refCode && { referralCode: refCode }),
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_PRESALE_API_ENDPOINT}/presale/confirm-purchase-and-prepare-claim`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const backendError =
                    errorData?.message ||
                    errorData?.error ||
                    `HTTP ${response.status}: ${response.statusText}`;
                throw new Error(backendError);
            }

            const data = (await response.json()) as {
                partiallySignedTokenTx: string;
            };

            if (!data?.partiallySignedTokenTx) {
                throw new Error(
                    "Confirmation failed: Missing token transaction"
                );
            }

            setStatusMessage("🎯 Confirmed. Preparing token transaction...");

            partiallySignedTokenTxBase64 = data.partiallySignedTokenTx;

            setStatusMessage(
                "🔐 Please approve token claim transaction in your wallet..."
            );

            const txBuffer = Buffer.from(
                partiallySignedTokenTxBase64,
                "base64"
            );
            const partiallySignedTx =
                VersionedTransaction.deserialize(txBuffer);

            const fullySignedTx = await signTransaction(partiallySignedTx);
            setStatusMessage("📡 Sending token claim transaction...");
            finalTokenTxSig = await connection.sendTransaction(fullySignedTx, {
                preflightCommitment: "confirmed",
                skipPreflight: false,
            });
            setStatusMessage(
                `⏳ Token claim transaction sent. Waiting for confirmation...`
            );

            await new Promise((resolve) => setTimeout(resolve, 5000));

            const latestBlockhash = await connection.getLatestBlockhash();
            const confirmation = await connection.confirmTransaction(
                {
                    signature: finalTokenTxSig,
                    blockhash: latestBlockhash.blockhash,
                    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                },
                "confirmed"
            );

            if (confirmation.value.err) {
                throw new Error(`Token claim transaction confirmation failed`);
            }

            setStatusMessage(
                `🎉 Purchase complete! Token transaction confirmed`
            );

            setShowSuccessAnimation(true);
            setTimeout(() => {
                setStatusMessage("");
                setShowSuccessAnimation(false);
            }, 4000);

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
    }, [
        publicKey,
        sendTransaction,
        signTransaction,
        connection,
        amount,
        searchParams,
    ]);

    const fetchExchangeRate = useCallback(
        debounce(async () => {
            setExchanging(true);
            setCanPurchase(false);
            try {
                const parsedAmount = Number(amount);

                if (isNaN(parsedAmount) || parsedAmount <= 0) return null;
                if (!publicKey) return null;

                const refCode = searchParams.get("ref");
                const body = {
                    buyerPublicKeyStr: publicKey.toBase58(),
                    amountSol: parseFloat(amount),
                    ...(refCode && { referralCode: refCode }),
                };

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_PRESALE_API_ENDPOINT}/presale/calculate`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body),
                    }
                );

                if (!res.ok) {
                    const errorData = await res.json().catch(() => null);
                    const backendError =
                        errorData?.message ||
                        errorData?.error ||
                        `HTTP ${res.status}: ${res.statusText}`;
                    throw new Error(backendError);
                }

                const data = (await res.json()) as { tokens: number };
                setExchangedToken(parseFloat(data.tokens.toFixed(2)));
                setCanPurchase(true);
                setError("");
            } catch (err) {
                console.error("Error fetching exchange rate:", err);
                const displayError =
                    err instanceof Error && err.message
                        ? err.message
                        : "Token calculation failed";
                setError(`${displayError}`);
                setCanPurchase(false);
            } finally {
                setExchanging(false);
            }
        }, 500),
        [amount, publicKey, searchParams]
    );

    useEffect(() => {
        setError("");
        setStatusMessage("");
        setIsLoading(false);
        fetchExchangeRate();
        return () => fetchExchangeRate.cancel?.();
    }, [fetchExchangeRate]);

    useEffect(() => {
        const getWalletBalance = async () => {
            if (!publicKey || !connection) return;

            try {
                const balance = await connection.getBalance(publicKey);
                setWalletBalance(balance / LAMPORTS_PER_SOL);
            } catch (error) {
                console.error("Error fetching wallet balance:", error);
            }
        };

        getWalletBalance();

        const intervalId = setInterval(getWalletBalance, 30000);

        return () => clearInterval(intervalId);
    }, [connection, publicKey]);

    useEffect(() => {
        if (metrics) {
            const isPresaleClosed =
                new Date(metrics.endTime).getTime() < Date.now() ||
                metrics.totalSoldSol >= metrics.hardCap;
            setIsPresaleClosed(isPresaleClosed);
        }
    }, [metrics]);

    function connectWallet() {
        setVisible(true);
    }

    const handleContinueToTokenClaim = () => {
        setShowTokenClaimModal(false);
        if (window.tokenClaimResolver) {
            window.tokenClaimResolver();
            window.tokenClaimResolver = undefined;
        }
    };

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
                        isComing={false}
                    />
                    <div className="progress w-full bg-white rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-[#F9C580] h-full"
                            style={{
                                width: `${
                                    (metrics.totalSoldSol * 100) /
                                    metrics.softCap
                                }%`,
                            }}
                        ></div>
                    </div>
                    <div className="progress-value">
                        <p className="text-lg">
                            Solana Target Raised:{" "}
                            <strong>
                                {isComing
                                    ? "TBA"
                                    : formatNumberWithCommas(
                                          Number(
                                              metrics?.totalSoldSol?.toFixed(4)
                                          )
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
                    {referralCode &&
                        publicKey &&
                        metrics?.status?.affiliate && (
                            <ReferralCodeDisplay referralCode={referralCode} />
                        )}
                    <div className="amount-input flex flex-col gap-2">
                        <div className="flex flex-col items-start gap-0 mb-2">
                            <span className="text-lg font-semibold">
                                Token Name:{" "}
                                <span className="font-fredoka font-semibold">
                                    METADAWGS
                                </span>
                            </span>
                            <span className="text-lg font-semibold">
                                Total Supply:{" "}
                                <span className="font-fredoka font-semibold">
                                    1BILLION
                                </span>
                            </span>
                            <span className="text-lg font-semibold">
                                TGE Allocation:{" "}
                                <span className="font-fredoka font-semibold">
                                    600 million
                                </span>
                            </span>
                            <span className="text-lg font-semibold">
                                Listing Allocation:{" "}
                                <span className="font-fredoka font-semibold">
                                    350 million
                                </span>
                            </span>
                            <span className="text-lg font-semibold">
                                Airdrop Allocation:{" "}
                                <span className="font-fredoka font-semibold">
                                    40 million
                                </span>
                            </span>
                            <span className="text-lg font-semibold">
                                Minimum Target:{" "}
                                <span className="font-fredoka font-semibold">
                                    {isComing
                                        ? "TBA"
                                        : formatNumberWithCommas(
                                              metrics.softCap || 0
                                          )}{" "}
                                    SOL
                                </span>
                            </span>
                            <span className="text-lg font-semibold">
                                Maximum Target:{" "}
                                <span className="font-fredoka font-semibold">
                                    {isComing
                                        ? "TBA"
                                        : formatNumberWithCommas(
                                              metrics.hardCap || 0
                                          )}{" "}
                                    SOL
                                </span>
                            </span>
                            <br />
                            <p className="text-xl font-semibold">
                                Whitelist Round
                            </p>
                            <span className="font-semibold">
                                Price:{" "}
                                <span className="font-fredoka font-semibold">
                                    {isComing ? "TBA" : 0.00385} SOL
                                </span>
                            </span>
                            <span className="font-semibold">
                                Minimum Buy:{" "}
                                <span className="font-fredoka font-semibold">
                                    {isComing ? "TBA" : 1} SOL
                                </span>
                            </span>
                            <span className="font-semibold">
                                Maximum Buy:{" "}
                                <span className="font-fredoka font-semibold">
                                    {isComing ? "TBA" : 5} SOL
                                </span>
                            </span>
                            <br />
                            <p className="text-xl font-semibold">
                                Public Round
                            </p>
                            <span className="font-semibold">
                                Price:{" "}
                                <span className="font-fredoka font-semibold">
                                    {isComing ? "TBA" : 0.005} SOL
                                </span>
                            </span>
                            <span className="font-semibold">
                                Minimum Buy:{" "}
                                <span className="font-fredoka font-semibold">
                                    {isComing ? "TBA" : 20} USD
                                </span>
                            </span>
                            <span className="font-semibold">
                                Maximum Buy:{" "}
                                <span className="font-fredoka font-semibold">
                                    {isComing ? "TBA" : "1,500"} USD
                                </span>
                            </span>
                        </div>
                        <label htmlFor="amount">Amount</label>
                        <NumberInput
                            value={amount}
                            onChange={setAmount}
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
                            type="button"
                            className="bg-[#FFBE00] text-black !py-6 rounded-full cursor-pointer disabled:cursor-not-allowed!"
                            onClick={handlePurchase}
                            disabled={isLoading || exchanging || !canPurchase}
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
                        <div className="bg-[#FFBE00]/10 border border-[#FFBE00]/20 rounded-lg p-3">
                            <p className="text-[#FFBE00] text-sm font-medium line-clamp-2">
                                {statusMessage}
                            </p>
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                            <p className="text-red-400 text-sm font-medium line-clamp-2">
                                {error}
                            </p>
                        </div>
                    )}
                    {!publicKey && <p>Please connect your wallet.</p>}
                    {isPresaleClosed && (
                        <p className="text-center text-lg uppercase text-[#FFBE00] font-fredoka font-semibold tracking-wide">
                            {isComing ? "COMING SOON" : "Presale is closed"}
                        </p>
                    )}
                </form>

                <TokenClaimWaitModal
                    isOpen={showTokenClaimModal}
                    onContinue={handleContinueToTokenClaim}
                    solTxSig={solTransactionSig}
                />

                <AnimatePresence>
                    {showSuccessAnimation && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ type: "spring", duration: 0.8 }}
                                className="bg-gradient-to-r from-[#FFBE00] to-[#F9C580] rounded-full p-8 shadow-2xl"
                            >
                                <div className="text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0, 1.2, 1] }}
                                        transition={{
                                            delay: 0.3,
                                            duration: 0.6,
                                        }}
                                        className="text-6xl mb-4"
                                    >
                                        🎉
                                    </motion.div>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-2xl font-bold text-black font-fredoka"
                                    >
                                        Purchase Complete!
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        className="text-black/80 mt-2"
                                    >
                                        Tokens successfully claimed
                                    </motion.p>
                                </div>
                            </motion.div>

                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{
                                        opacity: 0,
                                        scale: 0,
                                        x: 0,
                                        y: 0,
                                    }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0.5],
                                        x:
                                            Math.cos((i * 30 * Math.PI) / 180) *
                                            200,
                                        y:
                                            Math.sin((i * 30 * Math.PI) / 180) *
                                            200,
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: 0.5 + i * 0.1,
                                        ease: "easeOut",
                                    }}
                                    className="absolute w-4 h-4 bg-[#FFBE00] rounded-full"
                                    style={{
                                        left: "50%",
                                        top: "50%",
                                        transform: "translate(-50%, -50%)",
                                    }}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        );
}

export default PresaleForm;
