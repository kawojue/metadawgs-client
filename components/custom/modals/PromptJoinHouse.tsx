"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Image from "next/image";

function PromptJoinHouseModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
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
        showCloseButton={true}
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
            Join a Dawghouse
          </DialogTitle>
          <DialogDescription className="text-center text-white px-6">
            Hey there, adventurer! 🐾 <br />To be part of the creators club, you&apos;ll need to
            join or create a Dawghouse first. It&apos;s where the pack gathers,
            collaborates, and shares. <br />Claim your place then unleash your voice.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PromptJoinHouseModal;
