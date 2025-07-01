"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";

export function ViewWarningModal({
    open,
    onClose,
    onProceed,
}: {
    open?: boolean;
    onClose?: () => void;
    onProceed?: () => void;
}) {
    return (
        <AlertDialog
            open={open}
            onOpenChange={(x) => {
                if (!x) {
                    onClose?.();
                }
            }}
        >
            <AlertDialogContent className="bg-black text-white border-white/20 rounded-2xl">
                <AlertDialogHeader className="flex flex-col justify-center items-center gap-4">
                    <div className="circle bg-white rounded-full p-2.5 mb-1">
                        <Image
                            src={"/images/paw.svg"}
                            alt="paw"
                            width={100}
                            height={100}
                        />
                    </div>
                    <AlertDialogTitle className="text-center font-fredoka text-3xl capitalize">
                        Hold up, fellow dawg! 🐕
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center max-w-[380px] text-white text-base">
                        Before you proceed, make sure you <strong>like</strong>{" "}
                        and <strong>retweet</strong> that post! 🔥
                        <br />
                        <br />
                        Our quest detectives are watching, and if you skip this
                        step, we&apos;ll have to dock some bones from your
                        stash. Nobody wants that! 😅
                        <br />
                        <br />
                        Play fair and keep those bones coming! 🦴✨
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="grid! grid-cols-2! gap-4 mt-2">
                    <AlertDialogCancel
                        className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black shadow-[black]/40"
                        onClick={() => {
                            onClose?.();
                        }}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black"
                        onClick={() => {
                            onProceed?.();
                            onClose?.();
                        }}
                    >
                        I Got It! Proceed <ArrowUpRightIcon size={16} />
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
