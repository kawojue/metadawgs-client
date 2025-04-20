"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MenuIcon, WalletIcon, XIcon } from "lucide-react";
import Link from "next/link";
import useLocalStorage from "use-local-storage";
import { XMenuisOpen } from "@/lib/values";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

function Navbar() {
  const [menuIsOpen, setMenuIsOpen] = useLocalStorage<boolean>(
    XMenuisOpen,
    false
  );

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
              className="text-lg capitalize hover:opacity-85"
            >
              quests
            </Link>
          </li>
          <li>
            <Link
              href={"/presale"}
              className="text-lg capitalize hover:opacity-85"
            >
              presale
            </Link>
          </li>
          <li>
            <Link
              href={"/leaderboard"}
              className="text-lg capitalize hover:opacity-85"
            >
              leaderboard
            </Link>
          </li>
        </ul>
      </div>
      <div className="others md:flex hidden gap-4">
        <Button className="bg-white text-black rounded-full px-6! py-6! cursor-pointer hover:bg-white/80!">
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
        <Button className="bg-[#FFBE00] text-black rounded-full px-6! py-6! cursor-pointer hover:bg-[#FFBE00]/80!">
          <WalletIcon size={12} />
          <span>Connect wallet</span>
        </Button>
      </div>
      <button
        className="p-2 xl:hidden cursor-pointer"
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        {menuIsOpen && <XIcon size={32} />}
        {!menuIsOpen && <MenuIcon size={32} />}
      </button>

      <div
        className={cn(
          "fixed top-[88px] left-0 xl:hidden transition-all z-[990] w-full h-[calc(100svh_-_88px)] flex justify-center items-center flex-col",
          !menuIsOpen && "-translate-y-full opacity-0 invisible",
          menuIsOpen && "translate-y-0 opacity-100"
        )}
      >
        <div className="nav-links">
          <ul className="flex flex-col items-center justify-center select-none">
            <li>
              <Link
                href={"/quests"}
                className="block text-4xl font-fredoka hover:opacity-85 py-6 p-4 uppercase font-bold"
              >
                quests
              </Link>
            </li>
            <li>
              <Link
                href={"/presale"}
                className="block text-4xl font-fredoka hover:opacity-85 py-6 p-4 uppercase font-bold"
              >
                presale
              </Link>
            </li>
            <li>
              <Link
                href={"/leaderboard"}
                className="block text-4xl font-fredoka hover:opacity-85 py-6 p-4 uppercase font-bold"
              >
                leaderboard
              </Link>
            </li>
          </ul>
        </div>
        <div className="others md:hidden flex flex-col gap-6 mt-4">
          <Button className="bg-white text-black rounded-full w-fit mx-auto px-6! py-6! cursor-pointer hover:bg-white/80!">
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
          <Button className="bg-[#FFBE00] text-black rounded-full w-fit mx-auto px-6! py-6! cursor-pointer hover:bg-[#FFBE00]/80!">
            <WalletIcon size={12} />
            <span>Connect wallet</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
