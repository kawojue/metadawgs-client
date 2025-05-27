"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XRefreshPosts } from "@/lib/values";
import useLocalStorage from "use-local-storage";
import { generateRandomString } from "@/lib/common";
import useAuth from "@/hooks/use-auth";

type AuthState = "loading" | "success" | "error";

export default function AuthHandler() {
    const router = useRouter();
    const { setUserToken } = useAuth();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [, setRefreshPosts] = useLocalStorage<string>(XRefreshPosts, "");
    const [authState, setAuthState] = useState<AuthState>("loading");

    useEffect(() => {
        const handleAuth = async () => {
            try {
                if (!token) {
                    setAuthState("error");
                    setTimeout(() => router.replace("/"), 2000);
                    return;
                }

                setUserToken(token);
                setRefreshPosts(generateRandomString(10));
                setAuthState("success");

                if (window.opener) {
                    window.close();
                } else {
                    router.replace("/quests#Posts");
                }
            } catch (error) {
                console.error("Authentication error:", error);
                setAuthState("error");
                setTimeout(() => router.replace("/"), 2000);
            }
        };

        handleAuth();
    }, [token, setUserToken, setRefreshPosts, router]);

    const renderContent = () => {
        switch (authState) {
            case "error":
                return (
                    <>
                        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
                        <h1 className="text-3xl font-semibold text-white font-fredoka">
                            Authentication Failed
                        </h1>
                        <p className="text-gray-400">Redirecting to home...</p>
                    </>
                );
            case "success":
                return (
                    <>
                        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto" />
                        <h1 className="text-3xl font-semibold text-white font-fredoka">
                            Authentication Successful
                        </h1>
                        <p className="text-gray-400">Redirecting...</p>
                    </>
                );
            default:
                return (
                    <>
                        <div className="w-10 h-10 border-4 border-[#FFBE00] border-t-transparent rounded-full animate-spin mx-auto" />
                        <h1 className="text-3xl font-semibold text-white font-fredoka">
                            Authenticating...
                        </h1>
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="text-center space-y-4">{renderContent()}</div>
        </div>
    );
}
