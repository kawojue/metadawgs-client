"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TelegramIcon2 } from "@/lib/icons";
// import { postWithAuth } from "@/lib/api";
// import { generateRandomString } from "@/lib/common";
// import { XRefreshTable } from "@/lib/values";
import { Collabs } from "@/lib/type";
import { Dot, LinkIcon, Twitter } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
// import useLocalStorage from "use-local-storage";
// import { toast } from "sonner";

interface CollabsRequestModalProps {
  open: boolean;
  onClose?: () => void;
  data: Collabs;
}

// type ActionType = "APPROVE" | "REJECT";

function CollabsRequestModal({
  open,
  onClose,
  data,
}: CollabsRequestModalProps) {
  //   const [loading, setLoading] = useState<boolean>(false);k
  //   const [, setRefreshTable] = useLocalStorage<string>(XRefreshTable, "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setError(null);
    }
  }, [open]);

  //   const handleAction = async (action: ActionType) => {
  //     if (loading) return;

  //     try {
  //       setLoading(true);
  //       setError(null);

  //       await postWithAuth(
  //         `/user/toggle-submission`,
  //         {
  //           action,
  //           userId: data.id,
  //         },
  //         {
  //           isAdmin: true,
  //         }
  //       );

  //       toast.success(
  //         action === "APPROVE"
  //           ? "Creator request approved successfully"
  //           : "Creator request rejected successfully"
  //       );

  //       onClose?.();
  //       setRefreshTable(generateRandomString(10));
  //     } catch (error: unknown) {
  //       const errorMessage =
  //         error instanceof Error ? error.message : "An unexpected error occurred";

  //       setError(errorMessage);
  //       toast.error(errorMessage);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const onApprove = () => handleAction("APPROVE");
  //   const onReject = () => handleAction("REJECT");

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
              priority
            />
          </div>

          <DialogTitle className="font-semibold text-xl text-center text-black">
            {data.telegramHandle}
          </DialogTitle>
          <div className="flex gap-2 items-center flex-wrap justify-center">
            <div className="flex gap-2 items-center">
              <Twitter color="black" />
              <a
                href={`https://x.com/${data.user.username}`}
                className="block text-[#0000FF] underline hover:text-[#0000FF]/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                @{data.user.username}
              </a>
            </div>

            <Dot />
            <div className="flex gap-2 items-center">
              <TelegramIcon2 />
              <a
                href={`https://t.me/${data.telegramHandle}`}
                className="block text-[#0000FF] underline hover:text-[#0000FF]/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                @{data.telegramHandle}
              </a>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-4 py-4 content">
          <div className="row flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Tell Us About Yourself
            </label>
            <div className="bg-gray-50 rounded-lg p-4 min-h-24 border max-h-26 overflow-y-auto scroll">
              <p className="text-sm text-gray-800 leading-relaxed">
                {data.answer}
              </p>
            </div>
          </div>

          <div className="row flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Submit a link to your social or any relevant link (Optional)
            </label>
            <a
              href={`${data.otherUrl}`}
              className="text-[#0000FF] underline hover:text-[#0000FF]/80 transition-colors flex gap-2 items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon size={16}/> {data.otherUrl}
            </a>
          </div>

          {!!error && (
            <p className="error text-red-500 text-sm bg-red-50 p-2 rounded-md">
              {error}
            </p>
          )}
        </div>

        <DialogFooter className="w-full flex flex-row gap-3 sm:justify-center">
          {/* <Button
            type="button"
            className="flex-1 py-5! rounded-full cursor-pointer bg-green-500 hover:bg-green-600 text-black font-medium disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            disabled={loading}
            onClick={onApprove}
          >
            {loading ? "Processing..." : "Approve"}
          </Button>

          <Button
            type="button"
            className="flex-1 py-5! rounded-full cursor-pointer bg-red-500 hover:bg-red-600 text-white font-medium disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            disabled={loading}
            onClick={onReject}
          >
            {loading ? "Processing..." : "Reject"}
          </Button> */}

          <Button
            type="button"
            className="flex-1 py-6! rounded-full cursor-pointer bg-black hover:bg-black hover:opacity-80 text-white font-medium disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            onClick={() => onClose?.()}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CollabsRequestModal;
