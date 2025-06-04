"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { postWithAuth } from "@/lib/api";
import Image from "next/image";
import useAuth from "@/hooks/use-auth";
import { Textarea } from "@/components/ui/textarea";

function JoinCreatorsClub({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  const [about, setAbout] = useState<string>("");
  const [contribute, setContribute] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { refetchProfile } = useAuth();

  async function submitJoin() {
    setLoading(true);
    try {
      await postWithAuth("/auth/telegram/verify", {
        answer1: about,
        answer2: contribute,
      });

      await refetchProfile();
      onClose?.();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

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
        className="sm:max-w-[456px] bg-black text-white shadow-sm border border-white/20 rounded-3xl z-[999]"
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
            Join Creators
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-5 py-2 content">
          <div className="row flex flex-col gap-2">
            <label htmlFor="code" className="text-sm font-fredoka">
              Tell Us About Yourself
            </label>
            <div className="relative sm:max-w-[405px] w-full max-w-[94svw]">
              <Textarea
                className="bg-white/10 min-h-24 min-w-full"
                maxLength={100}
                value={about}
                onChange={(x) => setAbout(x.currentTarget.value)}
                onInput={() => setError(null)}
              />
              <span className="count absolute right-3 bottom-3 text-sm">
                {about.length}/100
              </span>
            </div>
          </div>
          <div className="row flex flex-col gap-2">
            <label htmlFor="code" className="text-sm font-fredoka">
              How can you contribute to the creators club on X
            </label>
            <div className="relative sm:max-w-[405px] w-full max-w-[94svw]">
              <Textarea
                className="bg-white/10 min-h-24"
                maxLength={100}
                value={contribute}
                onChange={(x) => setContribute(x.currentTarget.value)}
                onInput={() => setError(null)}
              />
              <span className="count absolute right-3 bottom-3 text-sm">
                {contribute.length}/100
              </span>
            </div>
          </div>
          {!!error && <p className="error text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter className="w-full flex flex-col sm:flex-col gap-4 sm:justify-start">
          <Button
            type="button"
            className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
            disabled={
              !!error ||
              about.length < 100 ||
              contribute.length < 100 ||
              loading
            }
            onClick={submitJoin}
          >
            {!loading ? "Submit" : "Submitting"}
          </Button>
          <Button
            type="button"
            disabled={loading}
            className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black disabled:cursor-not-allowed!"
            onClick={() => {
              setAbout("");
              setContribute("");
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

export default JoinCreatorsClub;
