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
    const handleAuth = async () => {
      try {
        if (token) {
          setUserToken(token);
        }

        setRefreshPosts(generateRandomString(10));

        await new Promise((resolve) => setTimeout(resolve, 100));

        router.replace("/quests#Posts");

        if (window.opener) {
          setTimeout(() => window.close(), 200);
        }
      } catch (error) {
        console.error("Error saving token:", error);
        router.replace("/quests#Posts");
      }
    };

    if (token) {
      handleAuth();
    } else {
      router.replace("/quests#Posts");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
