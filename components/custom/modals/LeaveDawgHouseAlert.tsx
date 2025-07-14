"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { generateRandomString } from "@/lib/common";
import { XRefreshHouse, XRefreshPosts, XUserToken } from "@/lib/values";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import useLocalStorage from "use-local-storage";
import { QuestErrorAlert } from "./QuestErrorAlert";
import { useState } from "react";
import useAuth from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function LeaveDawgHouseAlert({
  open,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const { logout, refetchProfile } = useAuth();
  const [, setRefreshPosts] = useLocalStorage<string>(XRefreshPosts, "");
  const [, setRefreshHouse] = useLocalStorage<string>(XRefreshHouse, "");

  const [apiError, setApiError] = useState<string | null>(null);
  const [isRobo, setIsRobo] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function leaveDawghouse() {
    const token = localStorage.getItem(XUserToken);
    if (!token) return;

    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dawghouses/leave`,
      {
        method: "DELETE",
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
        onClose?.();
      } else {
        logout();
        onClose?.();
      }

      setLoading(false);

      return;
    }

    onClose?.();
    setLoading(false);

    refetchProfile();
    setRefreshHouse(generateRandomString(10));
    setRefreshPosts(generateRandomString(10));
  }

  return (
    <>
      <AlertDialog
        open={open}
        onOpenChange={(x) => {
          if (!x) {
            onClose?.();
          }
        }}
      >
        <AlertDialogContent className="bg-black text-white border-white/20 rounded-2xl">
          <AlertDialogHeader className="flex flex-col justify-center items-center gap-4">
            <div className="circle bg-white rounded-full p-2.5 mb-1">
              <Image
                src={"/images/cancel.svg"}
                alt="check"
                width={100}
                height={100}
              />
            </div>
            <AlertDialogTitle className="text-center font-fredoka text-3xl capitalize">
              Are you sure you want to leave?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center max-w-[380px] text-white text-base">
              {`This is an irrefutable operation and all points accumulated will be lost indefinitely smth`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="grid! grid-cols-2! gap-4 mt-2">
            <Button
              className="w-full py-6! rounded-full cursor-pointer bg-[#7c0707] text-white"
              onClick={leaveDawghouse}
              disabled={loading}
            >
              {loading ? "Leaving..." : "Leave"} Dawghouse <ArrowUpRightIcon />
            </Button>
            <AlertDialogCancel
              className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black shadow-[black]/40"
              onClick={() => {
                setRefreshPosts(generateRandomString(10));
                onClose?.();
              }}
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
    </>
  );
}
