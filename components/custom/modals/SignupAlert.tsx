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
import Image from "next/image";

export function SignupAlert({
  open,
  onClose,
  message,
}: {
  open?: boolean;
  onClose?: () => void;
  message?: string;
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
            {!message &&
              "You need to sign up first before connecting your wallet. Create an account to unlock all features and start your journey!"}
            {!!message && message}
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
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.99204 7.76733L9.1665 12H13.8332L8.5943 5.01487L12.9537 0H11.187L7.77604 3.92385L4.83317 0H0.166504L5.17374 6.67633L0.545937 12H2.31262L5.99204 7.76733ZM9.83317 10.6667L2.83317 1.33333H4.1665L11.1665 10.6667H9.83317Z"
                fill="black"
              />
            </svg>{" "}
            Sign in with X
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
