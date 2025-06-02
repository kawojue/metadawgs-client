"use client";

// import { AdminProfileType } from "@/lib/type";
import { XAdminToken } from "@/lib/values";
import LoginPage from "@/views/AdminLoginPage";

import { ReactNode } from "react";
import useLocalStorage from "use-local-storage";

const Template = ({ children }: { children: ReactNode }) => {
  const [adminToken] = useLocalStorage<string | null>(XAdminToken, null);

  if (!adminToken) {
    return <LoginPage />;
  }
  return <>{children}</>;
};

export default Template;
