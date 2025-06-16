"use client";

import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import ClaimAllocationModal from "./modals/ClaimAllocationModal";
import { useState } from "react";
import Image from "next/image";

export default function Claim() {
  const [open, setOpen] = useState(false);

  function launchBot() {
    setOpen(true);
  }

  return (
    <>
      <div className="max-w-lg w-full mx-auto space-y-2 px-6 pt-4 md:pt-0">
        <h3 className="text-lg font-bold">Your Allocated Airdrop</h3>
        <div className="link rounded-full h-16 w-full flex text-white justify-between items-center gap-4 p-4 px-5 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg2.png')] after:bg-black/60 after:bg-blend-darken after:bg-no-repeat after:bg-center after:bg-cover z-10">
          <div className="flex gap-2 items-center flex-1">
            <div className="app-icon text-white rounded-full border-4">
              <Image
                width={28}
                height={28}
                alt="A"
                className="object-cover"
                src={"/images/man-icon.png"}
              />
            </div>
            <p className="info text-[16px] text-start">TBA</p>
          </div>

          <Button
            className="verify bg-[#FFBE00] text-black text-sm rounded-full px-4! py-2 cursor-pointer hover:bg-[#FFBE00]/80 transition-colors flex items-center gap-1"
            onClick={launchBot}
          >
            <span className="">Claim</span>
            <ArrowUpRightIcon size={12} />
          </Button>
        </div>
      </div>

      <ClaimAllocationModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
