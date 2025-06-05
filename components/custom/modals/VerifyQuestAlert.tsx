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
import { generateRandomString } from "@/lib/common";
import siteConfig from "@/lib/siteConfig";
import { XRefreshPosts } from "@/lib/values";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import useLocalStorage from "use-local-storage";

export function VerifyQuestAlert({
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
              src={"/images/check.svg"}
              alt="check"
              width={100}
              height={100}
            />
          </div>
          <AlertDialogTitle className="text-center font-fredoka text-3xl px-10 capitalize">
            Join Twitter Space
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center max-w-[380px] text-white text-base">
            {`An admin will review your entry soon. If something doesn’t add up, your account may face penalties. Play fair, adventurer! ⚔️`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid! grid-cols-2! gap-4 mt-2">
          <AlertDialogCancel
            className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black shadow-[black]/40"
            onClick={() => {
              setRefreshPosts(generateRandomString(10));
              onClose?.();
            }}
          >
            Close
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-full py-3.5! rounded-full text-sm font-medium h-fit cursor-pointer bg-[#FFBE00] text-black shadow-[black]/40"
            onClick={() => {
              setRefreshPosts(generateRandomString(10));
              window.open(siteConfig.socialLinks.twitter, "_blank");
              onClose?.();
            }}
          >
            <span className="flex items-center gap-2 justify-center">Join Now <ArrowUpRightIcon size={15} /></span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
