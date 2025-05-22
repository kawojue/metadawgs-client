"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { postWithAuth } from "@/lib/api";
import {
  copyToClipboard,
  formatNumberWithCommas,
  hashAddress,
} from "@/lib/common";
import { TelegramIcon, TwitterIcon, YoutubeIcon } from "@/lib/icons";
import { ProfileType } from "@/lib/type";
import { ArrowUpRightIcon, CircleX, CopyIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { SubmitReferralAlert } from "./SubmitReferralAlert";
import useAuth from "@/hooks/use-auth";
import siteConfig from "@/lib/siteConfig";
import { useWallet } from "@solana/wallet-adapter-react";

function ProfileModal({
  open,
  onClose,
  logout,
}: {
  open: boolean;
  onClose: () => void;
  logout: () => void;
}) {
  const { userProfile, setUserProfile } = useAuth();
  const { publicKey } = useWallet();
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncAddressing, setSyncAddressing] = useState<boolean>(false);
  const [syncAddressError, setSyncAddressError] = useState<string>("");

  const currentWallet = publicKey?.toBase58();

  async function submitReferralCode(e: FormEvent) {
    e.preventDefault();

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

  async function approveWallet() {
    try {
      setSyncAddressing(true);
      await postWithAuth("/user/link-wallet", {
        walletAddress: currentWallet,
      });

      if (userProfile) {
        setUserProfile({
          ...userProfile,
          user: {
            ...userProfile.user,
            approved: true,
          },
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setSyncAddressError(error.toString() || "An unexpected error occurred");
      console.error("Failed to link wallet:", error);
    } finally {
      setSyncAddressing(false);
    }
  }

  function getTimeRemaining(joinedAt: string): {
    hours: number;
    minutes: number;
    seconds: number;
    hasPassed: boolean;
  } {
    const joinedDate = new Date(joinedAt);
    const now = new Date();
    const diff = Math.max(
      0,
      24 * 60 * 60 * 1000 - (now.getTime() - joinedDate.getTime())
    );

    const hasPassed = diff <= 0;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds, hasPassed };
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(x) => {
          if (!x) {
            onClose();
          }
        }}
      >
        <DialogContent
          className="sm:max-w-[456px]  bg-black text-white shadow-sm border  border-white/20 z-[100000] rounded-3xl"
          showCloseButton={false}
        >
          <DialogHeader className="flex flex-row justify-between gap-4 items-center">
            <DialogTitle className="font-fredoka text-2xl">Profile</DialogTitle>
            <button
              className="cursor-pointer p-1"
              id="Close"
              onClick={() => {
                onClose();
              }}
            >
              <CircleX size={18} />
              <span className="sr-only">Close</span>
            </button>
          </DialogHeader>
          <div className="grid gap-5 py-4 max-h-[calc(85svh_-_100px)] px-1 overflow-y-auto">
            <div className="profile flex flex-col gap-2 items-center justify-center">
              <Avatar className="w-20 h-20 min-w-20 min-h-20">
                <AvatarImage src={userProfile?.user.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500"></AvatarFallback>
              </Avatar>
              <div className="div flex gap-2 items-center">
                <p className="text-sm text-[#ACACAC]">
                  {userProfile?.user.username}
                </p>
                {userProfile?.user?.verified && (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.631241"
                      y="0.911133"
                      width="20.7375"
                      height="20.7375"
                      rx="10.3688"
                      fill="white"
                    />
                    <path
                      d="M9.33914 3.03301C8.17117 2.65491 6.90148 3.18083 6.34294 4.27408L5.67146 5.58839C5.59167 5.74456 5.46466 5.87156 5.3085 5.95135L3.99419 6.62283C2.90094 7.18137 2.37502 8.45107 2.75311 9.61903L3.20766 11.0232C3.26167 11.19 3.26167 11.3697 3.20766 11.5365L2.75311 12.9407C2.37502 14.1087 2.90094 15.3784 3.99419 15.9369L5.3085 16.6084C5.46466 16.6882 5.59167 16.8152 5.67146 16.9714L6.34294 18.2857C6.90148 19.3789 8.17117 19.9049 9.33914 19.5268L10.7433 19.0722C10.9101 19.0182 11.0898 19.0182 11.2566 19.0722L12.6608 19.5268C13.8288 19.9049 15.0985 19.3789 15.6571 18.2857L16.3285 16.9714C16.4083 16.8152 16.5353 16.6882 16.6915 16.6084L18.0058 15.9369C19.0991 15.3784 19.625 14.1087 19.2469 12.9407L18.7923 11.5365C18.7383 11.3697 18.7383 11.19 18.7923 11.0232L19.2469 9.61903C19.625 8.45107 19.0991 7.18137 18.0058 6.62283L16.6915 5.95135C16.5353 5.87156 16.4083 5.74456 16.3285 5.58839L15.6571 4.27408C15.0985 3.18083 13.8288 2.65491 12.6608 3.03301L11.2566 3.48756C11.0898 3.54156 10.9101 3.54156 10.7433 3.48756L9.33914 3.03301ZM6.63311 11.0776L7.81163 9.89903L10.1686 12.2561L14.8827 7.54207L16.0612 8.72058L10.1686 14.6131L6.63311 11.0776Z"
                      fill="#229EFF"
                    />
                  </svg>
                )}
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-[#ACACAC] text-sm">Referral Code:</span>
                <Button
                  className="bg-[#A078FF] p-1.5 px-2.5 rounded-full cursor-pointer"
                  onClick={() =>
                    copyToClipboard(userProfile?.referralCode ?? "")
                  }
                >
                  {userProfile?.referralCode} <CopyIcon />
                </Button>
              </div>
            </div>
            <div className="stats grid grid-cols-3 gap-3">
              <div className="grid gap-1 col-span-1 text-center bg-[#FFBE00] text-black rounded-xl sm:p-4 p-2 py-2 shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)]">
                <span className="font-semibold sm:text-xl text-lg">
                  {formatNumberWithCommas(
                    Number(userProfile?.user.tasks) || 0,
                    true
                  )}
                </span>
                <span className="text-xs">Tasks Completed</span>
              </div>
              <div className="grid gap-1 col-span-1 text-center bg-[#FFBE00] text-black rounded-xl sm:p-4 p-2 py-2 shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)]">
                <span className="font-semibold sm:text-xl text-lg">
                  {formatNumberWithCommas(
                    Number(userProfile?.user.totalPoints) || 0,
                    true
                  )}
                </span>
                <span className="text-xs">Overall Bones</span>
              </div>
              <div className="grid gap-1 col-span-1 text-center bg-[#FFBE00] text-black rounded-xl sm:p-4 p-2 py-2 shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)]">
                <span className="font-semibold sm:text-xl text-lg">
                  {userProfile?.rank || "Nil"}
                </span>
                <span className="text-xs">Rank Number</span>
              </div>
            </div>
            {userProfile?.eligibleToUseReferralCode &&
              !getTimeRemaining(userProfile?.user?.joinedAt || "")
                .hasPassed && (
                <form
                  onSubmit={submitReferralCode}
                  className="space-y-4 my-2"
                  onInput={() => {
                    setError("");
                  }}
                >
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
                    {userProfile?.user.joinedAt &&
                      (() => {
                        const { hours, minutes } = getTimeRemaining(
                          userProfile.user.joinedAt
                        );
                        return (
                          <p className="error text-white text-sm">
                            You have{" "}
                            <strong>
                              {hours} hours {minutes} mins
                            </strong>{" "}
                            to input code
                          </p>
                        );
                      })()}
                    {!!error && (
                      <p className="error text-red-500 text-sm mt-2">{error}</p>
                    )}

                    <div className="grid gap-4 grid-cols-2 mt-2">
                      <div className="col-span-1">
                        <Button
                          type="button"
                          className="w-full text-black bg-white text-sm rounded-full px-6! py-6! cursor-pointer hover:bg-[#FFBE00]/80!"
                          onClick={() => {
                            setCode("");
                            setError(null);
                            setSuccess(false);
                            onClose?.();
                          }}
                        >
                          I {"don't"} have code
                        </Button>
                      </div>
                      <div className="col-span-1">
                        <Button
                          type="submit"
                          className="w-full bg-[#FFBE00] text-black text-sm rounded-full px-6! py-6! cursor-pointer hover:bg-[#FFBE00]/80!"
                          disabled={!!error || !code || loading}
                        >
                          {!loading ? "Validate" : "Validating"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

            {!!currentWallet && (
              <div className="wallet-approval-section space-y-4 relative">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm text-[#ACACAC] font-semibold">
                    Linked Wallet Address
                  </label>
                  <div className="flex justify-between gap-x-4 w-full gap-y-2 bg-white/10 p-3 rounded-lg border border-[#9C9C9C]">
                    <p className="text-sm text-white break-words">
                      {hashAddress(currentWallet, 8)}
                    </p>
                    <Button
                      className="verify bg-[#FFBE00] max-w-fit text-black text-sm rounded-full px-4 py-2 cursor-pointer hover:bg-[#FFBE00]/80!"
                      onClick={approveWallet}
                      disabled={
                        syncAddressing ||
                        !currentWallet ||
                        userProfile?.user?.approved
                      }
                    >
                      {!userProfile?.user?.approved
                        ? syncAddressing
                          ? "Approving..."
                          : "Approve"
                        : "Approved"}
                    </Button>
                  </div>
                </div>
                {!!syncAddressError && (
                  <p className="syncAddressError text-red-500 text-sm">
                    {syncAddressError}
                  </p>
                )}
              </div>
            )}
            <div className="links grid gap-3">
              <div className="link rounded-full h-17 w-full col-span-1 flex text-white justify-between gap-5 p-4 px-5 pl-6 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg2.png')] after:bg-no-repeat after:bg-center after:bg-cover">
                <div className="lint flex gap-4 items-center">
                  <div className="app-icon max-[340px]:hidden">
                    <TwitterIcon />
                  </div>
                  <p className="info text-[16px] text-start line-clamp-2">
                    Follow On Twitter
                  </p>
                </div>

                <a
                  href={siteConfig.socialLinks.twitter}
                  className="block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="verify bg-[#FFBE00] text-black text-sm rounded-full sm:px-5! py-[16px] cursor-pointer hover:bg-[#FFBE00]/80!">
                    <span className="sm:block hidden">Follow</span>
                    <ArrowUpRightIcon size={10} />
                  </Button>
                </a>
              </div>
              <div className="link rounded-full h-17 w-full col-span-1 flex text-white justify-between gap-5 p-4 px-5 pl-6 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg2.png')] after:bg-no-repeat after:bg-center after:bg-cover">
                <div className="lint flex gap-4 items-center">
                  <div className="app-icon max-[340px]:hidden">
                    <TelegramIcon />
                  </div>
                  <p className="info text-[16px] text-start line-clamp-2">
                    Join Telegram
                  </p>
                </div>

                <a
                  href={siteConfig.socialLinks.telegram}
                  className="block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="verify bg-[#FFBE00] text-black text-sm rounded-full sm:px-5! py-[16px] cursor-pointer hover:bg-[#FFBE00]/80!">
                    <span className="sm:block hidden">Join</span>
                    <ArrowUpRightIcon size={10} />
                  </Button>
                </a>
              </div>
              <div className="link rounded-full h-17 w-full col-span-1 flex text-white justify-between gap-5 p-4 px-5 pl-6 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg2.png')] after:bg-no-repeat after:bg-center after:bg-cover">
                <div className="lint flex gap-4 items-center">
                  <div className="app-icon max-[340px]:hidden text-white">
                    <YoutubeIcon />
                  </div>
                  <p className="info text-[16px] text-start line-clamp-2">
                    Subscribe on Youtube
                  </p>
                </div>

                <a
                  href={siteConfig.socialLinks.youtube}
                  className="block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="verify bg-[#FFBE00] text-black text-sm rounded-full sm:px-5! py-[16px] cursor-pointer hover:bg-[#FFBE00]/80!">
                    <span className="sm:block hidden">Subscribe</span>
                    <ArrowUpRightIcon size={10} />
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col! w-full gap-2 sm:flex-col! sm:justify-center!">
            <Button
              type="submit"
              className="w-full bg-transparent py-6! rounded-full cursor-pointer"
              variant={"outline"}
              onClick={() => {
                logout();
                onClose();
              }}
            >
              Log Out{" "}
              <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13.6668C3.31809 13.6668 0.333328 10.682 0.333328 7.00016C0.333328 3.31826 3.31809 0.333496 7 0.333496C9.18086 0.333496 11.1171 1.38068 12.3335 2.99965L10.5273 2.9997C9.58713 2.17016 8.35233 1.66683 7 1.66683C4.05447 1.66683 1.66666 4.05464 1.66666 7.00016C1.66666 9.9457 4.05447 12.3335 7 12.3335C8.35266 12.3335 9.58773 11.8299 10.5279 11H12.3339C11.1177 12.6194 9.18113 13.6668 7 13.6668ZM11.6667 9.66683V7.66683H6.33333V6.3335H11.6667V4.3335L15 7.00016L11.6667 9.66683Z"
                  fill="white"
                />
              </svg>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {success && (
        <SubmitReferralAlert
          open={success}
          onClose={() => {
            // onClose?.();
            setSuccess(false);
          }}
        />
      )}
    </>
  );
}

export default ProfileModal;
