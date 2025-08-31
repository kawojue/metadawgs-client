"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Copy, Smartphone, Monitor } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

interface MobileWalletModalProps {
    open: boolean;
    onClose: () => void;
}

export function MobileWalletModal({ open, onClose }: MobileWalletModalProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        // Immediate visual feedback
        setCopied(true);

        try {
            await navigator.clipboard.writeText(
                "https://metadawgs.com/dawgs-tge"
            );
            toast("Link copied to clipboard!");
        } catch {
            toast("Failed to copy link");
        }

        // Reset after shorter duration
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg mx-auto bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border-2 border-[#FFBE00]/30 rounded-3xl p-0 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="relative">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-all duration-200 hover:scale-110"
                    >
                        <X size={20} className="text-white" />
                    </button>

                    {/* Header with logo and paws */}
                    <div className="relative bg-gradient-to-r from-[#FFBE00] to-[#229EFF] p-6 text-center">
                        <div className="absolute top-2 left-4 opacity-30">
                            <Image
                                src="/images/paw.svg"
                                alt="paw"
                                width={24}
                                height={24}
                                className="rotate-12"
                                priority
                            />
                        </div>
                        <div className="absolute top-4 right-8 opacity-30">
                            <Image
                                src="/images/paw.svg"
                                alt="paw"
                                width={20}
                                height={20}
                                className="-rotate-12"
                                priority
                            />
                        </div>
                        <div className="flex justify-center mb-3">
                            <Image
                                src="/images/logo.svg"
                                alt="MetaDawgs Logo"
                                width={60}
                                height={60}
                                className="drop-shadow-lg"
                                priority
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-black font-fredoka">
                            Mobile Purchase Guide 📱
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6 animate-in slide-in-from-bottom-4 duration-300 delay-100">
                        <div className="text-center space-y-3">
                            <p className="text-white text-lg font-medium">
                                Having trouble with Phantom on mobile?
                            </p>
                            <p className="text-[#ACACAC] text-sm leading-relaxed">
                                We&apos;ve received reports about mobile
                                purchase issues with Phantom wallet. Here are
                                our recommended solutions for seamless
                                transactions:
                            </p>
                        </div>

                        {/* Option 1 - PC */}
                        <div className="bg-gradient-to-r from-[#FFBE00]/10 to-[#229EFF]/10 border border-[#FFBE00]/30 rounded-2xl p-4 transition-all duration-200 hover:border-[#FFBE00]/50 hover:shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <Monitor size={24} className="text-[#FFBE00]" />
                                <span className="text-[#FFBE00] font-bold text-lg">
                                    Option 1: Use PC/Desktop
                                </span>
                            </div>
                            <p className="text-white text-sm leading-relaxed">
                                Buy on PC using any Solana wallet extension like
                                Phantom, Solflare, or Coinbase Wallet for the
                                best experience.
                            </p>
                        </div>

                        {/* Option 2 - Mobile Solflare */}
                        <div className="bg-gradient-to-r from-[#229EFF]/10 to-[#FFBE00]/10 border border-[#229EFF]/30 rounded-2xl p-4 transition-all duration-200 hover:border-[#229EFF]/50 hover:shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <Smartphone
                                    size={24}
                                    className="text-[#229EFF]"
                                />
                                <span className="text-[#229EFF] font-bold text-lg">
                                    Option 2: Mobile with Solflare
                                </span>
                            </div>
                            <div className="space-y-2">
                                <p className="text-white text-sm leading-relaxed">
                                    For mobile users, we recommend using{" "}
                                    <span className="text-[#229EFF] font-semibold">
                                        Solflare wallet
                                    </span>
                                    :
                                </p>
                                <ol className="text-[#ACACAC] text-sm space-y-1 ml-4">
                                    <li>1. Download Solflare wallet app</li>
                                    <li>
                                        2. Copy the link below and paste it in
                                        Solflare&apos;s browser
                                    </li>
                                    <li>
                                        3. Connect your wallet and purchase
                                        seamlessly
                                    </li>
                                </ol>
                            </div>
                        </div>

                        {/* Copy link button */}
                        <Button
                            onClick={handleCopyLink}
                            className="w-full bg-gradient-to-r from-[#FFBE00] to-[#229EFF] hover:from-[#FFBE00]/90 hover:to-[#229EFF]/90 text-black font-semibold py-3 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95"
                        >
                            <Copy size={16} className="mr-2" />
                            <span>
                                {copied ? "Link Copied!" : "Copy TGE Link"}
                            </span>
                        </Button>

                        {/* Footer note */}
                        <div className="text-center">
                            <p className="text-[#ACACAC] text-xs">
                                Link: https://metadawgs.com/dawgs-tge
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
