"use client";

import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import { ReactNode } from "react";
import Veil from "./Veil";
import { usePathname } from "next/navigation";

const IGNORED_ROUTE_PATTERNS = [/^\/auth/, /^\/admin(\/.*)?$/];

function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isIgnoredRoute = IGNORED_ROUTE_PATTERNS.some((regex) =>
    regex.test(pathname!)
  );

  return (
    <div>
      {!isIgnoredRoute && <Navbar />}
      <div className="content min-h-dch">{children}</div>
      {!isIgnoredRoute && <Footer />}
      <Veil />
    </div>
  );
}

export default MainLayout;
