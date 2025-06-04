"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowUpRight } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";

function ComingSoonModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  const router = useRouter();

  return (
    <Dialog
      open={open}
      onOpenChange={(x) => {
        if (!x) {
          onClose?.();
        }
      }}
    >
      <DialogContent
        className="sm:max-w-[456px] bg-black text-white shadow-sm border  border-white/20 rounded-3xl"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-col justify-center gap-2 items-center">
          <div className="circle bg-white rounded-full p-2.5 mb-1">
            <Image
              src={"/images/man-avatar.png"}
              alt="man"
              width={100}
              height={100}
            />
          </div>
          <DialogTitle className="font-fredoka text-2xl text-center">
            Coming Soon
          </DialogTitle>
          <DialogDescription className="text-center text-white px-6">
            Our team is working hard behind the scenes to bring you an
            experience worth the wait. Stay tuned - we’re almost there.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="w-full flex flex-col sm:flex-col gap-4 sm:justify-start">
          <Button
            type="button"
            className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
            onClick={() => {
              router.push("/quests");
              onClose?.();
            }}
          >
            Join The Quests <ArrowUpRight/>
          </Button>
          <Button
            type="button"
            className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black disabled:cursor-not-allowed!"
            onClick={() => {
              onClose?.();
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ComingSoonModal;
