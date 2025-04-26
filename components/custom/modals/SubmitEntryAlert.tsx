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
import { XRefreshTable } from "@/lib/values";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useLocalStorage from "use-local-storage";

export function SubmitEntryAlert({
  open,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const [, setRefreshTable] = useLocalStorage(XRefreshTable, false);
  const router = useRouter();

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
          <AlertDialogTitle className="text-center font-fredoka text-3xl">
            Quest submitted!
            <br />
            Points awarded! 🎉
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center max-w-[380px] text-white text-base">
            An admin will review your entry soon to make sure everything checks
            out. If something doesn’t add up, your account could face penalties.
            So play fair, adventurer! ⚔️
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid! grid-cols-2! gap-4 mt-2">
          <AlertDialogCancel
            className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black shadow-[black]/40"
            onClick={() => {
              setRefreshTable(true);
              onClose?.();
            }}
          >
            Close
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black"
            onClick={() => {
              setRefreshTable(true);
              router.push("/quests#Posts");

              onClose?.();
            }}
          >
            See More Quests <ArrowUpRightIcon />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
