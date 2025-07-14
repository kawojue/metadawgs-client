"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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

function CreateDawgHouseModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  const { logout, userProfile, refetchProfile } = useAuth();
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [identifier, setIdentifier] = useState<string>(
    userProfile?.user.username ?? ""
  );
  const [, setRefreshHouse] = useLocalStorage<string>(XRefreshHouse, "");

  const [apiError, setApiError] = useState<string | null>(null);
  const [isRobo, setIsRobo] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function submitEntry() {
    const token = localStorage.getItem(XUserToken);
    if (!token) return;

    setLoading(true);

    const body = { name: name, identifier: identifier };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dawghouses`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      if (res.status !== 401) {
        const { message } = await res.json();
        setIsRobo(![409, 429].includes(res.status));
        setApiError(message);
        onClose?.();
      } else {
        logout();
        onClose?.();
      }

      setLoading(false);

      return;
    }

    setRefreshHouse(generateRandomString(10));
    refetchProfile();
    setSuccess(true);
    setLoading(false);
    onClose?.();
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
                Create Dawghouse
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-5 py-4 content">
              <div className="row flex flex-col gap-2">
                <label htmlFor="name" className="text-sm">
                  Name{" "}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={`Enter dawghouse name`}
                    value={name}
                    name="name"
                    maxLength={14}
                    onChange={(x) => setName(x.target.value)}
                    className="h-12 rounded-full w-full p-4 border border-[#9C9C9C] bg-white/10"
                  />

                  <span className="absolute top-1/2 right-5 -translate-y-1/2 text-xs">{name.length}/14</span>
                </div>
              </div>
              <div className="row flex flex-col gap-2">
                <label htmlFor="name" className="text-sm">
                  Identifier{" "}
                </label>
                <input
                  type="text"
                  placeholder={`Enter identifier`}
                  value={identifier}
                  name="identifier"
                  maxLength={14}
                  onChange={(x) => setIdentifier(x.target.value)}
                  className="h-12 rounded-full w-full p-4 border border-[#9C9C9C] bg-white/10"
                />
              </div>
            </div>
            <DialogFooter className="">
              <Button
                type="button"
                className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
                disabled={!name || loading}
                onClick={submitEntry}
              >
                {!loading ? "Create" : "Creating..."}
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
          title="Dawghouse Created"
          message="Your new Dawghouse is now live. You can start inviting others to join."
          onAdvance={() => router.push("/metadawgs-club/dawghouses")}
          advanceLabel="Go to Dawghouse"
        />
      )}
    </>
  );
}

export default CreateDawgHouseModal;
