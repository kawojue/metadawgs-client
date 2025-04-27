"use client";

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
import useLocalStorage from "use-local-storage";
import { ProfileType } from "@/lib/type";
import { XUserProfile } from "@/lib/values";

function ReferralInputModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useLocalStorage<ProfileType | null>(
    XUserProfile,
    null
  );

  async function validateCode() {
    setLoading(true);
    try {
      await postWithAuth("/auth/referral-code", {
        code: code,
      });
      setSuccess(true);
      const user = {
        ...userProfile,
        eligibleToUseReferralCode: false,
      } as ProfileType;

      setUserProfile(user);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.toString() || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

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
            className="sm:max-w-[456px] bg-black text-white shadow-sm border  border-white/20 rounded-3xl"
            showCloseButton={false}
          >
            <DialogHeader className="flex flex-row justify-between gap-4 items-center">
              <DialogTitle className="font-fredoka text-2xl">
                Referral Code
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
                  Code
                </label>
                <input
                  type="text"
                  placeholder="Enter code"
                  value={code}
                  onChange={(x) => setCode(x.target.value)}
                  className="h-12 rounded-full w-full p-4 border border-[#9C9C9C] bg-white/10"
                />
                <p className="text-sm">
                  You need to engage the tasks before the referral reward can be
                  allocated.
                </p>
                {!!error && (
                  <p className="error text-red-500 text-sm">{error}</p>
                )}
              </div>
            </div>
            <DialogFooter className="">
              <Button
                type="button"
                className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
                disabled={!!error || !code || loading}
                onClick={validateCode}
              >
                {!loading ? "Validate" : "Validating"}
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

export default ReferralInputModal;
