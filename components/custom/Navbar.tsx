"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  ChevronDownIcon,
  Loader,
  MenuIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import useLocalStorage from "use-local-storage";
import { XMenuisOpen, XUserProfile, XUserToken } from "@/lib/values";
import { authWithTwitter, cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileModal from "@/components/custom/modals/ProfileModal";
import { fetchWithAuth } from "@/lib/api";
import { ProfileType } from "@/lib/type";
import { useWallet } from "@solana/wallet-adapter-react";
import AddressButton from "@/components/custom/AddressButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function Navbar() {
  const pathname = usePathname();
  const { disconnect } = useWallet();

  const [menuIsOpen, setMenuIsOpen] = useLocalStorage<boolean>(
    XMenuisOpen,
    false
  );
  const [userToken, setUserToken] = useLocalStorage<string>(XUserToken, "");
  const [userProfile, setUserProfile] = useLocalStorage<ProfileType | null>(
    XUserProfile,
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileIsOpen, setProfileIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (menuIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuIsOpen]);

  useEffect(() => {
    async function getProfile() {
      try {
        setIsLoading(true);
        const { data: profile } = await fetchWithAuth<ProfileType>(
          "/auth/profile"
        );
        console.log("profile", profile);
        setUserProfile(profile);
      } catch (error) {
        setUserProfile(null);
        setUserToken("");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!userToken) {
      setUserProfile(null);
    } else {
      getProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  function authWithX() {
    setMenuIsOpen(false);
    authWithTwitter();
  }

  function logOut() {
    setUserProfile(null);
    setUserToken(undefined);
    disconnect();
  }

  return (
    <div className="navbar bg-black text-white md:px-[8%] px-4 py-5 h-[88px] flex justify-between gap-4 items-center w-full sticky top-0 z-[999]">
      <Link href={"/"} className="logo" onClick={() => setMenuIsOpen(false)}>
        <Image src="/images/logo.svg" alt="MetaDawgs" width={150} height={35} />
      </Link>
      <div className="nav-links xl:block hidden">
        <ul className="inline-flex gap-8 md:gap-12 items-center">
          <li>
            <Link
              href={"/quests"}
              className={cn(
                "text-lg capitalize hover:opacity-85",
                pathname.startsWith("/quests") && "text-[#FFBE00]"
              )}
            >
              quests
            </Link>
          </li>
          <li>
            <Link
              href={"/presale"}
              className={cn(
                "text-lg capitalize hover:opacity-85",
                pathname.startsWith("/presale") && "text-[#FFBE00]"
              )}
            >
              presale
            </Link>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "text-lg capitalize hover:opacity-85 flex items-center gap-1 cursor-pointer ring-0",
                  pathname.startsWith("/leaderboard") && "text-[#FFBE00]"
                )}
              >
                Leaderboard <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[9999] bg-black text-white">
                <DropdownMenuItem>
                  <Link
                    onClick={() => setMenuIsOpen(false)}
                    href={"/leaderboard/x"}
                    className={cn(
                      "text-lg capitalize hover:opacity-85",
                      pathname.startsWith("/leaderboard/x") && "text-[#FFBE00]"
                    )}
                  >
                    X (Twitter)
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    onClick={() => setMenuIsOpen(false)}
                    href={"/leaderboard/telegram"}
                    className={cn(
                      "text-lg capitalize hover:opacity-85",
                      pathname.startsWith("/leaderboard/telegram") &&
                        "text-[#FFBE00]"
                    )}
                  >
                    Telegram
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>
      <div className="others md:flex hidden gap-4">
        {!userToken && (
          <Button
            className="bg-white text-black rounded-full px-6! py-6! cursor-pointer hover:bg-white/80!"
            onClick={authWithX}
          >
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.99204 7.76733L9.1665 12H13.8332L8.5943 5.01487L12.9537 0H11.187L7.77604 3.92385L4.83317 0H0.166504L5.17374 6.67633L0.545937 12H2.31262L5.99204 7.76733ZM9.83317 10.6667L2.83317 1.33333H4.1665L11.1665 10.6667H9.83317Z"
                fill="black"
              />
            </svg>

            <span>Sign In with X</span>
          </Button>
        )}
        {!!userToken && (
          <Button
            className="bg-transparent text-white border rounded-full px-2! py-6! cursor-pointer hover:opacity-80"
            onClick={() => {
              setMenuIsOpen(false);
              setProfileIsOpen(true);
            }}
          >
            {isLoading && (
              <div className="px-2">
                <Loader className="animate-spin" size={32} />
              </div>
            )}
            {!isLoading && (
              <>
                <Avatar
                  className="w-8 h-8 min-w-8 min-h-8"
                  suppressHydrationWarning
                >
                  <AvatarImage src={userProfile?.user.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500"></AvatarFallback>
                </Avatar>
                <span className="text-sm line-clamp-1">
                  {userProfile?.user.username}
                </span>
                {!profileIsOpen && <ChevronDown size={10} />}
                {profileIsOpen && <ChevronUp size={10} />}
              </>
            )}
          </Button>
        )}

        <AddressButton />
      </div>
      <div className="xl:hidden flex gap-2 items-center">
        <button
          className="p-2 xl:hidden cursor-pointer"
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        >
          {menuIsOpen && <XIcon size={32} />}
          {!menuIsOpen && <MenuIcon size={32} />}
        </button>
        {!!userToken && (
          <button
            className="p-2 md:hidden cursor-pointer"
            onClick={() => {
              setProfileIsOpen(true);
              setMenuIsOpen(false);
            }}
          >
            {isLoading && <Loader className="animate-spin" size={24} />}

            {!isLoading && (
              <Avatar
                className="w-9 h-9 min-w-9 min-h-9"
                suppressHydrationWarning
              >
                <AvatarImage src={userProfile?.user.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500"></AvatarFallback>
              </Avatar>
            )}
          </button>
        )}
      </div>

      <div
        className={cn(
          "fixed top-[88px] left-0 xl:hidden transition-all z-[990] w-full h-dch flex justify-center items-center flex-col",
          !menuIsOpen && "-translate-y-full opacity-0 invisible",
          menuIsOpen && "translate-y-0 opacity-100"
        )}
      >
        <div className="nav-links p-2">
          <ul className="flex flex-col items-center justify-center select-none">
            <li>
              <Link
                onClick={() => setMenuIsOpen(false)}
                href={"/quests"}
                className={cn(
                  "block sm:text-4xl text-3xl max-[350px]:text-2xl font-fredoka hover:opacity-85 p-2 text-center uppercase font-bold",
                  pathname.startsWith("/quests") && "text-[#FFBE00]"
                )}
              >
                quests
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMenuIsOpen(false)}
                href={"/presale"}
                className={cn(
                  "block sm:text-4xl text-3xl max-[350px]:text-2xl font-fredoka hover:opacity-85 p-2 text-center uppercase font-bold",
                  pathname.startsWith("/presale") && "text-[#FFBE00]"
                )}
              >
                presale
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMenuIsOpen(false)}
                href={"/leaderboard/x"}
                className={cn(
                  "block sm:text-4xl text-3xl max-[350px]:text-2xl text-center font-fredoka hover:opacity-85 p-2 uppercase font-bold",
                  pathname.startsWith("/leaderboard/x") && "text-[#FFBE00]"
                )}
              >
                X (Twitter)
                <br />
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMenuIsOpen(false)}
                href={"/leaderboard/telegram"}
                className={cn(
                  "block sm:text-4xl text-3xl max-[350px]:text-2xl font-fredoka hover:opacity-85 p-2 text-center uppercase font-bold",
                  pathname.startsWith("/leaderboard/telegram") &&
                    "text-[#FFBE00]"
                )}
              >
                Telegram
                <br /> Lederboard
              </Link>
            </li>
          </ul>
        </div>
        <div className="others md:hidden flex flex-col gap-3 mt-2 w-fit">
          {!userToken && (
            <Button
              className="bg-white text-black rounded-full px-6! py-6! cursor-pointer hover:bg-white/80!"
              onClick={authWithX}
            >
              <svg
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99204 7.76733L9.1665 12H13.8332L8.5943 5.01487L12.9537 0H11.187L7.77604 3.92385L4.83317 0H0.166504L5.17374 6.67633L0.545937 12H2.31262L5.99204 7.76733ZM9.83317 10.6667L2.83317 1.33333H4.1665L11.1665 10.6667H9.83317Z"
                  fill="black"
                />
              </svg>

              <span>Sign In with X</span>
            </Button>
          )}
          <AddressButton />
        </div>
      </div>

      <ProfileModal
        open={profileIsOpen}
        onClose={() => setProfileIsOpen(false)}
        logout={logOut}
      />
    </div>
  );
}

export default Navbar;
