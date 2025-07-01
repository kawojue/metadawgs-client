"use client";

import UserProfileButton from "@/components/custom/UserProfileBtn";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useAuth from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { TelegramIcon, TwitterIcon } from "@/lib/icons";
import { authUrl } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import AuthTelegramModal from "./AuthTelegramModal";
import { toast } from "sonner";

function OnboardingModal({
    open,
    onClose,
    continueOn,
}: {
    open: boolean;
    onClose?: () => void;
    toggleOpen?: () => void;
    continueOn?: () => void;
}) {
    const { userProfile, isLoading } = useAuth();

    const isMobile = useIsMobile();
    const [openTelegram, setOpenTelegram] = useState(false);

    const canContinue = useMemo(
        () => userProfile && userProfile?.hasLinkedTelegram,
        [userProfile]
    );

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleContinue = () => {
        if (canContinue && continueOn) {
            continueOn();
        }
    };

    const handleTwitterConnect = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get("ref");

        let connectUrl;
        if (ref) {
            connectUrl = `https://socialfi.metadawgs.com/auth/x?ref=${ref}`;
        } else {
            connectUrl = authUrl;
        }

        sessionStorage.setItem("authFrom", "/metadawgs-club?c_a=true");

        window.location.href = connectUrl;
    };

    return (
        <>
            <Dialog
                open={open}
                onOpenChange={(x) => {
                    if (!x) {
                        handleClose();
                    }
                }}
            >
                <DialogContent
                    className="sm:max-w-[456px] bg-black text-white shadow-sm border border-white/20 rounded-3xl"
                    showCloseButton={true}
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <DialogHeader className="flex flex-col justify-center gap-2 items-center">
                        <div className="circle bg-white rounded-full p-2.5 mb-1">
                            <Image
                                src={"/images/man-avatar.png"}
                                alt="man"
                                width={100}
                                height={100}
                            />
                        </div>
                        <DialogTitle className="font-fredoka text-2xl text-center">
                            Sign In to Join The Metadawgs <br />
                            GrindFi Club!
                        </DialogTitle>
                    </DialogHeader>
                    <div>
                        <div className="links grid gap-4 py-2">
                            <div className="link rounded-full h-16 w-full flex text-white justify-between items-center gap-4 p-4 px-5 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg2.png')] after:bg-black/60 after:bg-blend-darken after:bg-no-repeat after:bg-center after:bg-cover z-10">
                                <div className="flex gap-3 items-center flex-1">
                                    <div className="app-icon text-white">
                                        <TwitterIcon />
                                    </div>
                                    <p className="info text-[16px] text-start">
                                        Connect Twitter
                                    </p>
                                </div>

                                {!userProfile && (
                                    <button
                                        onClick={handleTwitterConnect}
                                        className="w-auto bg-[#FFBE00] text-black font-semibold shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] hover:opacity-80 text-sm rounded-full px-4! py-2 cursor-pointer hover:bg-[#FFBE00]/80 transition-colors flex items-center gap-1"
                                    >
                                        <span className="">Connect</span>
                                        <ArrowUpRightIcon size={14} />
                                    </button>
                                )}

                                {!!userProfile && (
                                    <UserProfileButton
                                        activeClassName="bg-[#FFBE00] text-black border-none shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] hover:opacity-80 hover:bg-[#FFBE00] px-5 pr-6"
                                        profile={userProfile}
                                        isLoading={isLoading}
                                        ignoreModalSetup
                                        isMobile={isMobile}
                                        showLogout
                                    />
                                )}
                            </div>

                            {/* <div className="link rounded-full h-16 w-full flex text-white justify-between items-center gap-4 p-4 px-5 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg2.png')] after:bg-black/60 after:bg-blend-darken after:bg-no-repeat after:bg-center after:bg-cover z-10">
                                <div className="flex gap-3 items-center flex-1">
                                    <div className="app-icon text-white">
                                        <WalletIcon size={24} />
                                    </div>
                                    <p className="info text-[16px] text-start">
                                        Connect Wallet
                                    </p>
                                </div>

                                <AddressButton
                                    className="px-4! py-2!"
                                    activeClassName="px-4! pl-2! py-5.5!"
                                    label={
                                        <>
                                            <span className="">Connect</span>
                                            <ArrowUpRightIcon size={12} />
                                        </>
                                    }
                                    connectedLabel={
                                        <>
                                            <Avatar className="w-7.5 h-7.5 min-w-7.5 min-h-7.5">
                                                <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500" />
                                            </Avatar>
                                            <span className="text-sm">
                                                Connected
                                            </span>
                                        </>
                                    }
                                    onConnect={() => {}}
                                    onConnected={() => {}}
                                />
                            </div> */}

                            <div className="link rounded-full h-16 w-full flex text-white justify-between items-center gap-4 p-4 px-5 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg2.png')] after:bg-black/60 after:bg-blend-darken after:bg-no-repeat after:bg-center after:bg-cover z-10">
                                <div className="flex gap-3 items-center flex-1">
                                    <div className="app-icon text-white">
                                        <TelegramIcon />
                                    </div>
                                    <p className="info text-[16px] text-start">
                                        Join Telegram
                                    </p>
                                </div>

                                {!userProfile?.hasLinkedTelegram && (
                                    <Button
                                        className="verify bg-[#FFBE00] text-black text-sm rounded-full px-4! py-2 cursor-pointer hover:bg-[#FFBE00]/80 transition-colors flex items-center gap-1"
                                        onClick={() => {
                                            if (!userProfile) {
                                                toast.error(
                                                    "🛑 Whoa! You're skipping a level. Link your Twitter to continue."
                                                );
                                                return;
                                            }

                                            setOpenTelegram(true);
                                        }}
                                    >
                                        <span className="">Join</span>
                                        <ArrowUpRightIcon size={12} />
                                    </Button>
                                )}

                                {!!userProfile?.hasLinkedTelegram && (
                                    <div className="bg-[#FFBE00] text-black font-semibold shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] text-sm rounded-full px-4 py-2 flex items-center gap-1">
                                        <span>Connected</span>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M20 6L9 17L4 12"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="w-full flex flex-col sm:flex-col gap-4 sm:justify-start">
                        <Button
                            type="button"
                            className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
                            onClick={handleContinue}
                            disabled={!canContinue}
                        >
                            Continue
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AuthTelegramModal
                open={openTelegram}
                onClose={() => setOpenTelegram(false)}
            />
        </>
    );
}

export default OnboardingModal;
