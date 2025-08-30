"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

interface TGEModalProps {
    open: boolean;
    onClose: () => void;
}

export function TGEModal({ open, onClose }: TGEModalProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(
                window.location.origin + "/dawgs-tge"
            );
            setCopied(true);
            toast("Link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast("Failed to copy link");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border-2 border-[#FFBE00]/30 rounded-3xl p-0 overflow-hidden">
                <div className="relative">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
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
                            />
                        </div>
                        <div className="absolute top-4 right-8 opacity-30">
                            <Image
                                src="/images/paw.svg"
                                alt="paw"
                                width={20}
                                height={20}
                                className="-rotate-12"
                            />
                        </div>
                        <div className="flex justify-center mb-3">
                            <Image
                                src="/images/logo.svg"
                                alt="MetaDawgs Logo"
                                width={60}
                                height={60}
                                className="drop-shadow-lg"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-black font-fredoka">
                            TGE is Live! 🚀
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        <div className="text-center space-y-3">
                            <p className="text-white text-lg font-medium">
                                Claiming is temporarily disabled
                            </p>
                            <p className="text-[#ACACAC] text-sm leading-relaxed">
                                Our Token Generation Event is now live! Share
                                your affiliate link and earn{" "}
                                <span className="text-[#FFBE00] font-semibold">
                                    5-10%
                                </span>{" "}
                                of every SOL purchase made through your link.
                            </p>
                        </div>

                        {/* Earnings highlight */}
                        <div className="bg-gradient-to-r from-[#FFBE00]/10 to-[#229EFF]/10 border border-[#FFBE00]/30 rounded-2xl p-4 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Image
                                    src="/images/paw.svg"
                                    alt="paw"
                                    width={16}
                                    height={16}
                                    className="text-[#FFBE00]"
                                />
                                <span className="text-[#FFBE00] font-bold text-lg">
                                    Earn 5-10% SOL
                                </span>
                                <Image
                                    src="/images/paw.svg"
                                    alt="paw"
                                    width={16}
                                    height={16}
                                    className="text-[#FFBE00] rotate-180"
                                />
                            </div>
                            <p className="text-white text-sm">
                                For every purchase made through your affiliate
                                link
                            </p>
                        </div>

                        {/* Action buttons */}
                        <div className="space-y-3">
                            <Link href="/dawgs-tge" onClick={onClose}>
                                <Button className="w-full bg-gradient-to-r from-[#FFBE00] to-[#229EFF] hover:from-[#FFBE00]/90 hover:to-[#229EFF]/90 text-black font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                                    <span>Visit TGE Page</span>
                                    <ExternalLink size={16} className="ml-2" />
                                </Button>
                            </Link>

                            <Button
                                onClick={handleCopyLink}
                                variant="outline"
                                className="w-full border-[#FFBE00]/50 text-[#FFBE00] hover:bg-[#FFBE00]/10 py-3 rounded-full transition-all duration-300"
                            >
                                <Copy size={16} className="mr-2" />
                                <span>
                                    {copied ? "Copied!" : "Copy TGE Link"}
                                </span>
                            </Button>
                        </div>

                        {/* Footer note */}
                        <div className="text-center">
                            <p className="text-[#ACACAC] text-xs">
                                Get your personalized affiliate link on the TGE
                                page
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
