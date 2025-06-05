"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { postWithAuth } from "@/lib/api";
import { generateRandomString } from "@/lib/common";
import { Approval } from "@/lib/type";
import { XRefreshTable } from "@/lib/values";
import Image from "next/image";
import { useState } from "react";
import useLocalStorage from "use-local-storage";

interface CreatorsRequestModalProps {
  open: boolean;
  onClose?: () => void;
  data: Approval;
}

function CreatorsRequestModal({
  open,
  onClose,
  data,
}: CreatorsRequestModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [, setRefreshTable] = useLocalStorage<string>(XRefreshTable, "");
  const [error, setError] = useState<string | null>(null);

  async function onApprove() {
    if (loading) return;

    try {
      setLoading(true);

      await postWithAuth(
        `/user/toggle-submission`,
        {
          action: "APPROVE",
          userId: data.id,
        },
        {
          isAdmin: true,
        }
      );
      onClose?.();
      setRefreshTable(generateRandomString(10));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function onReject() {
    if (loading) return;

    try {
      setLoading(true);

      await postWithAuth(
        `/user/toggle-submission`,
        {
          action: "REJECT",
          userId: data.id,
        },
        {
          isAdmin: true,
        }
      );
      onClose?.();
      setRefreshTable(generateRandomString(10));
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
        className="sm:max-w-[456px] bg-white text-black shadow-lg border border-gray-200 rounded-3xl z-[9999] overflow-auto max-h-[85svh]"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-col justify-center gap-2 items-center">
          <div className="circle bg-black rounded-full p-2.5 mb-1">
            <Image
              src={"/images/man-avatar.png"}
              alt="man"
              width={100}
              height={100}
            />
          </div>

          <DialogTitle className="font-semibold text-xl text-center text-black">
            {data.displayName}
          </DialogTitle>
          <a
            href={`https://x.com/${data.username}`}
            className="block text-[#0000FF] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @{data.username}
          </a>
        </DialogHeader>

        <div className="grid gap-4 py-4 content">
          <div className="row flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Tell Us About Yourself
            </label>
            <div className="bg-gray-50 rounded-lg p-4 min-h-24 border max-h-26 overflow-y-auto scroll">
              <p className="text-sm text-gray-800 leading-relaxed">
                {data.applicationSubmission.answer1}
              </p>
            </div>
          </div>

          <div className="row flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              How can you contribute to the creators club on X
            </label>
            <div className="bg-gray-50 rounded-lg p-4 min-h-24 border max-h-26 overflow-y-auto scroll">
              <p className="text-sm text-gray-800 leading-relaxed">
                {data.applicationSubmission.answer2}
              </p>
            </div>
          </div>

          {!!error && <p className="error text-red-500 text-sm">{error}</p>}
        </div>

        <DialogFooter className="w-full flex flex-row gap-3 sm:justify-center">
          <Button
            type="button"
            className="flex-1 py-5! rounded-full cursor-pointer bg-green-500 hover:bg-green-600 text-black font-medium disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
            onClick={onApprove}
          >
            {loading ? "Processing..." : "Approve"}
          </Button>

          <Button
            type="button"
            className="flex-1 py-5! rounded-full cursor-pointer bg-red-500 hover:bg-red-600 text-white font-medium disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
            onClick={onReject}
          >
            {loading ? "Processing..." : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreatorsRequestModal;
