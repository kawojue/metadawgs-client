"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import useAuth from "@/hooks/use-auth";
import { postWithAuth } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";

interface JoinCreatorsClubProps {
    open: boolean;
    onClose?: () => void;
}

interface FormData {
    about: string;
    contribute: string;
}

const MIN_TOTAL_LENGTH = 100;

function JoinCreatorsClub({ open, onClose }: JoinCreatorsClubProps) {
    const [formData, setFormData] = useState<FormData>({
        about: "",
        contribute: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { refetchProfile } = useAuth();

    const resetForm = useCallback(() => {
        setFormData({ about: "", contribute: "" });
        setError(null);
    }, []);

    useEffect(() => {
        if (!open) {
            resetForm();
        }
    }, [open, resetForm]);

    const handleInputChange = useCallback(
        (field: keyof FormData, value: string) => {
            setFormData((prev) => ({ ...prev, [field]: value }));
            setError(null);
        },
        []
    );

    const validateForm = useCallback((): boolean => {
        const { about, contribute } = formData;
        const totalLength = about.trim().length + contribute.trim().length;

        if (totalLength < MIN_TOTAL_LENGTH) {
            setError(
                `Please provide at least ${MIN_TOTAL_LENGTH} characters in total`
            );
            return false;
        }

        return true;
    }, [formData]);

    const submitJoin = useCallback(async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            await postWithAuth("/user/apply/creator-application", {
                answer1: formData.about,
                answer2: formData.contribute,
            });

            await refetchProfile();
            onClose?.();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred"
            );
        } finally {
            setLoading(false);
        }
    }, [formData, validateForm, refetchProfile, onClose]);

    const handleClose = useCallback(() => {
        resetForm();
        onClose?.();
    }, [resetForm, onClose]);

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    handleClose();
                }
            }}
        >
            <DialogContent
                className="sm:max-w-[456px] bg-black text-white shadow-sm border border-white/20 rounded-3xl z-[999]"
                showCloseButton={false}
            >
                <DialogHeader className="flex flex-col justify-center gap-2 items-center">
                    <div className="circle bg-white rounded-full p-2.5 mb-1">
                        <Image
                            src="/images/man-avatar.png"
                            alt="Profile avatar"
                            width={100}
                            height={100}
                            priority
                        />
                    </div>
                    <DialogTitle className="font-fredoka text-2xl text-center">
                        Join Creators
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-5 py-2 content">
                    <div className="row flex flex-col gap-2">
                        <label htmlFor="about" className="text-sm font-fredoka">
                            Tell Us About Yourself
                        </label>
                        <div className="relative sm:max-w-[405px] w-full max-w-[94svw]">
                            <Textarea
                                id="about"
                                className="bg-white/10 min-h-22 max-h-26 scroll min-w-full"
                                value={formData.about}
                                onChange={(e) =>
                                    handleInputChange("about", e.target.value)
                                }
                                placeholder="Share your story..."
                                aria-label="Tell us about yourself"
                            />
                            <span className="count absolute right-3 bottom-3 text-sm">
                                {formData.about.trim().length}
                            </span>
                        </div>
                    </div>
                    <div className="row flex flex-col gap-2">
                        <label
                            htmlFor="contribute"
                            className="text-sm font-fredoka"
                        >
                            How can you contribute to the creators club on X
                        </label>
                        <div className="relative sm:max-w-[405px] w-full max-w-[94svw]">
                            <Textarea
                                id="contribute"
                                className="bg-white/10 min-h-22 max-h-26 scroll"
                                value={formData.contribute}
                                onChange={(e) =>
                                    handleInputChange(
                                        "contribute",
                                        e.target.value
                                    )
                                }
                                placeholder="Share your ideas..."
                                aria-label="How can you contribute"
                            />
                            <span className="count absolute right-3 bottom-3 text-sm">
                                {formData.contribute.trim().length}
                            </span>
                        </div>
                    </div>
                    {error && (
                        <p className="error text-red-500 text-sm" role="alert">
                            {error}
                        </p>
                    )}
                </div>
                <DialogFooter className="w-full flex flex-col sm:flex-col gap-4 sm:justify-start">
                    <Button
                        type="button"
                        className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
                        disabled={!!error || loading}
                        onClick={submitJoin}
                        aria-busy={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                    <Button
                        type="button"
                        disabled={loading}
                        className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black disabled:cursor-not-allowed!"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default JoinCreatorsClub;
