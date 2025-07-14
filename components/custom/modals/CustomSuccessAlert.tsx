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
import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";

interface SuccessAlertModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  message?: string;
  onAdvance?: () => void;
  advanceLabel?: string;
}

export function SuccessAlertModal({
  open = false,
  onClose,
  title = "Success!",
  message = "Your action was completed successfully.",
  onAdvance,
  advanceLabel = "Continue",
}: SuccessAlertModalProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose?.();
      }}
    >
      <AlertDialogContent className="bg-black text-white border-white/20 rounded-2xl">
        <AlertDialogHeader className="flex flex-col justify-center items-center gap-4">
          <div className="circle bg-white rounded-full p-2.5 mb-1">
            <Image
              src="/images/check.svg"
              alt="check"
              width={100}
              height={100}
            />
          </div>
          <AlertDialogTitle className="text-center font-fredoka text-3xl capitalize whitespace-pre">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center max-w-[380px] text-white text-base">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-2 gap-4 mt-2">
          <AlertDialogCancel
            className="w-full py-6 rounded-full cursor-pointer bg-white text-black shadow-[black]/40"
            onClick={onClose}
          >
            Close
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-full py-6 rounded-full cursor-pointer bg-[#FFBE00] text-black"
            onClick={() => {
              onAdvance?.();
              onClose?.();
            }}
          >
            {advanceLabel} <ArrowUpRightIcon className="ml-1" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
