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
import { copyToClipboard } from "@/lib/common";
import { TelegramIcon, TwitterIcon } from "@/lib/icons";
import { ProfileType } from "@/lib/type";
import { XUserProfile } from "@/lib/values";
import { ArrowUpRightIcon, CircleX, CopyIcon } from "lucide-react";
import useLocalStorage from "use-local-storage";

function ProfileModal({
  open,
  onClose,
  logout,
}: {
  open: boolean;
  onClose: () => void;
  logout: () => void;
}) {
  const [userProfile] = useLocalStorage<ProfileType | null>(XUserProfile, null);
  return (
    <Dialog
      open={open}
      onOpenChange={(x) => {
        if (!x) {
          onClose();
        }
      }}
    >
      <DialogContent
        className="sm:max-w-[456px] bg-black text-white shadow-sm border  border-white/20"
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
        <div className="grid gap-5 py-4">
          <div className="profile flex flex-col gap-2 items-center justify-center">
            <Avatar className="w-20 h-20 min-w-20 min-h-20">
              <AvatarImage src={userProfile?.user.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500"></AvatarFallback>
            </Avatar>
            <p className="text-sm text-[#ACACAC]">
              {userProfile?.user.username}
            </p>
            <div className="flex gap-3 items-center">
              <span className="text-[#ACACAC] text-sm">Referral Code:</span>
              <Button
                className="bg-[#A078FF] p-1.5 px-2.5 rounded-full cursor-pointer"
                onClick={() => copyToClipboard(userProfile?.referralCode ?? "")}
              >
                {userProfile?.referralCode} <CopyIcon />
              </Button>
            </div>
          </div>
          <div className="stats grid grid-cols-3 gap-3">
            <div className="grid gap-1 col-span-1 text-center bg-[#FFBE00] text-black rounded-xl p-4 py-2 shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)]">
              <span className="font-semibold text-xl">0</span>
              <span className="text-xs">Tasks Completed</span>
            </div>
            <div className="grid gap-1 col-span-1 text-center bg-[#FFBE00] text-black rounded-xl p-4 py-2 shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)]">
              <span className="font-semibold text-xl">0</span>
              <span className="text-xs">Overall Points</span>
            </div>
            <div className="grid gap-1 col-span-1 text-center bg-[#FFBE00] text-black rounded-xl p-4 py-2 shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)]">
              <span className="font-semibold text-xl">0</span>
              <span className="text-xs">Rank Number</span>
            </div>
          </div>
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

              <a href="" className="block">
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

              <a href="" className="block">
                <Button className="verify bg-[#FFBE00] text-black text-sm rounded-full sm:px-5! py-[16px] cursor-pointer hover:bg-[#FFBE00]/80!">
                  <span className="sm:block hidden">Join</span>
                  <ArrowUpRightIcon size={10} />
                </Button>
              </a>
            </div>
          </div>
        </div>
        <DialogFooter className="">
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
  );
}

export default ProfileModal;
