"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, Gift, Clock } from "lucide-react";

interface ClaimAllocationModalProps {
    open: boolean;
    onClose?: () => void;
    canClaim: boolean;
}

export default function ClaimAllocationModal({
    open,
    onClose,
    canClaim,
}: ClaimAllocationModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <DialogHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[#FFBE00] to-[#FFD700] rounded-full flex items-center justify-center">
                        {canClaim ? (
                            <Gift className="w-8 h-8 text-black" />
                        ) : (
                            <Clock className="w-8 h-8 text-black" />
                        )}
                    </div>
                    <DialogTitle className="text-xl font-bold text-white">
                        {canClaim ? "Airdrop Ready!" : "Airdrop Coming Soon"}
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 text-base">
                        {canClaim
                            ? "Your airdrop allocation is ready to claim. Click the claim button to receive your tokens."
                            : "Your allocation will be live at TGE (Token Generation Event). Stay tuned for updates!"}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {!canClaim && (
                        <div className="bg-[#FFBE00]/10 border border-[#FFBE00]/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-[#FFBE00] text-sm font-medium">
                                <Clock className="w-4 h-4" />
                                <span>
                                    Token Generation Event (TGE) Information
                                </span>
                            </div>
                            <p className="text-gray-300 text-xs mt-2">
                                The airdrop will be available for claiming on
                                the 10th of September, 2025. Make sure to keep
                                your wallet connected and check back regularly
                                for updates.
                            </p>
                        </div>
                    )}

                    <Button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-[#FFBE00] to-[#FFD700] hover:from-[#FFD700] hover:to-[#FFBE00] text-black font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                        <span>{canClaim ? "Close" : "Got it!"}</span>
                        <ArrowUpRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
