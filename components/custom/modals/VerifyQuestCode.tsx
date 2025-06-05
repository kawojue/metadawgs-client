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
import { SubmitEntryAlert } from "@/components/custom/modals/SubmitEntryAlert";
import { QuestErrorAlert } from "./QuestErrorAlert";
import { XUserToken } from "@/lib/values";
import useAuth from "@/hooks/use-auth";
import Image from "next/image";

function VerifyQuestCode({
  open,
  onClose,
  post_id,
}: {
  open: boolean;
  post_id: number;
  onClose?: () => void;
}) {
  const { logout } = useAuth();
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isRobo, setIsRobo] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function submitEntry() {
    const token = localStorage.getItem(XUserToken);
    if (!token) return;

    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${post_id}/appliy-code`,
      {
        method: "POST",
        body: JSON.stringify({
          code: code,
        }),
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      if (res.status !== 401) {
        const { message } = await res.json();
        setIsRobo(![409, 429].includes(res.status));
        setError(message);
        setLoading(false);
      } else {
        logout();
        setLoading(false);
        onClose?.();
      }

      return;
    }

    setSuccess(true);
    setCode("");
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
            className="sm:max-w-[456px] bg-black text-white shadow-sm border  border-white/20 rounded-2xl"
            showCloseButton={false}
          >
            <DialogHeader className="flex flex-col justify-between gap-4 items-center">
              <div className="circle bg-white rounded-full p-2.5 mb-1">
                <Image
                  src={"/images/man-avatar.png"}
                  alt="man"
                  width={100}
                  height={100}
                />
              </div>
              <DialogTitle className="font-fredoka text-2xl text-center">
                Special Quest Code
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-5 py-4 content">
              <div className="row flex flex-col gap-2">
                <label htmlFor="link" className="text-sm">
                  Input Code
                </label>
                <input
                  type="text"
                  placeholder="Enter code"
                  value={code}
                  onChange={(x) => setCode(x.target.value)}
                  className="h-12 rounded-full w-full p-4 border border-[#9C9C9C] bg-white/10"
                />
                {/* {!!error && (
                  <p className="error text-red-500 text-sm">{error}</p>
                )} */}
              </div>
            </div>
            <DialogFooter className="w-full flex flex-col sm:flex-col gap-4 sm:justify-start">
              <Button
                type="button"
                className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
                disabled={!!error || !code || loading}
                onClick={submitEntry}
              >
                {!loading ? "Validate" : "Validating"}
              </Button>
              <Button
                type="button"
                className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black disabled:cursor-not-allowed!"
                onClick={() => {
                  onClose?.();
                }}
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {!!error && (
        <QuestErrorAlert
          open={!!error}
          isRobo={isRobo}
          error={error}
          onClose={() => {
            setError(null);
          }}
        />
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

export default VerifyQuestCode;
