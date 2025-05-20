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
}: {
  open?: boolean;
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
          <div className="circle bg-white rounded-full p-2.5 mb-1">
            <Image
              src={"/images/robo.svg"}
              alt="check"
              width={250}
              height={160}
            />
          </div>
          <AlertDialogTitle className="text-center font-fredoka text-3xl px-10 capitalize">
            Submit Failed
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center max-w-[380px] text-white text-base">
            You’ve hit the button too many times. Wait a bit ans try again
            shortly
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
