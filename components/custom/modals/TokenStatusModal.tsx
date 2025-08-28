"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface TokenStatusResponse {
    status: "pending" | "completed" | "failed" | "not_found";
    tokenTxSig?: string;
    error?: string;
    timestamp?: string;
}

interface TokenStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    solTxSig: string;
    onSuccess?: (tokenTxSig: string) => void;
}

const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
        case "completed":
            return <CheckCircle className="w-16 h-16 text-green-500" />;
        case "failed":
            return <XCircle className="w-16 h-16 text-red-500" />;
        case "pending":
            return (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <Clock className="w-16 h-16 text-yellow-500" />
                </motion.div>
            );
        default:
            return <XCircle className="w-16 h-16 text-gray-500" />;
    }
};

const StatusMessage = ({
    status,
    error,
}: {
    status: string;
    error?: string;
}) => {
    switch (status) {
        case "completed":
            return (
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-green-600 mb-2">
                        🎉 Tokens Delivered!
                    </h3>
                    <p className="text-gray-600">
                        Your METADAWGS tokens have been successfully transferred
                        to your wallet.
                    </p>
                </div>
            );
        case "failed":
            return (
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-red-600 mb-2">
                        ⚠️ Transfer Failed
                    </h3>
                    <p className="text-gray-600 mb-2">
                        Token transfer encountered an issue. Don&apos;t worry,
                        your SOL payment is safe.
                    </p>
                    {error && (
                        <p className="text-sm text-red-500 bg-red-50 p-2 rounded">
                            {error}
                        </p>
                    )}
                </div>
            );
        case "pending":
            return (
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-yellow-600 mb-2">
                        🔄 Processing Tokens...
                    </h3>
                    <p className="text-gray-600">
                        Your payment was successful! We&apos;re now transferring
                        your METADAWGS tokens. This usually takes 30-60 seconds.
                    </p>
                </div>
            );
        case "not_found":
            return (
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        🔍 Transaction Not Found
                    </h3>
                    <p className="text-gray-600">
                        We couldn&apos;t locate your transaction. Please try
                        again or contact support.
                    </p>
                </div>
            );
        default:
            return null;
    }
};

export default function TokenStatusModal({
    isOpen,
    onClose,
    solTxSig,
    onSuccess,
}: TokenStatusModalProps) {
    const [status, setStatus] = useState<TokenStatusResponse | null>(null);
    const [isRetrying, setIsRetrying] = useState(false);
    const maxPolls = 60;

    const fetchTokenStatus = useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_PRESALE_API_ENDPOINT}/presale/token-status/${solTxSig}`
            );

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data: TokenStatusResponse = await response.json();
            setStatus(data);

            if (data.status === "completed" && data.tokenTxSig && onSuccess) {
                onSuccess(data.tokenTxSig);
            }

            return data.status;
        } catch (e) {
            console.error("Error fetching token status:", e);
            setStatus({
                status: "failed",
                error: "Failed to check token status. Please try again.",
            });
            return "failed";
        }
    }, [solTxSig, onSuccess]);

    const handleRetry = async () => {
        setIsRetrying(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_PRESALE_API_ENDPOINT}/presale/retry-token-transfer/${solTxSig}`,
                { method: "POST" }
            );

            const data = await response.json();

            if (data.success) {
                setStatus({ status: "pending" });
            } else {
                setStatus({
                    status: "failed",
                    error:
                        data.message || "Retry failed. Please contact support.",
                });
            }
        } catch (e) {
            console.error("Error retrying token transfer:", e);
            setStatus({
                status: "failed",
                error: "Network error during retry. Please try again.",
            });
        } finally {
            setIsRetrying(false);
        }
    };

    useEffect(() => {
        if (!isOpen || !solTxSig) return;

        let localPollCount = 0;
        let pollInterval: NodeJS.Timeout;

        const initialTimeout = setTimeout(() => {
            fetchTokenStatus();

            pollInterval = setInterval(async () => {
                localPollCount += 1;

                if (localPollCount >= maxPolls) {
                    clearInterval(pollInterval);
                    setStatus({
                        status: "failed",
                        error: "Token transfer is taking longer than expected. Please try the retry button.",
                    });
                    return;
                }

                const currentStatus = await fetchTokenStatus();

                if (
                    currentStatus === "completed" ||
                    currentStatus === "failed"
                ) {
                    clearInterval(pollInterval);
                }
            }, 10_000);
        }, 2000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(pollInterval);
        };
    }, [isOpen, solTxSig, fetchTokenStatus]);

    const canRetry =
        status?.status === "failed" || status?.status === "not_found";
    const isCompleted = status?.status === "completed";

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200">
                <DialogHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <Image
                                src="/images/logo.svg"
                                alt="MetaDawgs Logo"
                                width={60}
                                height={60}
                                className="drop-shadow-lg"
                            />
                            <motion.div
                                className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </div>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        METADAWGS Token Status
                    </DialogTitle>
                    <DialogDescription className="text-slate-600 font-medium">
                        🚀 Tracking your exclusive METADAWGS token delivery
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center space-y-6 py-6 relative">
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="grid grid-cols-8 gap-2 h-full">
                            {Array.from({ length: 32 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-blue-500 rounded-full w-1 h-1"
                                />
                            ))}
                        </div>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={status?.status}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <StatusIcon status={status?.status || "pending"} />
                        </motion.div>
                    </AnimatePresence>

                    <div className="relative z-10">
                        <StatusMessage
                            status={status?.status || "pending"}
                            error={status?.error}
                        />
                    </div>

                    {status?.tokenTxSig && (
                        <div className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
                            <p className="text-sm text-blue-600 mb-2 font-semibold flex items-center justify-center gap-2">
                                <Image
                                    src="/images/check.svg"
                                    alt="Success"
                                    width={16}
                                    height={16}
                                />
                                Token Transaction Signature:
                            </p>
                            <code className="text-xs bg-blue-50 text-blue-800 p-3 rounded-lg break-all block border border-blue-200">
                                {status.tokenTxSig}
                            </code>
                        </div>
                    )}

                    <div className="flex gap-3 w-full relative z-10">
                        {canRetry && (
                            <Button
                                onClick={handleRetry}
                                disabled={isRetrying}
                                variant="outline"
                                className="flex-1 border-2 border-orange-300 text-orange-600 hover:bg-orange-50 font-semibold"
                            >
                                {isRetrying ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Retrying...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Retry Transfer
                                    </>
                                )}
                            </Button>
                        )}

                        <Button
                            onClick={onClose}
                            variant={isCompleted ? "default" : "secondary"}
                            className={`flex-1 font-semibold ${
                                isCompleted
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
                                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                            }`}
                        >
                            {isCompleted ? "🎉 Awesome!" : "Close"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
