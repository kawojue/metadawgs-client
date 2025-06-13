"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { postWithAuth } from "@/lib/api";
import {
    copyToClipboard,
    formatNumberWithCommas,
    hashAddress,
} from "@/lib/common";
import {
    LogOutIcon,
    TelegramIcon,
    TwitterIcon,
    VerificationBadge,
    YoutubeIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import useAuth from "@/hooks/use-auth";
import siteConfig from "@/lib/siteConfig";
import { useState, useEffect, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { SubmitReferralAlert } from "./SubmitReferralAlert";
import { ArrowUpRightIcon, BookAIcon, CircleX, CopyIcon } from "lucide-react";
import AuthTelegramModal from "@/app/metadawgs-club/modals/AuthTelegramModal";

function ProfileSidebar({
    open,
    onClose,
    logout,
}: {
    open: boolean;
    onClose: () => void;
    logout: () => void;
}) {
    const { userProfile, setUserProfile } = useAuth();
    const { publicKey } = useWallet();
    const [success, setSuccess] = useState<boolean>(false);
    const [syncAddressing, setSyncAddressing] = useState<boolean>(false);
    const [syncAddressError, setSyncAddressError] = useState<string>("");
    const [openTelegram, setOpenTelegram] = useState(false);

    const currentWallet = publicKey?.toBase58();

    const statsConfig = useMemo(
        () => [
            {
                value:
                    formatNumberWithCommas(Number(userProfile?.user.tasks)) ||
                    0,
                label: "Tasks Completed",
            },
            {
                value:
                    Number(userProfile?.overallPoints)?.toLocaleString(
                        "en-US",
                        {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                        }
                    ) || 0,
                label: "Overall Bones",
            },
            {
                value: userProfile?.rank || "NIL",
                label: "Rank Number",
            },
            {
                value: "NIL",
                label: "Airdrop Tokens",
                isAirdrop: true,
            },
        ],
        [userProfile]
    );

    const socialLinks = [
        {
            icon: <TwitterIcon />,
            label: "Follow On Twitter",
            buttonText: "Follow",
            href: siteConfig.socialLinks.twitter,
        },
        {
            icon: <TelegramIcon />,
            label: "Join Telegram",
            buttonText: "Join",
            href: siteConfig.socialLinks.telegram,
        },
        {
            icon: <YoutubeIcon />,
            label: "Subscribe on Youtube",
            buttonText: "Subscribe",
            href: siteConfig.socialLinks.youtube,
        },
        {
            icon: <BookAIcon size={24} />,
            label: "A guide to metadawgs",
            buttonText: "Read",
            href: siteConfig.socialLinks.roadmap,
        },
    ];

    async function approveWallet() {
        try {
            setSyncAddressing(true);
            await postWithAuth("/user/link-wallet", {
                walletAddress: currentWallet,
            });

            if (userProfile) {
                setUserProfile({
                    ...userProfile,
                    user: {
                        ...userProfile.user,
                        walletApproved: true,
                    },
                });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setSyncAddressError(
                error.toString() || "An unexpected error occurred"
            );
            console.error("Failed to link wallet:", error);
        } finally {
            setSyncAddressing(false);
        }
    }

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && open) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [open, onClose]);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] transition-opacity duration-300",
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed top-0 right-0 h-full z-[100000] transition-transform duration-300 ease-in-out w-full md:w-[480px] lg:w-[520px]",
                    open ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="h-full bg-black text-white md:mt-0 mt-4 md:mb-0 mb-4 flex flex-col">
                    {/* Header */}
                    <div className="flex flex-row justify-between gap-4 items-center p-6 pb-4 border-b border-white/10">
                        <h2 className="font-fredoka text-2xl font-semibold">
                            Profile
                        </h2>
                        <button
                            className="cursor-pointer p-2 hover:bg-white/10 rounded-full transition-colors"
                            onClick={onClose}
                        >
                            <CircleX size={18} />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll">
                        {/* Profile Section */}
                        <div className="profile flex flex-col gap-4 items-center justify-center">
                            <Avatar className="w-20 h-20 min-w-20 min-h-20">
                                <AvatarImage src={userProfile?.user?.avatar} />
                                <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500"></AvatarFallback>
                            </Avatar>
                            <div className="div flex gap-2 items-center">
                                <p className="text-sm text-[#ACACAC]">
                                    {`@${userProfile?.user.username}`}
                                </p>
                                {userProfile?.user?.verified && (
                                    <VerificationBadge />
                                )}
                            </div>
                            <div className="flex gap-3 items-center">
                                <span className="text-[#ACACAC] text-sm font-medium">
                                    Referral Link:
                                </span>
                                <Button
                                    className="bg-[#A078FF] p-1.5 px-2.5 rounded-full cursor-pointer text-sm hover:bg-[#A078FF]/80 flex items-center gap-2"
                                    onClick={() => {
                                        copyToClipboard(
                                            `https://socialfi.metadawgs.com/auth/x?ref=${userProfile?.referralCode}`
                                        );
                                        toast(
                                            "Referral link is saved to the clipboard"
                                        );
                                    }}
                                >
                                    <span className=".5">
                                        {hashAddress(
                                            `https://socialfi.metadawgs.com/auth/x?ref=${userProfile?.referralCode}`,
                                            10
                                        )}
                                    </span>
                                    <CopyIcon />
                                </Button>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="stats grid grid-cols-3 gap-3">
                            {statsConfig.map((stat, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "grid gap-1 col-span-1 text-center bg-[#FFBE00] text-black rounded-xl p-3 py-4 shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)]",
                                        stat.isAirdrop && "col-span-3"
                                    )}
                                >
                                    <span className="font-semibold text-lg">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs">
                                        {stat.label}
                                    </span>
                                    {stat.isAirdrop && (
                                        <Button
                                            disabled
                                            className="mt-2 bg-black/20 text-black hover:bg-black/30 cursor-not-allowed"
                                        >
                                            Claim Tokens
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Wallet Section */}
                        {!!currentWallet && (
                            <div className="wallet-approval-section space-y-4">
                                <div className="w-full flex flex-col gap-3">
                                    <label className="text-sm text-[#ACACAC] font-semibold">
                                        Linked Wallet Address
                                    </label>
                                    <div className="flex justify-between items-center gap-4 w-full bg-white/10 p-3 rounded-lg border border-[#9C9C9C]">
                                        <p className="text-sm text-white break-all flex-1">
                                            {hashAddress(currentWallet, 8)}
                                        </p>
                                        <Button
                                            className={cn(
                                                "verify bg-[#FFBE00] text-black text-sm rounded-full px-4 py-2 cursor-pointer hover:bg-[#FFBE00]/80 transition-colors flex-shrink-0",
                                                (syncAddressing ||
                                                    !currentWallet ||
                                                    userProfile?.user
                                                        ?.walletApproved) &&
                                                    "opacity-50"
                                            )}
                                            onClick={approveWallet}
                                            disabled={
                                                syncAddressing ||
                                                !currentWallet ||
                                                userProfile?.user
                                                    ?.walletApproved
                                            }
                                        >
                                            {!userProfile?.user?.walletApproved
                                                ? syncAddressing
                                                    ? "Approving..."
                                                    : "Approve"
                                                : "Approved"}
                                        </Button>
                                    </div>
                                </div>
                                {!!syncAddressError && (
                                    <p className="syncAddressError text-red-500 text-sm">
                                        {syncAddressError}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Social Links Section */}
                        <div className="links grid gap-3">
                            {socialLinks.map((link, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="link rounded-full h-16 w-full flex text-white justify-between items-center gap-4 p-4 px-5 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg2.png')] after:bg-black/60 after:bg-blend-darken after:bg-no-repeat after:bg-center after:bg-cover z-10"
                                    >
                                        <div className="flex gap-4 items-center flex-1">
                                            <div className="app-icon text-white">
                                                {link.icon}
                                            </div>
                                            <p className="info text-[16px] text-start">
                                                {link.label}
                                            </p>
                                        </div>

                                        {!!link.href && (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-auto"
                                            >
                                                <Button className="verify bg-[#FFBE00] text-black text-sm rounded-full px-4! py-2 cursor-pointer hover:bg-[#FFBE00]/80 transition-colors flex items-center gap-1">
                                                    <span className="">
                                                        {link.buttonText}
                                                    </span>
                                                    <ArrowUpRightIcon
                                                        size={12}
                                                    />
                                                </Button>
                                            </a>
                                        )}
                                        {!link.href && (
                                            <Button className="verify bg-[#FFBE00] text-black text-sm rounded-full px-4! py-2 cursor-pointer hover:bg-[#FFBE00]/80 transition-colors flex items-center gap-1">
                                                <span className="">
                                                    {link.buttonText}
                                                </span>
                                                <ArrowUpRightIcon size={12} />
                                            </Button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 pt-4 border-t border-white/10">
                        <Button
                            type="button"
                            className="w-full bg-transparent py-3 h-14 rounded-full cursor-pointer border border-white/20 hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                            onClick={() => {
                                logout();
                                onClose();
                            }}
                        >
                            <span className="">Log Out</span>
                            <LogOutIcon />
                        </Button>
                    </div>
                </div>
            </div>

            {success && (
                <SubmitReferralAlert
                    open={success}
                    onClose={() => {
                        setSuccess(false);
                    }}
                />
            )}
            <AuthTelegramModal
                open={openTelegram}
                onClose={() => setOpenTelegram(false)}
            />
        </>
    );
}

export default ProfileSidebar;
