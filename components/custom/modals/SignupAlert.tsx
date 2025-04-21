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
import { authWithTwitter } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";

export function SignupAlert({
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
              src={"/images/paw.svg"}
              alt="warning"
              width={100}
              height={100}
            />
          </div>
          <AlertDialogTitle className="text-center font-fredoka text-3xl">
            Signup Required!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center max-w-[380px] text-white text-base">
            You need to sign up first before connecting your wallet. Create an
            account to unlock all features and start your journey!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid! grid-cols-2! gap-4 mt-2">
          <AlertDialogCancel
            className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black shadow-[black]/40"
            onClick={() => onClose?.()}
          >
            Close
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black"
            onClick={() => {
              onClose?.();
              authWithTwitter();
            }}
          >
            Signup Now <ArrowUpRightIcon />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
