"use client";

import { cn } from "@/lib/utils";
import { XMenuisOpen } from "@/lib/values";
import React from "react";
import useLocalStorage from "use-local-storage";

function Veil() {
  const [menuIsOpen, setMenuIsOpen] = useLocalStorage<boolean>(
    XMenuisOpen,
    false
  );

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 bottom-0 size-full bg-black/95 transition-opacity z-[900]",
        !menuIsOpen && "opacity-0 -z-[900]",
        menuIsOpen && "opacity-100"
      )}
      onDoubleClick={() => setMenuIsOpen(false)}
    ></div>
  );
}

export default Veil;
