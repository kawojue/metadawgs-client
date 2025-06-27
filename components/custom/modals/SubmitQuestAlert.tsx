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
import useAuth from "@/hooks/use-auth";
import Image from "next/image";

export function SubmitQuestAlert({
    open,
    onClose,
    message,
}: {
    open?: boolean;
    onClose?: () => void;
    message?: string;
}) {
  const { refetchProfile } = useAuth();

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
                            src={"/images/check.svg"}
                            alt="check"
                            width={100}
                            height={100}
                        />
                    </div>
                    <AlertDialogTitle className="text-center font-fredoka text-3xl px-10 capitalize">
                        Quest Claimed! Bones awarded! 🎉
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center max-w-[380px] text-white text-base">
                        {message ||
                            `Your quest claim has been logged in the Hall of Records.\nGlory awaits, adventurer — stay sharp, the journey has just begun! ⚔️🗺️`}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="grid! grid-cols-1! gap-4 mt-2">
                    <AlertDialogCancel
                        className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black shadow-[black]/40"
                        onClick={() => {
                            setRefreshPosts(generateRandomString(10));
                            onClose?.();
                            // window.location.reload();
                        }}
                    >
                        Close
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
