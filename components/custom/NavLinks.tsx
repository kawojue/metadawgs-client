"use client";

import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function NavLinks({
  isMobile,
  closeMenu,
}: {
  isMobile?: boolean;
  closeMenu: () => void;
}) {
  const pathname = usePathname();

  type NavItem = {
    name: string;
    path: string;
    children?: {
      name: string;
      path: string;
    }[];
  };

  const navItems: NavItem[] = [
    { name: "Metadawgs Club", path: "/metadawgs-club" },
    { name: "Dawgs TGE", path: "/presale" },
    {
      name: "Leaderboard",
      path: "/leaderboard",
    },
    { name: "DawgPools", path: "/dawg-pools" },
    { name: "DawgBot", path: "/dawg-bot" },
  ];

  if (isMobile) {
    return (
      <div className="nav-links p-2">
        <ul className="flex flex-col items-center justify-center gap-2 select-none">
          {navItems.map((item) => {
            if (item.children) {
              return item.children.map((child) => (
                <li key={child.path}>
                  <Link
                    onClick={closeMenu}
                    href={child.path}
                    className={cn(
                      "block text-3xl max-[350px]:text-2xl font-fredoka hover:opacity-85 p-2 text-center uppercase font-bold",
                      pathname.startsWith(child.path) && "text-[#FFBE00]"
                    )}
                  >
                    {child.name}
                    <br />
                    {item.name}
                  </Link>
                </li>
              ));
            }

            return (
              <li key={item.path}>
                <Link
                  onClick={closeMenu}
                  href={item.path}
                  className={cn(
                    "block text-3xl max-[350px]:text-2xl font-fredoka hover:opacity-85 p-2 text-center uppercase font-bold",
                    pathname.startsWith(item.path) && "text-[#FFBE00]"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="nav-links xl:block hidden">
      <ul className="inline-flex gap-6 md:gap-8 items-center">
        {navItems.map((item) => {
          if (item.children) {
            return (
              <li key={item.path}>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={cn(
                      "text-lg capitalize hover:opacity-85 flex items-center gap-3 cursor-pointer ring-0",
                      pathname.startsWith(item.path) && "text-[#FFBE00]"
                    )}
                  >
                    {item.name} <ChevronDownIcon size={18} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-[9999] bg-black text-white border-none! shadow-sm shadow-white/20 p-2 w-[150px]">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.path}>
                        <Link
                          onClick={closeMenu}
                          href={child.path}
                          className={cn(
                            "text-lg capitalize hover:opacity-85",
                            pathname.startsWith(child.path) && "text-[#FFBE00]"
                          )}
                        >
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            );
          }

          return (
            <li key={item.path}>
              <Link
                href={item.path}
                className={cn(
                  "text-lg capitalize hover:opacity-85",
                  pathname.startsWith(item.path) && "text-[#FFBE00]"
                )}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NavLinks;
