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
import { postWithAuth } from "@/lib/api";
import { SubmitEntryAlert } from "@/components/custom/modals/SubmitEntryAlert";

function SubmitEntryInputModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  const [link, setLink] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function submitEntry() {
    setLoading(true);
    try {
      await postWithAuth("/posts/entry", {
        url: link,
      });
      setSuccess(true);
      setLink("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.toString() || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

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
    <>
      {!success && (
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
                {!!error && (
                  <p className="error text-red-500 text-sm">{error}</p>
                )}
              </div>
            </div>
            <DialogFooter className="">
              <Button
                type="button"
                className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
                disabled={!!error || !link || loading}
                onClick={submitEntry}
              >
                {!loading ? "Submit" : "Submitting"}
                <ArrowUpRightIcon size={11} />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {success && (
        <SubmitEntryAlert
          open={success}
          onClose={() => {
            onClose?.();
            setSuccess(false);
          }}
        />
      )}
    </>
  );
}

export default SubmitEntryInputModal;
