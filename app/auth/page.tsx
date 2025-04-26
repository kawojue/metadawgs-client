"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XUserProfile, XUserToken } from "@/lib/values";
import useLocalStorage from "use-local-storage";
import { fetchWithAuth } from "@/lib/api";
import { ProfileType } from "@/lib/type";

export default function AuthHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [, setUserToken] = useLocalStorage<string>(XUserToken, "");
  const [, setUserProfile] = useLocalStorage<ProfileType | null>(
    XUserProfile,
    null
  );

  useEffect(() => {
    if (token) {
      setUserToken(token);

      async function getProfile() {
        try {
          const { data: profile } = await fetchWithAuth<ProfileType>(
            "/auth/profile"
          );
          setUserProfile(profile);
        } catch (error) {
          console.error(error);
        }
      }

      getProfile();
    }

    router.replace("/");

    if (window.opener) {
      window.close();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-4 border-[##FFBE00] border-t-transparent rounded-full animate-spin mx-auto" />
        <h1 className="text-3xl font-semibold text-white font-fredoka">
          Authenticating...
        </h1>
      </div>
    </div>
  );
}
