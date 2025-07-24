"use client";

import { XRefreshHouse, XRefreshPosts } from "@/lib/values";
import { useCallback, useEffect, useMemo, useState } from "react";
import useLocalStorage from "use-local-storage";
import { toast } from "sonner";
import useAuth from "@/hooks/use-auth";

// import { VerificationBadge } from "@/lib/icons";
import { DawgMetrics } from "@/lib/type";
import { fetchWithAuth } from "@/lib/api";
import { useSearchParams, useRouter } from "next/navigation";
import TopBanner from "./TopBanner";
import { Button } from "@/components/ui/button";
import PostsGrid from "./PostsGrid";
import RaidersGrid from "./RaidersGrid";
import { Loader, SearchIcon } from "lucide-react";
import HousesGrid from "./HousesGrid";

function DawgHouses() {
    const { userToken } = useAuth();
    const [refreshPosts] = useLocalStorage<string>(XRefreshPosts, "");
    const [refreshHouse] = useLocalStorage<string>(XRefreshHouse, "");
    const [s_loading, s_setLoading] = useState<boolean>(false);
    const [userStats, setUserStats] = useState<DawgMetrics | null>(null);
    const [search, setSearch] = useState<string>("");
    const inDawgsHouse = useMemo(
        () => userStats?.type === "dawghouse",
        [userStats]
    );

    const searchParams = useSearchParams();
    const router = useRouter();

    const activeTab = (searchParams.get("tab") as "live" | "past") || "live";
    const contentType =
        (searchParams.get("type") as "mindshare" | "raiders") || "raiders";

    const handleTabChange = useCallback(
        (value: "live" | "past") => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("tab", value);
            params.delete("page");
            router.push(`?${params.toString()}`);
        },
        [router, searchParams]
    );

    const handleContentTypeChange = useCallback(
        (value: "mindshare" | "raiders") => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("type", value);
            params.delete("page");
            router.push(`?${params.toString()}`);
        },
        [router, searchParams]
    );

    const fetchStats = useCallback(async () => {
        if (!userToken) {
            setUserStats(null);
            return;
        }

        try {
            s_setLoading(true);

            const endpoint = `/dawghouses/metrics`;

            const { data } = await fetchWithAuth<DawgMetrics>(endpoint);
            setUserStats(data);
        } catch (error) {
            console.error("Failed to fetch user stats:", error);
            toast("Failed to load your stats. Please try again later.");
            setUserStats(null);
        } finally {
            s_setLoading(false);
        }
    }, [userToken]);

    useEffect(() => {
        fetchStats();
    }, [refreshPosts, fetchStats, refreshHouse]);

    if (s_loading) {
        return (
            <div className="h-dch w-full grid place-content-center">
                <Loader size={72} color={"#FFBE00"} className="animate-spin" />
            </div>
        );
    }

    return (
        <>
            <div className="bg-black text-white min-h-screen">
                <div className="conquests space-y-16 p-6">
                    <div className="social_quests md:mx-[5%] space-y-4 lg:mx-[18%]">
                        <TopBanner
                            userStats={userStats}
                            inDawgsHouse={inDawgsHouse}
                        />
                        <br />
                        <div className="space-y-5">
                            <h2 className="title text-center md:text-[48px] sm:text-4xl text-3xl font-fredoka font-bold text-white">
                                {userStats?.type === "dawghouse"
                                    ? `${userStats.dawghouse.name} Dawghouse`
                                    : "Dawghouses to Join"}
                            </h2>
                            {!inDawgsHouse && (
                                <form
                                    className="w-full max-w-lg h-12 rounded-md bg-white/4 mx-auto relative flex rounded-r-md overflow-hidden"
                                    onSubmit={(e) => {
                                        e.preventDefault();

                                        const params = new URLSearchParams(
                                            searchParams.toString()
                                        );
                                        params.set("q", search);
                                        params.delete("page");
                                        router.replace(`?${params.toString()}`);
                                    }}
                                >
                                    <button className="left-4 top-1/2 -translate-y-1/2 absolute">
                                        <SearchIcon />
                                    </button>
                                    <input
                                        className="w-full h-full rounded-md pl-12 text-white"
                                        placeholder="Search dawghouses"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.currentTarget.value)
                                        }
                                        name="q"
                                    />
                                    {/* <button className="text-black bg-[#FFBE00] px-5 py-2.5 cursor-pointer font-bold">
                    Search
                  </button> */}
                                </form>
                            )}
                            {inDawgsHouse && (
                                <div className="space-y-6">
                                    <div className="flex justify-center gap-4 mb-8">
                                        <button
                                            className={`inline-flex items-center gap-3 px-8 py-4 cursor-pointer font-bold text-sm rounded-full relative
                                                transform transition-all duration-300 ease-in-out
                                                hover:scale-105 hover:shadow-xl
                                                shadow-lg border-2
                                                group ${
                                                    contentType === "mindshare"
                                                        ? "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white border-blue-400/50 shadow-blue-500/25"
                                                        : "bg-[#1E1E1E] text-white/70 border-white/20 hover:border-blue-400/50"
                                                }`}
                                            onClick={() =>
                                                handleContentTypeChange(
                                                    "mindshare"
                                                )
                                            }
                                        >
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                                                <svg
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="relative z-10 font-fredoka">
                                                MindShare
                                            </span>
                                            {contentType === "mindshare" && (
                                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 opacity-20 animate-pulse"></div>
                                            )}
                                        </button>

                                        <button
                                            className={`inline-flex items-center gap-3 px-8 py-4 cursor-pointer font-bold text-sm rounded-full relative
                                                transform transition-all duration-300 ease-in-out
                                                hover:scale-105 hover:shadow-xl
                                                shadow-lg border-2
                                                group ${
                                                    contentType === "raiders"
                                                        ? "bg-gradient-to-r from-orange-600 via-red-600 to-orange-800 text-white border-orange-400/50 shadow-orange-500/25"
                                                        : "bg-[#1E1E1E] text-white/70 border-white/20 hover:border-orange-400/50"
                                                }`}
                                            onClick={() =>
                                                handleContentTypeChange(
                                                    "raiders"
                                                )
                                            }
                                        >
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                                                <svg
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M12 6L13.5 10.5L18 12L13.5 13.5L12 18L10.5 13.5L6 12L10.5 10.5L12 6Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="relative z-10 font-fredoka">
                                                Raiders&apos;
                                            </span>
                                            {contentType === "raiders" && (
                                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 opacity-20 animate-pulse"></div>
                                            )}
                                        </button>
                                    </div>

                                    <div className="flex justify-start gap-4 mb-6">
                                        <Button
                                            className={`rounded-full !px-6 !py-4 font-medium text-[14px] cursor-pointer transition-colors ${
                                                activeTab === "live"
                                                    ? "text-black bg-[#FFBE00]"
                                                    : "text-white bg-[#1E1E1E]"
                                            }`}
                                            onClick={() =>
                                                handleTabChange("live")
                                            }
                                        >
                                            Live
                                        </Button>
                                        <Button
                                            className={`rounded-full !px-6 !py-4 font-medium text-[14px] cursor-pointer transition-colors ${
                                                activeTab === "past"
                                                    ? "text-black bg-[#FFBE00]"
                                                    : "text-white bg-[#1E1E1E]"
                                            }`}
                                            onClick={() =>
                                                handleTabChange("past")
                                            }
                                        >
                                            Past
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {inDawgsHouse && contentType === "mindshare" && (
                                <PostsGrid activeTab={activeTab} />
                            )}

                            {inDawgsHouse && contentType === "raiders" && (
                                <RaidersGrid activeTab={activeTab} />
                            )}

                            {!inDawgsHouse && <HousesGrid />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DawgHouses;
