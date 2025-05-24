"use client";
import { useEffect, useState } from "react";
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
  const [status, setStatus] = useState("Processing...");

  useEffect(() => {
    const handleAuth = async () => {
      try {
        if (token) {
          setStatus("Saving authentication...");

          if (token.length < 10) {
            throw new Error("Invalid token format");
          }

          setUserToken(token);

          await new Promise((resolve) => setTimeout(resolve, 300));

          const savedToken = localStorage.getItem("userToken");
          if (!savedToken || !savedToken.includes(token)) {
            throw new Error("Token failed to save to localStorage");
          }

          setStatus("Authentication successful!");
          console.log("Token saved successfully:", token);
        }

        setRefreshPosts(generateRandomString(10));
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(
            {
              type: "AUTH_SUCCESS",
              token: token,
            },
            window.location.origin
          );
        }

        router.replace("/quests#Posts");

        if (window.opener) {
          setTimeout(() => window.close(), 300);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Auth error:", error);
        setStatus("Authentication failed. Redirecting...");

        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(
            {
              type: "AUTH_ERROR",
              error: error.message,
            },
            window.location.origin
          );
        }

        setTimeout(() => {
          router.replace("/quests#Posts?auth=failed");
        }, 1000);
      }
    };

    if (token) {
      handleAuth();
    } else {
      setStatus("No authentication token found");
      setTimeout(() => {
        router.replace("/quests#Posts");
      }, 1000);
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#FFBE00] border-t-transparent rounded-full animate-spin mx-auto" />
        <h1 className="text-3xl font-semibold text-white font-fredoka">
          Authenticating...
        </h1>
        <p className="text-white/70">{status}</p>
      </div>
    </div>
  );
}
