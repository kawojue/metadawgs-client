"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";

interface TokenClaimWaitModalProps {
    isOpen: boolean;
    onContinue: () => void;
    solTxSig?: string;
}

export default function TokenClaimWaitModal({
    isOpen,
    onContinue,
    solTxSig,
}: TokenClaimWaitModalProps) {
    return (
        <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-md bg-[#101928] border border-[#FFBE00]/20 text-white">
                <div className="flex flex-col items-center text-center space-y-6 p-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="relative"
                    >
                        <div className="bg-green-500/20 rounded-full p-4">
                            <CheckCircle className="w-12 h-12 text-green-400" />
                        </div>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="absolute -top-2 -right-2 bg-[#FFBE00]/20 rounded-full p-2"
                        >
                            <Clock className="w-6 h-6 text-[#FFBE00]" />
                        </motion.div>
                    </motion.div>

                    <div className="space-y-3">
                        <h2 className="text-2xl font-bold font-fredoka text-[#FFBE00]">
                            SOL Payment Confirmed! 🎉
                        </h2>
                        <p className="text-gray-300 text-lg">
                            Your SOL payment has been successfully processed.
                        </p>
                        <div className="bg-[#FFBE00]/10 border border-[#FFBE00]/20 rounded-lg p-4">
                            <p className="text-[#FFBE00] font-medium">
                                ⚠️ Important: This is step 1 of 2
                            </p>
                            <p className="text-sm text-gray-300 mt-2">
                                You now need to claim your tokens in the next
                                step. Please don&apos;t close this window.
                            </p>
                        </div>
                    </div>

                    {solTxSig && (
                        <div className="w-full bg-gray-800/50 rounded-lg p-3">
                            <p className="text-xs text-gray-400 mb-1">
                                Transaction ID:
                            </p>
                            <p className="text-xs font-mono text-[#FFBE00] break-all">
                                {solTxSig}
                            </p>
                        </div>
                    )}

                    <Button
                        onClick={onContinue}
                        className="w-full bg-[#FFBE00] text-black font-semibold py-3 rounded-full hover:bg-[#FFBE00]/90 transition-colors"
                    >
                        Continue to Token Claim
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <p className="text-xs text-gray-400">
                        Next: You&apos;ll be asked to approve the token claim
                        transaction
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
