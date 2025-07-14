"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowUpRightIcon } from "lucide-react";
import { useState } from "react";
import { QuestErrorAlert } from "./QuestErrorAlert";
import { XRefreshHouse, XUserToken } from "@/lib/values";
import useAuth from "@/hooks/use-auth";
import Image from "next/image";
import { SuccessAlertModal } from "./CustomSuccessAlert";
import { useRouter } from "next/navigation";
import useLocalStorage from "use-local-storage";
import { generateRandomString } from "@/lib/common";
import { IDawghouse } from "@/lib/type";

function JoinDawgHouseModal({
  open,
  onClose,
  dawgHouse,
}: {
  open: boolean;
  onClose?: () => void;
  dawgHouse: IDawghouse;
}) {
  const { logout, refetchProfile } = useAuth();
  const router = useRouter();

  const [, setRefreshHouse] = useLocalStorage<string>(XRefreshHouse, "");

  const [apiError, setApiError] = useState<string | null>(null);
  const [isRobo, setIsRobo] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function joinDawghouse() {
    const token = localStorage.getItem(XUserToken);
    if (!token) return;

    setLoading(true);

    const body = { identifier: dawgHouse.identifier };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dawghouses/join`,
      {
        method: "POST",
        body: JSON.stringify(body),
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
        setApiError(message);
      } else {
        logout();
        onClose?.();
      }

      setLoading(false);

      return;
    }

    setRefreshHouse(generateRandomString(10));
    refetchProfile();
    onClose?.();
    setSuccess(true);
    setLoading(false);
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
            showCloseButton={true}
          >
            <DialogHeader className="flex flex-col justify-start gap-4 items-center">
              <div className="circle bg-white rounded-full p-2.5 mb-1 overflow-hidden">
                <Image
                  src={
                    "https://res.cloudinary.com/kawojue/image/upload/v1752273768/h69u_vn5p_220810_sjapqa.jpg"
                  }
                  alt="check"
                  width={100}
                  height={100}
                />
              </div>
              <DialogTitle className="font-fredoka text-3xl text-center">
                Join Dawghouse
              </DialogTitle>
              <DialogDescription>
                Are sure you want to join {dawgHouse.name} Dawghouse
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="">
              <Button
                type="button"
                className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
                disabled={loading}
                onClick={joinDawghouse}
              >
                {!loading ? "Join" : "Joining..."}
                <ArrowUpRightIcon size={11} />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {!!apiError && (
        <QuestErrorAlert
          open={!!apiError}
          isRobo={isRobo}
          error={apiError}
          onClose={() => {
            setApiError(null);
            onClose?.(); // Ensure parent modal state is also reset
          }}
        />
      )}
      {success && (
        <SuccessAlertModal
          open={success}
          onClose={() => setSuccess(false)}
          title="Dawghouse Joined!"
          message="Your are now in smth Dawghouse"
          onAdvance={() => router.push("/metadawgs-club/dawghouses")}
          advanceLabel="Go to Dawghouse"
        />
      )}
    </>
  );
}

export default JoinDawgHouseModal;
