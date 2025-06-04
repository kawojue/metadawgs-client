"use client";

import { ChevronDown, ChevronUp, Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { ProfileType } from "@/lib/type";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/use-auth";

function UserProfileButton({
  profile,
  isLoading,
  profileIsOpen,
  toggleProfile,
  isMobile = false,
  ignoreModalSetup = false,
  className,
  activeClassName,
  showLogout,
}: {
  profile: ProfileType | null;
  isLoading: boolean;
  profileIsOpen?: boolean;
  toggleProfile?: () => void;
  isMobile?: boolean;
  ignoreModalSetup?: boolean;
  className?: string;
  activeClassName?: string;
  showLogout?: boolean;
}) {
  const { logout } = useAuth();

  if (isLoading) {
    return (
      <div className={isMobile ? "p-2" : "px-2"}>
        <Loader className="animate-spin" size={isMobile ? 24 : 32} />
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        isMobile && !ignoreModalSetup
          ? "p-2 md:hidden cursor-pointer"
          : "bg-transparent text-white border rounded-full px-2! py-6! cursor-pointer hover:opacity-80 items-center",
        className,
        activeClassName
      )}
      onClick={!showLogout ? toggleProfile : logout}
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

      {!isMobile && !ignoreModalSetup && (
        <>
          <span className="text-sm line-clamp-1">{profile?.user.username}</span>
          {!profileIsOpen && <ChevronDown size={10} />}
          {profileIsOpen && <ChevronUp size={10} />}
        </>
      )}

      {ignoreModalSetup && (
        <>
          <span className="text-xs max-w-16 sm:max-w-20 truncate">{profile?.user.username}</span>
        </>
      )}

      {showLogout && (
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path
            d="M7.00004 13.6666C3.31814 13.6666 0.333374 10.6818 0.333374 6.99992C0.333374 3.31802 3.31814 0.333252 7.00004 0.333252C9.18091 0.333252 11.1172 1.38044 12.3335 2.99941L10.5273 2.99946C9.58718 2.16991 8.35238 1.66659 7.00004 1.66659C4.05452 1.66659 1.66671 4.0544 1.66671 6.99992C1.66671 9.94545 4.05452 12.3333 7.00004 12.3333C8.35271 12.3333 9.58778 11.8297 10.528 10.9998H12.334C11.1177 12.6191 9.18118 13.6666 7.00004 13.6666ZM11.6667 9.66658V7.66658H6.33338V6.33325H11.6667V4.33325L15 6.99992L11.6667 9.66658Z"
            fill="#FF0000"
          />
        </svg>
      )}
    </Button>
  );
}

export default UserProfileButton;
