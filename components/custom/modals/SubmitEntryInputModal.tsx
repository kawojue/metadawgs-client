"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ArrowUpRightIcon, CircleX } from "lucide-react";
import { useState } from "react";
import { QuestErrorAlert } from "./QuestErrorAlert";
import { XUserToken } from "@/lib/values";
import useAuth from "@/hooks/use-auth";
import { SuccessAlertModal } from "./CustomSuccessAlert";
import { useRouter } from "next/navigation";

function SubmitEntryInputModal({
    open,
    onClose,
    isMindShare,
    isVideo,
}: {
    open: boolean;
    onClose?: () => void;
    isMindShare?: boolean;
    isVideo?: boolean;
}) {
    const { logout } = useAuth();
    const [link, setLink] = useState<string>("");
    const [validationError, setValidationError] = useState<string | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [isRobo, setIsRobo] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    async function submitEntry() {
        const token = localStorage.getItem(XUserToken);
        if (!token) return;

        setLoading(true);

        const body = { url: link };

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/posts/entry`,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!res.ok) {
            if (res.status !== 401) {
                const { message } = await res.json();
                setIsRobo(![409, 429].includes(res.status));
                setApiError(message);
                onClose?.();
            } else {
                logout();
                onClose?.();
            }

            setLoading(false);

            return;
        }

        setLink("");
        setSuccess(true);
        setLoading(false);
    }

    useEffect(() => {
        if (link.trim() === "") {
            setValidationError(null);
        } else {
            setValidationError(null);
        }
    }, [link, isMindShare]);

    return (
        <>
            {!success && (
                <Dialog
                    open={open}
                    onOpenChange={(x) => {
                        if (!x) {
                            onClose?.();
                        }
                    }}
                >
                    <DialogContent
                        className="sm:max-w-[456px] bg-black text-white shadow-sm border  border-white/20 rounded-2xl"
                        showCloseButton={false}
                    >
                        <DialogHeader className="flex flex-row justify-between gap-4 items-center">
                            <DialogTitle className="font-fredoka text-2xl text-center">
                                Submit {isVideo ? "Video" : "Post"}
                            </DialogTitle>
                            <button
                                className="cursor-pointer p-1"
                                id="Close"
                                onClick={() => {
                                    onClose?.();
                                }}
                            >
                                <CircleX size={18} />
                                <span className="sr-only">Close</span>
                            </button>
                        </DialogHeader>
                        <div className="grid gap-5 py-4 content">
                            <div className="row flex flex-col gap-2">
                                <label htmlFor="link" className="text-sm">
                                    {isVideo && (
                                        <>
                                            {!isMindShare && "Link to tweet"}
                                            {isMindShare &&
                                                `Link to your Tweeted, TikTok and Youtube Video`}
                                        </>
                                    )}
                                    {!isVideo && (
                                        <>
                                            {!isMindShare && "Link to tweet"}
                                            {isMindShare && `Link to tweet`}
                                        </>
                                    )}
                                </label>
                                <input
                                    type="text"
                                    placeholder={`Enter link`}
                                    value={link}
                                    onChange={(x) => setLink(x.target.value)}
                                    className="h-12 rounded-full w-full p-4 border border-[#9C9C9C] bg-white/10"
                                />
                                {!!validationError && (
                                    <p className="error text-red-500 text-sm">
                                        {validationError}
                                    </p>
                                )}
                            </div>
                        </div>
                        <DialogFooter className="">
                            <Button
                                type="button"
                                className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
                                disabled={!!validationError || !link || loading}
                                onClick={submitEntry}
                            >
                                {!loading ? "Submit" : "Submitting"}
                                <ArrowUpRightIcon size={11} />
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
            {!!apiError && (
                <QuestErrorAlert
                    open={!!apiError}
                    isRobo={isRobo}
                    error={apiError}
                    onClose={() => {
                        setApiError(null);
                        onClose?.(); // Ensure parent modal state is also reset
                    }}
                />
            )}
            {success && (
                <SuccessAlertModal
                    open={success}
                    onClose={() => setSuccess(false)}
                    title={`Quest submitted!\nBones awarded! 🎉`}
                    message="An admin will review your entry soon to make sure everything checks out. If something doesn’t add up, your account could face penalties. So play fair, adventurer! ⚔️"
                    onAdvance={() => router.push("/metadawgs-club/dawghouses")}
                    advanceLabel="Go to Dawghouse"
                />
            )}
        </>
    );
}

export default SubmitEntryInputModal;
