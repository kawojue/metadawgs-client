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
import { SubmitReferralAlert } from "@/components/custom/modals/SubmitReferralAlert";
import useLocalStorage from "use-local-storage";
import { ProfileType } from "@/lib/type";
import { XNoCode } from "@/lib/values";
import Image from "next/image";
import useAuth from "@/hooks/use-auth";

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
  const { userProfile, setUserProfile } = useAuth();
  const [, setNoCode] = useLocalStorage<boolean>(XNoCode, false);

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

  function noCode() {
    setNoCode(true);
    setTimeout(() => onClose?.(), 0);
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
            <DialogHeader className="flex flex-col justify-center gap-2 items-center">
              <div className="circle bg-white rounded-full p-2.5 mb-1">
                <Image
                  src={"/images/man-avatar.png"}
                  alt="man"
                  width={100}
                  height={100}
                />
              </div>
              <DialogTitle className="font-fredoka text-2xl">
                Referral Code
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-5 py-2 content">
              <div className="row flex flex-col gap-2">
                <label
                  htmlFor="link"
                  className="text-base font-fredoka font-semibold"
                >
                  Referral Code
                </label>
                <input
                  type="text"
                  placeholder="Enter code"
                  value={code}
                  onChange={(x) => setCode(x.target.value)}
                  className="h-12 rounded-full w-full p-4 border border-[#9C9C9C] bg-white/10"
                />
                {!!error && (
                  <p className="error text-red-500 text-sm">{error}</p>
                )}
              </div>
            </div>
            <DialogFooter className="w-full flex flex-col sm:flex-col gap-4 sm:justify-start">
              <Button
                type="button"
                className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
                disabled={!!error || !code || loading}
                onClick={validateCode}
              >
                {!loading ? "Validate" : "Validating"}
              </Button>
              <Button
                type="button"
                className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black disabled:cursor-not-allowed!"
                onClick={noCode}
              >
                I {"don't"} have code
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {success && (
        <SubmitReferralAlert
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
