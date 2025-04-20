import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import { ReactNode } from "react";
import Veil from "./Veil";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="content min-h-dch">{children}</div>
      <Footer />
      <Veil />
    </div>
  );
}

export default MainLayout;
