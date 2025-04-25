"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminProfileType } from "@/lib/type";
import { XAdminProfile, XAdminToken } from "@/lib/values";
import LoginPage from "@/views/AdminLoginPage";

import { ReactNode, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

function DashboardLayout({ children }: { children: ReactNode }) {
  const [adminToken] = useLocalStorage<string | null>(XAdminToken, null);
  const [adminProfile, setAdminProfile] =
    useLocalStorage<AdminProfileType | null>(XAdminProfile, null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function validateAdminToken() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${apiUrl}/auth/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Something unexpected occurred");
        }

        setAdminProfile(data.data);
      } catch (error) {
        console.error("Profile error:", error);
        setAdminProfile(null);
      } finally {
        setIsLoading(false);
      }
    }

    validateAdminToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken]);

  if (isLoading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  if (!isLoading && !adminProfile) {
    return <LoginPage />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex shrink-0 items-center sticky top-0 z-[999] bg-white gap-2 p-6 h-22 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 md:justify-end justify-between w-full">
            <SidebarTrigger className="md:hidden" />

            <div className="flex w-fit items-center gap-4 justify-end">
              <Button
                size={"icon"}
                className="p-5 size-14 rounded-full bg-[#F5F5F5] relative shadow-none"
              >
                <svg
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6667 12.3333H0.333374V10.9999H1.00004V6.35392C1.00004 3.02859 3.68671 0.333252 7.00004 0.333252C10.3134 0.333252 13 3.02859 13 6.35392V10.9999H13.6667V12.3333ZM2.33337 10.9999H11.6667V6.35392C11.6667 3.76525 9.57737 1.66659 7.00004 1.66659C4.42271 1.66659 2.33337 3.76525 2.33337 6.35392V10.9999ZM5.33337 12.9999H8.66671C8.66671 13.4419 8.49111 13.8659 8.17855 14.1784C7.86599 14.491 7.44207 14.6666 7.00004 14.6666C6.55801 14.6666 6.13409 14.491 5.82153 14.1784C5.50897 13.8659 5.33337 13.4419 5.33337 12.9999Z"
                    fill="black"
                  />
                </svg>

                <span className="bg-red-500 text-white size-5 rounded-full grid place-items-center place-content-center text-xs absolute right-0 top-0">
                  3
                </span>
              </Button>
              <Button
                size={"icon"}
                className="p-5 h-14 rounded-full px-4! w-fit! bg-[#F5F5F5] shadow-none"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 2.66675H14V4.00008H2V2.66675ZM2 7.33341H14V8.66675H2V7.33341ZM2 12.0001H14V13.3334H2V12.0001Z"
                    fill="black"
                  />
                </svg>

                <Avatar
                  className="w-8 h-8 min-w-8 min-h-8"
                  suppressHydrationWarning
                >
                  {/* <AvatarImage src={userProfile?.user.avatar} /> */}
                  <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500"></AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
