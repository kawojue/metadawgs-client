"use client";

import { XMenuisOpen } from "@/lib/values";
import useLocalStorage from "use-local-storage";

function useMobileMenu() {
  const [menuIsOpen, setMenuIsOpen] = useLocalStorage(XMenuisOpen, false);

  return {
    menuIsOpen,
    setMenuIsOpen,
    toggleMenu: () => setMenuIsOpen((prev) => !prev),
    closeMenu: () => setMenuIsOpen(false),
  };
}

export default useMobileMenu;
