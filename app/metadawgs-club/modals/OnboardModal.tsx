"use client";

import AddressButton from "@/components/custom/AddressButton";
import UserProfileButton from "@/components/custom/UserProfileBtn";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  //   DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAuth from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { TelegramIcon, TwitterIcon } from "@/lib/icons";
import { authUrl } from "@/lib/utils";
import { ArrowUpRightIcon, WalletIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import AuthTelegramModal from "./AuthTelegramModal";
import { toast } from "sonner";

function OnboardingModal({
  open,
  onClose,
  toggleOpen,
  continueOn,
  hideTheRest,
}: {
  open: boolean;
  onClose?: () => void;
  toggleOpen?: () => void;
  continueOn?: () => void;
  hideTheRest?: boolean;
}) {
  const { userProfile, isLoading } = useAuth();
  const isMobile = useIsMobile();
  const [openTelegram, setOpenTelegram] = useState(false);

  const canContinue = useMemo(
    () => !!userProfile && !!userProfile.user.walletApproved,
    [userProfile]
  );

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(x) => {
          if (!x) {
            onClose?.();
          }
        }}
      >
        <DialogContent
          className="sm:max-w-[456px] bg-black text-white shadow-sm border border-white/20 rounded-3xl"
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
              Join The Metadawgs <br />
              GrindFi Club!
            </DialogTitle>
            {/* <DialogDescription className="text-center text-white px-6">
            Please complete the onboarding process to get started.
          </DialogDescription> */}
          </DialogHeader>
          <div>
            <div className="links grid gap-4 py-2">
              {!(hideTheRest && userProfile?.user.walletApproved) && (
                <div className="link rounded-full h-16 w-full flex text-white justify-between items-center gap-4 p-4 px-5 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg2.png')] after:bg-black/60 after:bg-blend-darken after:bg-no-repeat after:bg-center after:bg-cover z-10">
                  <div className="flex gap-3 items-center flex-1">
                    <div className="app-icon text-white">
                      <WalletIcon size={24} />
                    </div>
                    <p className="info text-[16px] text-start">
                      Connect Wallet
                    </p>
                  </div>

                  <AddressButton
                    className="px-4! py-2!"
                    activeClassName="px-4! pl-2! py-5.5!"
                    label={
                      <>
                        <span className="">Connect</span>
                        <ArrowUpRightIcon size={12} />
                      </>
                    }
                    connectedLabel={
                      <>
                        <Avatar className="w-7.5 h-7.5 min-w-7.5 min-h-7.5">
                          <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500" />
                        </Avatar>
                        <span className="text-sm">Connected</span>
                      </>
                    }
                    onConnect={() => {
                      onClose?.();
                    }}
                    onConnected={() => {
                      toggleOpen?.();
                    }}
                  />
                </div>
              )}
              {!(hideTheRest && !!userProfile) && (
                <div className="link rounded-full h-16 w-full flex text-white justify-between items-center gap-4 p-4 px-5 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg2.png')] after:bg-black/60 after:bg-blend-darken after:bg-no-repeat after:bg-center after:bg-cover z-10">
                  <div className="flex gap-3 items-center flex-1">
                    <div className="app-icon text-white">
                      <TwitterIcon />
                    </div>
                    <p className="info text-[16px] text-start">
                      Connect Twitter
                    </p>
                  </div>

                  {!userProfile && (
                    <Link
                      href={authUrl}
                      onClick={() =>
                        sessionStorage.setItem("authFrom", "/metadawgs-club")
                      }
                      className="w-auto bg-[#FFBE00] text-black font-semibold shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] hover:opacity-80 text-sm rounded-full px-4! py-2 cursor-pointer hover:bg-[#FFBE00]/80 transition-colors flex items-center gap-1"
                    >
                      <span className="">Connect</span>
                      <ArrowUpRightIcon size={14} />
                    </Link>
                  )}

                  {!!userProfile && (
                    <UserProfileButton
                      activeClassName="bg-[#FFBE00] text-black border-none shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] hover:opacity-80 hover:bg-[#FFBE00] px-5 pr-6"
                      profile={userProfile}
                      isLoading={isLoading}
                      ignoreModalSetup
                      isMobile={isMobile}
                      showLogout
                    />
                  )}
                </div>
              )}
              <div className="link rounded-full h-16 w-full flex text-white justify-between items-center gap-4 p-4 px-5 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg2.png')] after:bg-black/60 after:bg-blend-darken after:bg-no-repeat after:bg-center after:bg-cover z-10">
                <div className="flex gap-3 items-center flex-1">
                  <div className="app-icon text-white">
                    <TelegramIcon />
                  </div>
                  <p className="info text-[16px] text-start">Join Telegram</p>
                </div>

                <Button
                  className="verify bg-[#FFBE00] text-black text-sm rounded-full px-4! py-2 cursor-pointer hover:bg-[#FFBE00]/80 transition-colors flex items-center gap-1"
                  onClick={() => {
                    if (!userProfile) {
                      toast("Authenticate with X to join telegram channel");
                      return;
                    }

                    setOpenTelegram(true);
                  }}
                >
                  <span className="">Join</span>
                  <ArrowUpRightIcon size={12} />
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="w-full flex flex-col sm:flex-col gap-4 sm:justify-start">
            <Button
              type="button"
              className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
              onClick={() => {
                continueOn?.();
              }}
              disabled={!canContinue}
            >
              Continue
            </Button>
            {/* <Button
            type="button"
            className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black disabled:cursor-not-allowed!"
            onClick={() => {
              onClose?.();
            }}
          >
            Close
          </Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AuthTelegramModal
        open={openTelegram}
        onClose={() => setOpenTelegram(false)}
      />
    </>
  );
}

export default OnboardingModal;
