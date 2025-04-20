"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowUpRightIcon, CircleX } from "lucide-react";
import { useState } from "react";

function SubmitEntryInputModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  const [link, setLink] = useState<string>("");

  const isValidLink = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      const isHttpOrHttps =
        parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
      const isTwitterDomain =
        parsedUrl.hostname === "x.com" || parsedUrl.hostname === "www.x.com";
      const isValidPath = /^\/\w+\/status\/\d+$/.test(parsedUrl.pathname);

      return isHttpOrHttps && isTwitterDomain && isValidPath;
    } catch {
      return false;
    }
  };

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (link.trim() === "") {
      setError(null);
    } else if (!isValidLink(link)) {
      setError("Please enter a valid tweet link.");
    } else {
      setError(null);
    }
  }, [link]);

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
        className="sm:max-w-[456px] bg-black text-white shadow-sm border  border-white/20 rounded-2xl"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row justify-between gap-4 items-center">
          <DialogTitle className="font-fredoka text-2xl">
            Submit Entry
          </DialogTitle>
          <button
            className="cursor-pointer p-1"
            id="Close"
            onClick={() => {
              onClose?.();
            }}
          >
            <CircleX size={18} />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        <div className="grid gap-5 py-4 content">
          <div className="row flex flex-col gap-2">
            <label htmlFor="link" className="text-sm">
              Link to tweet
            </label>
            <input
              type="text"
              placeholder="Enter link to tweet"
              value={link}
              onChange={(x) => setLink(x.target.value)}
              className="h-12 rounded-full w-full p-4 border border-[#9C9C9C] bg-white/10"
            />
            {!!error && <p className="error text-red-500 text-sm">{error}</p>}
          </div>
        </div>
        <DialogFooter className="">
          <Button
            type="submit"
            className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
            disabled={!!error || !link}
            onClick={() => {
              //some function
              onClose?.();
            }}
          >
            Submit
            <ArrowUpRightIcon size={11} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SubmitEntryInputModal;
