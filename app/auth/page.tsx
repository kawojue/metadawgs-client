"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XRefreshPosts } from "@/lib/values";
import useLocalStorage from "use-local-storage";
import { generateRandomString } from "@/lib/common";
import useAuth from "@/hooks/use-auth";

export default function AuthHandler() {
  const router = useRouter();
  const { setUserToken } = useAuth();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [, setRefreshPosts] = useLocalStorage<string>(XRefreshPosts, "");

  useEffect(() => {
    const handleAuth = () => {
      if (token) {
        setUserToken(token);
      }

      // Update refresh posts
      setRefreshPosts(generateRandomString(10));

      if (window.opener) {
        window.close();
      }

      router.replace("/quests#Posts");
    };

    handleAuth();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#FFBE00] border-t-transparent rounded-full animate-spin mx-auto" />
        <h1 className="text-3xl font-semibold text-white font-fredoka">
          Authenticating...
        </h1>
      </div>
    </div>
  );
}
