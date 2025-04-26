'use client'

// import { AdminProfileType } from "@/lib/type";
import { XAdminToken } from "@/lib/values";
import LoginPage from "@/views/AdminLoginPage";
import { Loader } from "lucide-react";

import { ReactNode, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

const Template = ({children}:{children: ReactNode}) => {
  const [adminToken] = useLocalStorage<string | null>(XAdminToken, null);
  // const [adminProfile, setAdminProfile] =
  //   useLocalStorage<AdminProfileType | null>(XAdminProfile, null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function validateAdminToken() {
      try {
        setIsLoading(true);
        // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        // const response = await fetch(`${apiUrl}/admin/auth/profile`, {
        //   method: "GET",
        //   headers: {
        //     Authorization: `Bearer ${adminToken}`,
        //   },
        // });
        // const data = await response.json();
        // if (!response.ok) {
        //   throw new Error("Something unexpected occurred");
        // }
        // setAdminProfile({ token: adminToken });
      } catch (error) {
        console.error("Profile error:", error);
        // setAdminProfile(null);
      } finally {
        setIsLoading(false);
      }
    }

    validateAdminToken();
  }, [adminToken]);

  if (isLoading) {
    return (
      <div className="h-svh w-full grid place-content-center place-content-items">
        <Loader size={72} color={"#FFBE00"} className="animate-spin" />
      </div>
    );
  }

  if (!isLoading && !adminToken) {
    return <LoginPage />;
  }
    return <>{children}</>;
}
 
export default Template;