"use client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleX, DollarSign, ArrowUpRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface AffiliatePromptModalProps {
    open: boolean;
    onClose: () => void;
    onProceed: () => void;
}

export function AffiliatePromptModal({
    open,
    onClose,
    onProceed,
}: AffiliatePromptModalProps) {
    const router = useRouter();

    const handleTGERedirect = () => {
        router.push("/dawgs-tge");
        onClose();
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(x) => {
                if (!x) onClose();
            }}
        >
            <DialogContent
                className="sm:max-w-[456px] bg-black text-white shadow-sm border border-white/20 rounded-2xl"
                showCloseButton={false}
            >
                <DialogHeader className="flex flex-row justify-between gap-4 items-center">
                    <DialogTitle className="font-fredoka text-2xl text-center">
                        Earn Your First $1000 USD! 💰
                    </DialogTitle>
                    <button className="cursor-pointer p-1" onClick={onClose}>
                        <CircleX size={18} />
                        <span className="sr-only">Close</span>
                    </button>
                </DialogHeader>

                <div className="grid gap-5 py-4">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="bg-[#FFBE00] rounded-full p-4">
                            <DollarSign size={32} className="text-black" />
                        </div>
                        <p className="text-white/90 text-base leading-relaxed">
                            Share your affiliate link or buy the presale to
                            start earning! Get rewarded for every successful
                            referral and unlock exclusive benefits.
                        </p>
                    </div>
                </div>

                <DialogFooter className="grid grid-cols-1 gap-3">
                    <Button
                        type="button"
                        className="w-full py-6 rounded-full cursor-pointer bg-[#FFBE00] text-black hover:bg-[#E6A800] transition-colors duration-200"
                        onClick={handleTGERedirect}
                    >
                        Go to TGE Page
                        <ArrowUpRightIcon size={16} className="ml-1" />
                    </Button>
                    <Button
                        type="button"
                        className="w-full py-6 rounded-full cursor-pointer bg-[#92A1C6] text-black hover:bg-[#7A8BB5] transition-colors duration-200"
                        onClick={onProceed}
                    >
                        Proceed to Upload Quest
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AffiliatePromptModal;
