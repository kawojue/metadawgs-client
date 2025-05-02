"use client";

import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import { ReactNode } from "react";
import Veil from "./Veil";
import { usePathname } from "next/navigation";
import { SignupAlert } from "@/components/custom/modals/SignupAlert";
import useLocalStorage from "use-local-storage";
import { XOpenSignUpModal } from "@/lib/values";
import { cn } from "@/lib/utils";

const IGNORED_ROUTE_PATTERNS = [/^\/auth/, /^\/admin(\/.*)?$/];

function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [openSignup, setOpenSignup] = useLocalStorage(XOpenSignUpModal, false);

  const isIgnoredRoute = IGNORED_ROUTE_PATTERNS.some((regex) =>
    regex.test(pathname!)
  );

  return (
    <div className="font-sans">
      {!isIgnoredRoute && <Navbar />}
      <div
        className={cn(
          "content min-h-dch",
          !isIgnoredRoute && "bg-black text-white"
        )}
      >
        {children}
      </div>
      {openSignup && (
        <SignupAlert open={openSignup} onClose={() => setOpenSignup(false)} />
      )}
      {!isIgnoredRoute && <Footer />}
      <Veil />
    </div>
  );
}

export default MainLayout;
