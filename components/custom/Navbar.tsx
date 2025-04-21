"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  MenuIcon,
  WalletIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import useLocalStorage from "use-local-storage";
import { XMenuisOpen, XUserProfile, XUserToken } from "@/lib/values";
import { authWithTwitter, cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { hashAddress } from "@/lib/common";
import ProfileModal from "@/components/custom/modals/ProfileModal";
import { fetchWithAuth } from "@/lib/api";
import { ProfileType } from "@/lib/type";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { SignupAlert } from "./modals/SignupAlert";

function Navbar() {
  const pathname = usePathname();
  const { publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const [menuIsOpen, setMenuIsOpen] = useLocalStorage<boolean>(
    XMenuisOpen,
    false
  );
  const [userToken, setUserToken] = useLocalStorage<string>(XUserToken, "");
  const [userProfile, setUserProfile] = useLocalStorage<ProfileType | null>(
    XUserProfile,
    null
  );
  const [profileIsOpen, setProfileIsOpen] = useState<boolean>(false);
  const [openSignUpAlert, setOpenSignUpAlert] = useState<boolean>(false);

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
    if (!userToken) {
      return;
    }

    async function getProfile() {
      try {
        const { data: profile } = await fetchWithAuth<ProfileType>(
          "/auth/profile"
        );
        console.log("profile", profile);
        setUserProfile(profile);
      } catch (error) {
        console.error(error);
      }
    }

    getProfile();
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

  function connectWallet() {
    if (!userToken) {
      setOpenSignUpAlert(true);

      return;
    }

    setVisible(true);
  }

  function disconnectWallet() {
    disconnect();
  }

  return (
    <div className="navbar bg-black text-white md:px-[8%] px-4 py-5 flex justify-between gap-4 items-center w-full sticky top-0 z-[999]">
      <Link href={"/"} className="logo">
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
            <Link
              href={"/leaderboard"}
              className={cn(
                "text-lg capitalize hover:opacity-85",
                pathname.startsWith("/leaderboard") && "text-[#FFBE00]"
              )}
            >
              leaderboard
            </Link>
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
            onClick={() => setProfileIsOpen(true)}
          >
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
          </Button>
        )}

        {!publicKey && (
          <Button
            className="bg-[#FFBE00] text-black rounded-full px-6! py-6! cursor-pointer hover:bg-[#FFBE00]/80!"
            onClick={connectWallet}
          >
            <WalletIcon size={12} />
            <span>Connect wallet</span>
          </Button>
        )}

        {publicKey && (
          <Button
            className="bg-[#FFBE00] text-black rounded-full px-3! pl-2! py-6! cursor-pointer hover:bg-[#FFBE00]/80!"
            onClick={disconnectWallet}
          >
            <Avatar
              className="w-9 h-9 min-w-9 min-h-9"
              suppressHydrationWarning
            >
              <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500"></AvatarFallback>
            </Avatar>
            <span>{hashAddress(publicKey.toBase58())}</span>
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.00004 13.6666C3.31814 13.6666 0.333374 10.6818 0.333374 6.99992C0.333374 3.31802 3.31814 0.333252 7.00004 0.333252C9.18091 0.333252 11.1172 1.38044 12.3335 2.99941L10.5273 2.99946C9.58718 2.16991 8.35238 1.66659 7.00004 1.66659C4.05452 1.66659 1.66671 4.0544 1.66671 6.99992C1.66671 9.94545 4.05452 12.3333 7.00004 12.3333C8.35271 12.3333 9.58778 11.8297 10.528 10.9998H12.334C11.1177 12.6191 9.18118 13.6666 7.00004 13.6666ZM11.6667 9.66658V7.66658H6.33338V6.33325H11.6667V4.33325L15 6.99992L11.6667 9.66658Z"
                fill="#FF0000"
              />
            </svg>
          </Button>
        )}
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
            }}
          >
            <Avatar
              className="w-9 h-9 min-w-9 min-h-9"
              suppressHydrationWarning
            >
              <AvatarImage src={userProfile?.user.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500"></AvatarFallback>
            </Avatar>
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
        <div className="nav-links">
          <ul className="flex flex-col items-center justify-center select-none">
            <li>
              <Link
                onClick={() => setMenuIsOpen(false)}
                href={"/quests"}
                className={cn(
                  "block sm:text-4xl text-3xl font-fredoka hover:opacity-85 py-6 p-4 uppercase font-bold",
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
                  "block sm:text-4xl text-3xl font-fredoka hover:opacity-85 py-6 p-4 uppercase font-bold",
                  pathname.startsWith("/presale") && "text-[#FFBE00]"
                )}
              >
                presale
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMenuIsOpen(false)}
                href={"/leaderboard"}
                className={cn(
                  "block sm:text-4xl text-3xl font-fredoka hover:opacity-85 py-6 p-4 uppercase font-bold",
                  pathname.startsWith("/leaderboard") && "text-[#FFBE00]"
                )}
              >
                leaderboard
              </Link>
            </li>
          </ul>
        </div>
        <div className="others md:hidden flex flex-col gap-6 mt-4 w-fit">
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
          {!publicKey && (
            <Button
              className="bg-[#FFBE00] text-black rounded-full px-6! py-6! cursor-pointer hover:bg-[#FFBE00]/80!"
              onClick={connectWallet}
            >
              <WalletIcon size={12} />
              <span>Connect wallet</span>
            </Button>
          )}
          {!!publicKey && (
            <Button
              className="bg-[#FFBE00] text-black rounded-full px-3! py-6! cursor-pointer hover:bg-[#FFBE00]/80!"
              onClick={disconnectWallet}
            >
              <Avatar className="w-8 h-8 min-w-8 min-h-8">
                <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500"></AvatarFallback>
              </Avatar>
              <span>{hashAddress(publicKey.toBase58())}</span>
              <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.00004 13.6666C3.31814 13.6666 0.333374 10.6818 0.333374 6.99992C0.333374 3.31802 3.31814 0.333252 7.00004 0.333252C9.18091 0.333252 11.1172 1.38044 12.3335 2.99941L10.5273 2.99946C9.58718 2.16991 8.35238 1.66659 7.00004 1.66659C4.05452 1.66659 1.66671 4.0544 1.66671 6.99992C1.66671 9.94545 4.05452 12.3333 7.00004 12.3333C8.35271 12.3333 9.58778 11.8297 10.528 10.9998H12.334C11.1177 12.6191 9.18118 13.6666 7.00004 13.6666ZM11.6667 9.66658V7.66658H6.33338V6.33325H11.6667V4.33325L15 6.99992L11.6667 9.66658Z"
                  fill="#FF0000"
                />
              </svg>
            </Button>
          )}
        </div>
      </div>

      <ProfileModal
        open={profileIsOpen}
        onClose={() => setProfileIsOpen(false)}
        logout={logOut}
      />
      <SignupAlert
        open={openSignUpAlert}
        onClose={() => setOpenSignUpAlert(false)}
      />
    </div>
  );
}

export default Navbar;
