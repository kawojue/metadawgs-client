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
import { generateRandomString } from "@/lib/common";
import { XRefreshPosts } from "@/lib/values";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import useLocalStorage from "use-local-storage";

export function LeaveDawgHouseAlert({
  open,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const [, setRefreshPosts] = useLocalStorage<string>(XRefreshPosts, "");

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
              src={"/images/cancel.svg"}
              alt="check"
              width={100}
              height={100}
            />
          </div>
          <AlertDialogTitle className="text-center font-fredoka text-3xl capitalize">
            Are you sure you want to leave?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center max-w-[380px] text-white text-base">
            {`This is an irrefutable operation and all points accumulated will be lost indefinitely smth`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid! grid-cols-2! gap-4 mt-2">
          <AlertDialogAction
            className="w-full py-6! rounded-full cursor-pointer bg-[#7c0707] text-white"
            onClick={() => {
              setRefreshPosts(generateRandomString(10));
              onClose?.();
            }}
          >
            Leave Dawghouse <ArrowUpRightIcon />
          </AlertDialogAction>
          <AlertDialogCancel
            className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black shadow-[black]/40"
            onClick={() => {
              setRefreshPosts(generateRandomString(10));
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
