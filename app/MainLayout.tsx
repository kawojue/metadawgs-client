import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import { ReactNode } from "react";
import Veil from "./Veil";
import Other from "./Other";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="content min-h-dch">{children}</div>
      <Footer />
      <Veil />
      <Other />
    </div>
  );
}

export default MainLayout;
