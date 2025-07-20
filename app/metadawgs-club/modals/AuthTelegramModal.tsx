"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import siteConfig from "@/lib/siteConfig";
import { QuestErrorAlert } from "@/components/custom/modals/QuestErrorAlert";
import { XUserToken } from "@/lib/values";

function AuthTelegramModal({
    open,
    onClose,
    onReopenParent,
}: {
    open: boolean;
    onClose?: () => void;
    onReopenParent?: () => void;
}) {
    const [username, setUsername] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [step2, setStep2] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [tgAuthUrl, setTgAuthUrl] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [countdown, setCountdown] = useState<number>(30);

    async function getTgAuthUrl() {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem(XUserToken);
        if (!token) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/telegram/link`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                    }),
                }
            );

            const response = await res.json();

            if (!res.ok) {
                if (res.status !== 401) {
                    setErrorMessage(
                        response.message || "An unexpected error occurred"
                    );
                    onClose?.();
                    setTimeout(() => setShowErrorModal(true), 100);
                }
                return;
            }

            setTgAuthUrl(response.data.url);
            setStep2(true);

            const countdownInterval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdownInterval);
                        window.location.reload();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(countdownInterval);
        } catch {
            setErrorMessage("Network error occurred");
            onClose?.();
            setTimeout(() => setShowErrorModal(true), 100);
        } finally {
            setLoading(false);
        }
    }

    function reset() {
        setUsername("");
        setStep2(false);
        setTgAuthUrl(null);
        setError(null);
        setShowErrorModal(false);
        setErrorMessage("");
        setCountdown(30);
    }

    const handleClose = () => {
        if (onClose) {
            reset();
            onClose();
        }
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
                    className="sm:max-w-[456px] bg-black text-white shadow-sm border  border-white/20 rounded-3xl"
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
                            Authenticate Telegram
                        </DialogTitle>
                        {!step2 && (
                            <p className="text-center">
                                If you {"haven't"} joined, please join:{" "}
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={siteConfig.socialLinks.telegram}
                                    className="text-semibold text-blue-400"
                                >
                                    MetaDawgs
                                </a>
                                , then come back to authenticate.
                            </p>
                        )}
                        {step2 && (
                            <DialogDescription className="text-center text-base text-white px-6">
                                Please click the link below to authorize your
                                Telegram account.
                                {tgAuthUrl && (
                                    <div className="mt-4">
                                        <a
                                            href={tgAuthUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 underline font-semibold"
                                        >
                                            Click here to authorize
                                        </a>
                                        <p className="text-sm text-gray-400 mt-2">
                                            Page will automatically reload in{" "}
                                            {countdown} seconds
                                        </p>
                                    </div>
                                )}
                            </DialogDescription>
                        )}
                    </DialogHeader>
                    <div className="grid gap-5 py-2 content">
                        {!step2 && (
                            <div className="row flex flex-col gap-2">
                                <label
                                    htmlFor="username"
                                    className="text-base font-fredoka font-semibold"
                                >
                                    Telegram Username
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    name="username"
                                    onInput={() => setError(null)}
                                    onChange={(x) =>
                                        setUsername(x.target.value)
                                    }
                                    className="h-12 rounded-full w-full p-4 border border-[#9C9C9C] bg-white/10"
                                />
                                {!!error && (
                                    <p className="error text-red-500 text-sm">
                                        {error}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                    <DialogFooter className="w-full flex flex-col sm:flex-col gap-4 sm:justify-start">
                        {!step2 && (
                            <>
                                <Button
                                    type="button"
                                    className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
                                    disabled={!!error || !username || loading}
                                    onClick={getTgAuthUrl}
                                >
                                    {loading ? "Loading..." : "Get Link"}
                                </Button>
                                <Button
                                    type="button"
                                    disabled={loading}
                                    className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black disabled:cursor-not-allowed!"
                                    onClick={() =>
                                        window.open(
                                            siteConfig.socialLinks.telegram,
                                            "_blank"
                                        )
                                    }
                                >
                                    Join Telegram
                                </Button>
                            </>
                        )}
                        {step2 && (
                            <>
                                <Button
                                    type="button"
                                    className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
                                    onClick={() => {
                                        if (tgAuthUrl) {
                                            window.open(tgAuthUrl, "_blank");
                                        }
                                    }}
                                >
                                    Open Authorization Link
                                </Button>
                                <Button
                                    type="button"
                                    disabled={loading}
                                    className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black disabled:cursor-not-allowed!"
                                    onClick={() => {
                                        reset();
                                        onClose?.();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <QuestErrorAlert
                open={showErrorModal}
                onClose={() => {
                    setShowErrorModal(false);
                    // Reset all states and reopen parent modal
                    reset();
                    onReopenParent?.();
                }}
                error={errorMessage}
                isOthers={true}
            />
        </>
    );
}

export default AuthTelegramModal;
