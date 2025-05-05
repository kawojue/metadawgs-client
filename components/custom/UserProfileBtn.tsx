"use client";

import { ChevronDown, ChevronUp, Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { ProfileType } from "@/lib/type";

function UserProfileButton({
  profile,
  isLoading,
  profileIsOpen,
  toggleProfile,
  isMobile = false,
}: {
  profile: ProfileType | null;
  isLoading: boolean;
  profileIsOpen: boolean;
  toggleProfile: () => void;
  isMobile?: boolean;
}) {
  if (isLoading) {
    return (
      <div className={isMobile ? "p-2" : "px-2"}>
        <Loader className="animate-spin" size={isMobile ? 24 : 32} />
      </div>
    );
  }

  return (
    <Button
      className={
        isMobile
          ? "p-2 md:hidden cursor-pointer"
          : "bg-transparent text-white border rounded-full px-2! py-6! cursor-pointer hover:opacity-80"
      }
      onClick={toggleProfile}
    >
      <Avatar
        className={
          isMobile ? "w-9 h-9 min-w-9 min-h-9" : "w-8 h-8 min-w-8 min-h-8"
        }
        suppressHydrationWarning
      >
        <AvatarImage src={profile?.user.avatar} />
        <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500"></AvatarFallback>
      </Avatar>

      {!isMobile && (
        <>
          <span className="text-sm line-clamp-1">{profile?.user.username}</span>
          {!profileIsOpen && <ChevronDown size={10} />}
          {profileIsOpen && <ChevronUp size={10} />}
        </>
      )}
    </Button>
  );
}

export default UserProfileButton;
