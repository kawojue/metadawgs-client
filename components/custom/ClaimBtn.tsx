"use client";

import { Button } from "../ui/button";
import ClaimAllocationModal from "./modals/ClaimAllocationModal";
import { useState } from "react";

export default function Claim() {
  const [open, setOpen] = useState(false);

  function launchBot() {
    setOpen(true);
  }

  return (
    <>
      <Button
        className="rounded-full px-7! font-medium !py-6 bg-[#FFBE00] text-black"
        onClick={launchBot}
      >
        Claim Dawgs
      </Button>
      <ClaimAllocationModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
