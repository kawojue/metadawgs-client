"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ReferralCodeDisplayProps {
    referralCode: string;
}

function ReferralCodeDisplay({ referralCode }: ReferralCodeDisplayProps) {
    const [copied, setCopied] = useState(false);

    const referralLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dawgs-tge?ref=${referralCode}`;
    const shortenedLink =
        referralLink.length > 50
            ? `${referralLink.substring(0, 30)}...${referralLink.substring(
                  referralLink.length - 15
              )}`
            : referralLink;

    const handleCopy = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            toast("Referral link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
            toast("Failed to copy link");
        }
    };

    return (
        <div className="bg-gradient-to-r from-[#FFBE00]/20 to-[#F9C580]/20 border border-[#FFBE00]/30 rounded-2xl p-4 mb-6">
            <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-[#FFBE00] font-fredoka">
                    🎯 Your Affiliate Link
                </h3>
                <div className="flex items-center gap-2 bg-black/30 rounded-full p-2">
                    <div className="flex-1 px-3 py-2 text-sm font-mono text-white/80 truncate">
                        {shortenedLink}
                    </div>
                    <Button
                        type="button"
                        onClick={handleCopy}
                        size="sm"
                        className="bg-[#FFBE00] text-black hover:bg-[#FFBE00]/80 rounded-full px-3 py-2 min-w-[80px]"
                    >
                        {copied ? (
                            <>
                                <Check size={16} />
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={16} />
                                <span>Copy</span>
                            </>
                        )}
                    </Button>
                </div>
                <p className="text-xs text-white/60 text-center">
                    Share this link and earn up to 10%!
                </p>
            </div>
        </div>
    );
}

export default ReferralCodeDisplay;
