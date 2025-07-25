"use client";

import { ArrowUpRightIcon, Gift, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import ClaimAllocationModal from "./modals/ClaimAllocationModal";
import { useState } from "react";
import Image from "next/image";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { VersionedTransaction } from "@solana/web3.js";
import { Buffer } from "buffer";
import { useMetrics } from "@/context/MetricsProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function Claim() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [error, setError] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

    const { publicKey, signTransaction } = useWallet();
    const { connection } = useConnection();
    const { metrics } = useMetrics();

    async function handleClaim() {
        if (!metrics?.status?.airdrop) {
            setOpen(true);
            return;
        }

        if (!publicKey || !signTransaction) {
            setError("Please connect your wallet first");
            setShowErrorModal(true);
            return;
        }

        setIsLoading(true);
        setStatusMessage("🎁 Preparing your airdrop claim...");
        setError("");

        try {
            setStatusMessage("✨ Checking eligibility...");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_PRESALE_API_ENDPOINT}/presale/claim-airdrop`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        walletAddress: publicKey.toBase58(),
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Airdrop claim failed");
            }

            const data = await response.json();

            if (!data?.partiallySignedTokenTx) {
                throw new Error("Invalid response: Missing transaction data");
            }

            setStatusMessage(
                "🔐 Please approve the transaction in your wallet..."
            );

            const txBuffer = Buffer.from(data.partiallySignedTokenTx, "base64");
            const partiallySignedTx =
                VersionedTransaction.deserialize(txBuffer);
            const fullySignedTx = await signTransaction(partiallySignedTx);

            setStatusMessage("📡 Broadcasting transaction...");

            const finalTxSig = await connection.sendTransaction(fullySignedTx, {
                preflightCommitment: "confirmed",
                skipPreflight: false,
            });

            setStatusMessage("⏳ Confirming transaction...");

            await new Promise((resolve) => setTimeout(resolve, 5000));

            const confirmation = await connection.confirmTransaction(
                {
                    signature: finalTxSig,
                    blockhash: fullySignedTx.message.recentBlockhash,
                    lastValidBlockHeight: (
                        await connection.getLatestBlockhash()
                    ).lastValidBlockHeight,
                },
                "confirmed"
            );

            if (confirmation.value.err) {
                throw new Error("Transaction confirmation failed");
            }

            setStatusMessage("🎉 Airdrop claimed successfully!");
            setShowSuccessAnimation(true);

            setTimeout(() => {
                setStatusMessage("");
                setShowSuccessAnimation(false);
            }, 4000);
        } catch (err: unknown) {
            console.error("Airdrop claim error:", err);
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred";
            setError(errorMessage);
            setShowErrorModal(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="max-w-lg w-full mx-auto space-y-3 px-6 pt-4 md:pt-0">
                <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-[#FFBE00]" />
                    <h3 className="text-lg font-bold bg-gradient-to-r from-[#FFBE00] to-[#FFD700] bg-clip-text text-transparent">
                        Your Allocated Airdrop
                    </h3>
                    <Sparkles className="w-4 h-4 text-[#FFBE00] animate-pulse" />
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFBE00]/20 via-transparent to-[#FFBE00]/20 animate-pulse" />

                    <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex gap-3 items-center flex-1">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFBE00] to-[#FFD700] p-0.5">
                                        <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center">
                                            <Image
                                                width={24}
                                                height={24}
                                                alt="Airdrop"
                                                className="object-cover rounded-full"
                                                src={"/images/man-icon.png"}
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFBE00] rounded-full flex items-center justify-center">
                                        <Gift className="w-2.5 h-2.5 text-black" />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <p className="text-white font-semibold text-sm">
                                        {metrics?.status?.airdrop
                                            ? "Ready to Claim"
                                            : "Coming Soon"}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        {metrics?.status?.airdrop
                                            ? "Your tokens are ready!"
                                            : "Available at TGE"}
                                    </p>
                                </div>
                            </div>

                            <Button
                                className={`${
                                    metrics?.status?.airdrop && publicKey
                                        ? "bg-gradient-to-r from-[#FFBE00] to-[#FFD700] hover:from-[#FFD700] hover:to-[#FFBE00]"
                                        : "bg-gray-600 hover:bg-gray-500"
                                } text-black font-semibold text-sm rounded-full px-6 py-2.5 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 shadow-lg`}
                                onClick={handleClaim}
                                disabled={
                                    isLoading ||
                                    (!publicKey && metrics?.status?.airdrop)
                                }
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>
                                            {metrics?.status?.airdrop
                                                ? "Claim Now"
                                                : "View Details"}
                                        </span>
                                        <ArrowUpRightIcon size={14} />
                                    </>
                                )}
                            </Button>
                        </div>

                        {statusMessage && (
                            <div className="mt-3 p-2 bg-[#FFBE00]/10 border border-[#FFBE00]/20 rounded-lg">
                                <p className="text-[#FFBE00] text-xs font-medium">
                                    {statusMessage}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ClaimAllocationModal
                open={open}
                onClose={() => setOpen(false)}
                canClaim={metrics?.status?.airdrop || false}
            />

            {showErrorModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Claim Failed
                            </h3>
                            <p className="text-gray-600 mb-6">{error}</p>
                            <Button
                                onClick={() => {
                                    setShowErrorModal(false);
                                    setError("");
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {showSuccessAnimation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] rounded-2xl p-8 max-w-md w-full mx-4 text-center border border-[#FFBE00]/20"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: 0.2,
                                    type: "spring",
                                    duration: 0.6,
                                }}
                                className="w-20 h-20 bg-gradient-to-br from-[#FFBE00] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <Gift className="w-10 h-10 text-black" />
                            </motion.div>

                            <motion.h3
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-2xl font-bold text-white mb-2"
                            >
                                Airdrop Claimed!
                            </motion.h3>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-gray-300 mb-6"
                            >
                                Your tokens have been successfully claimed and
                                added to your wallet.
                            </motion.p>

                            {/* Confetti Effect */}
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
                                        x: Math.random() * 400 - 200,
                                        y: Math.random() * 400 - 200,
                                        rotate: Math.random() * 360,
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: 0.6 + i * 0.1,
                                        ease: "easeOut",
                                    }}
                                    className="absolute w-3 h-3 bg-gradient-to-br from-[#FFBE00] to-[#FFD700] rounded-full"
                                    style={{
                                        left: "50%",
                                        top: "50%",
                                    }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
