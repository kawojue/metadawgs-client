"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

export function QuestErrorAlert({
    open,
    onClose,
    isRobo,
    error,
    isOthers,
}: {
    open?: boolean;
    isRobo?: boolean;
    error?: string;
    isOthers?: boolean;
    onClose?: () => void;
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
                    <div className="mb-1">
                        {isRobo && (
                            <Image
                                src={"/images/robo.svg"}
                                alt="robo"
                                width={250}
                                height={160}
                            />
                        )}

                        {!isRobo && (
                            <Image
                                src={"/images/clock.svg"}
                                alt="clock"
                                width={200}
                                height={200}
                            />
                        )}
                    </div>
                    <AlertDialogTitle className="text-center font-fredoka text-3xl px-10 capitalize">
                        {!isOthers && "Submit Failed"}
                        {isOthers && "Request Failed"}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center max-w-[380px] text-white font-semibold">
                        {!isRobo &&
                            (error ||
                                "You've hit the button too many times. Wait a bit ans try again shortly")}
                        {isRobo && (error || "Something unexpected occurred")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="grid! grid-cols-1! gap-4 mt-2">
                    <AlertDialogCancel
                        className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black shadow-[black]/40"
                        onClick={() => {
                            onClose?.();
                        }}
                    >
                        Close
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
