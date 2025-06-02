"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { postWithAuth } from "@/lib/api";
import {
  copyToClipboard,
  formatNumberWithCommas,
  getTimeRemaining,
  hashAddress,
} from "@/lib/common";
import {
  LogOutIcon,
  TelegramIcon,
  TwitterIcon,
  VerificationBadge,
  YoutubeIcon,
} from "@/lib/icons";
import { ProfileType } from "@/lib/type";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, BookAIcon, CircleX, CopyIcon } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { SubmitReferralAlert } from "./SubmitReferralAlert";
import useAuth from "@/hooks/use-auth";
import siteConfig from "@/lib/siteConfig";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";

function ProfileSidebar({
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

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

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

  // Stats configuration
  const statsConfig = [
    {
      value: formatNumberWithCommas(Number(userProfile?.user.tasks)) || 0,
      label: "Tasks Completed",
    },
    {
      value:
        Number(userProfile?.user.totalPoints)?.toLocaleString("en-US", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }) || 0,
      label: "Overall Bones",
    },
    {
      value: userProfile?.rank || "NIL",
      label: "Rank Number",
    },
  ];

  // Social links configuration
  const socialLinks = [
    {
      icon: <TwitterIcon />,
      label: "Follow On Twitter",
      buttonText: "Follow",
      href: siteConfig.socialLinks.twitter,
    },
    {
      icon: <TelegramIcon />,
      label: "Join Telegram",
      buttonText: "Join",
      href: siteConfig.socialLinks.telegram,
    },
    {
      icon: <YoutubeIcon />,
      label: "Subscribe on Youtube",
      buttonText: "Subscribe",
      href: siteConfig.socialLinks.youtube,
    },
    {
      icon: <BookAIcon size={24} />,
      label: "A guide to metadawgs",
      buttonText: "Read",
      href: siteConfig.socialLinks.roadmap,
    },
  ];

  const shouldShowReferralCode =
    userProfile?.eligibleToUseReferralCode &&
    !getTimeRemaining(userProfile?.user?.joinedAt || "").hasPassed;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full z-[100000] transition-transform duration-300 ease-in-out w-full md:w-[480px] lg:w-[520px]",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-full bg-black text-white md:mt-0 mt-4 md:mb-0 mb-4 flex flex-col">
          {/* Header */}
          <div className="flex flex-row justify-between gap-4 items-center p-6 pb-4 border-b border-white/10">
            <h2 className="font-fredoka text-2xl font-semibold">Profile</h2>
            <button
              className="cursor-pointer p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={onClose}
            >
              <CircleX size={18} />
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Profile Section */}
            <div className="profile flex flex-col gap-4 items-center justify-center">
              <Avatar className="w-20 h-20 min-w-20 min-h-20">
                <AvatarImage src={userProfile?.user?.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500"></AvatarFallback>
              </Avatar>
              <div className="div flex gap-2 items-center">
                <p className="text-sm text-[#ACACAC]">
                  {`@${userProfile?.user.username}`}
                </p>
                {userProfile?.user?.verified && <VerificationBadge />}
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-[#ACACAC] text-sm font-medium">
                  Referral Link:
                </span>
                <Button
                  className="bg-[#A078FF] p-1.5 px-2.5 rounded-full cursor-pointer text-sm hover:bg-[#A078FF]/80 flex items-center gap-2"
                  onClick={() => {
                    copyToClipboard(
                      `https://socialfi.metadawgs.com/auth/x?ref=${userProfile?.referralCode}`
                    );
                    toast("Referral link is saved to the clipboard");
                  }}
                >
                  <span className="pt-1.5">
                    {hashAddress(
                      `https://socialfi.metadawgs.com/auth/x?ref=${userProfile?.referralCode}`,
                      10
                    )}
                  </span>
                  <CopyIcon />
                </Button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="stats grid grid-cols-3 gap-3">
              {statsConfig.map((stat, index) => (
                <div
                  key={index}
                  className="grid gap-1 col-span-1 text-center bg-[#FFBE00] text-black rounded-xl p-3 py-4 shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)]"
                >
                  <span className="font-semibold text-lg">{stat.value}</span>
                  <span className="text-xs">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Referral Code Section */}
            {shouldShowReferralCode && (
              <form
                onSubmit={submitReferralCode}
                className="space-y-4"
                onInput={() => {
                  setError("");
                }}
              >
                <div className="row flex flex-col gap-3">
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
                    className="h-12 rounded-full w-full p-4 border border-[#9C9C9C] bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFBE00] focus:border-transparent"
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
                    <p className="error text-red-500 text-sm">{error}</p>
                  )}

                  <div className="grid gap-3 grid-cols-2">
                    <div className="col-span-1">
                      <Button
                        type="button"
                        className="w-full text-black bg-white text-sm rounded-full px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
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
                        className={cn(
                          "w-full bg-[#FFBE00] text-black text-sm rounded-full px-4 py-3 cursor-pointer hover:bg-[#FFBE00]/80 transition-colors",
                          (!!error || !code || loading) && "opacity-50"
                        )}
                        disabled={!!error || !code || loading}
                      >
                        {!loading ? "Validate" : "Validating"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* Wallet Section */}
            {!!currentWallet && (
              <div className="wallet-approval-section space-y-4">
                <div className="w-full flex flex-col gap-3">
                  <label className="text-sm text-[#ACACAC] font-semibold">
                    Linked Wallet Address
                  </label>
                  <div className="flex justify-between items-center gap-4 w-full bg-white/10 p-3 rounded-lg border border-[#9C9C9C]">
                    <p className="text-sm text-white break-all flex-1">
                      {hashAddress(currentWallet, 8)}
                    </p>
                    <Button
                      className={cn(
                        "verify bg-[#FFBE00] text-black text-sm rounded-full px-4 py-2 cursor-pointer hover:bg-[#FFBE00]/80 transition-colors flex-shrink-0",
                        (syncAddressing ||
                          !currentWallet ||
                          userProfile?.user?.approved) &&
                          "opacity-50"
                      )}
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

            {/* Social Links Section */}
            <div className="links grid gap-3">
              {socialLinks.map((link, index) => (
                <div
                  key={index}
                  className="link rounded-full h-16 w-full flex text-white justify-between items-center gap-4 p-4 px-5 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg2.png')] after:bg-black/60 after:bg-blend-darken after:bg-no-repeat after:bg-center after:bg-cover z-10"
                >
                  <div className="flex gap-4 items-center flex-1">
                    <div className="app-icon text-white">{link.icon}</div>
                    <p className="info text-[16px] text-start">{link.label}</p>
                  </div>

                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-auto"
                  >
                    <Button className="verify bg-[#FFBE00] text-black text-sm rounded-full px-4! py-2 cursor-pointer hover:bg-[#FFBE00]/80 transition-colors flex items-center gap-1">
                      <span className="pt-1">{link.buttonText}</span>
                      <ArrowUpRightIcon size={12} />
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-4 border-t border-white/10">
            <Button
              type="button"
              className="w-full bg-transparent py-3 h-14 rounded-full cursor-pointer border border-white/20 hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              onClick={() => {
                logout();
                onClose();
              }}
            >
              <span className="pt-1">Log Out</span>
              <LogOutIcon />
            </Button>
          </div>
        </div>
      </div>

      {success && (
        <SubmitReferralAlert
          open={success}
          onClose={() => {
            setSuccess(false);
          }}
        />
      )}
    </>
  );
}

export default ProfileSidebar;
