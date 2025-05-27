"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { authUrl, cn } from "@/lib/utils";
import ProfileModal from "@/components/custom/modals/ProfileModal";

import AddressButton from "@/components/custom/AddressButton";

import useAuth from "@/hooks/use-auth";
import UserProfileButton from "./UserProfileBtn";
import useMobileMenu from "@/hooks/use-mobile-menu";
import { useState } from "react";
import NavLinks from "./NavLinks";

function Navbar() {
  const { userToken, userProfile, isLoading, logout } = useAuth();
  const { menuIsOpen, toggleMenu, closeMenu } = useMobileMenu();
  const [profileIsOpen, setProfileIsOpen] = useState<boolean>(false);

  const toggleProfile = () => {
    setProfileIsOpen(!profileIsOpen);
    closeMenu();
  };

  return (
    <div className="navbar bg-black text-white md:px-[4%] px-4 py-5 h-[88px] flex justify-between gap-8 items-center w-full sticky top-0 z-[999]">
      <Link href={"/"} className="logo" onClick={closeMenu}>
        <Image src="/images/logo.svg" alt="MetaDawgs" width={150} height={35} />
      </Link>

      {/* Desktop Navigation */}
      <NavLinks closeMenu={closeMenu} />

      {/* Desktop Auth Buttons */}
      <div className="others md:flex hidden gap-4 items-center">
        {!userToken ? (
          <Link className="block w-fit" href={authUrl}>
            <Button
              className="bg-white text-black rounded-full px-6! py-6! cursor-pointer hover:bg-white/80!"
              onClick={() => {
                closeMenu();
                // login();
              }}
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
              <span>Sign In With X</span>
            </Button>
          </Link>
        ) : (
          <UserProfileButton
            profile={userProfile}
            isLoading={isLoading}
            profileIsOpen={profileIsOpen}
            toggleProfile={toggleProfile}
          />
        )}
        <AddressButton />
      </div>

      {/* Mobile Menu Toggle */}
      <div className="xl:hidden flex gap-2 items-center">
        <button className="p-2 xl:hidden cursor-pointer" onClick={toggleMenu}>
          {menuIsOpen ? <XIcon size={32} /> : <MenuIcon size={32} />}
        </button>

        {!!userToken && (
          <UserProfileButton
            profile={userProfile}
            isLoading={isLoading}
            profileIsOpen={profileIsOpen}
            toggleProfile={toggleProfile}
            isMobile={true}
          />
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-[88px] left-0 xl:hidden transition-all z-[990] w-svw max-h-dch overflow-auto flex justify-center items-center flex-col",
          menuIsOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 invisible"
        )}
      >
        <NavLinks isMobile={true} closeMenu={closeMenu} />

        <div className="others md:hidden flex flex-col gap-3 mt-2 w-fit">
          {!userToken && (
            <Link className="block w-fit" href={authUrl}>
              <Button
                className="bg-white text-black rounded-full px-6! py-6! cursor-pointer hover:bg-white/80!"
                onClick={() => {
                  closeMenu();
                  // login();
                }}
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
                <span>Sign In With X</span>
              </Button>
            </Link>
          )}
          <AddressButton />
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        open={profileIsOpen}
        onClose={() => setProfileIsOpen(false)}
        logout={logout}
      />
    </div>
  );
}

export default Navbar;
