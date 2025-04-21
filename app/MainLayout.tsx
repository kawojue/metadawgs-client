import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import { ReactNode } from "react";
import Veil from "./Veil";
import { headers } from "next/headers";

const IGNORED_ROUTES = ["/auth"];

async function MainLayout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const fullUrl = headersList.get("x-url") || headersList.get("referer") || "";
  const pathname = new URL(
    fullUrl,
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost"
  ).pathname;

  const isIgnoredRoute = IGNORED_ROUTES.includes(pathname);

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
