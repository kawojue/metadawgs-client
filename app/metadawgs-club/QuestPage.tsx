"use client";

import PostCard from "@/components/custom/PostCard";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/api";
import { PostType, MetaType } from "@/lib/type";
import { XRefreshPosts } from "@/lib/values";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import useLocalStorage from "use-local-storage";
import { useRouter, useSearchParams } from "next/navigation";
import { authUrl } from "@/lib/utils";
import Link from "next/link";
import useAuth from "@/hooks/use-auth";
import QuestTopCard from "./QuestTopCard";
import { Loader } from "lucide-react";
import DarkPagination from "@/components/custom/DarkPagination";

function QuestPage() {
    const { userToken } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSpecial, setIsSpecial] = useLocalStorage<boolean>(
        "QUEST_IS_SPECIAL",
        false
    );
    const [refreshPosts] = useLocalStorage<string>(XRefreshPosts, "");
    const [posts, setPosts] = useState<PostType[]>([]);
    const [meta, setMeta] = useState<MetaType>({
        size: 0,
        hasNext: false,
        hasPrev: false,
        totalPages: 0,
        currentPage: 1,
        offset: 0,
        totalItems: 0,
        nextPage: null,
        previousPage: null,
    });

    const activeTab = (searchParams.get("tab") as "live" | "past") || "live";
    const currentPage = parseInt(searchParams.get("page") || "1", 10);

    const fetchPosts = useCallback(
        async (page: number = 1) => {
            if (!userToken) {
                setPosts([]);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const limit = 15;
                const endpoint = isSpecial
                    ? `/posts?special=true&page=${page}&limit=${limit}`
                    : `/posts?tab=${activeTab}&special=false&page=${page}&limit=${limit}`;

                const response = await fetchWithAuth<{
                    data: PostType[];
                    meta: MetaType;
                }>(endpoint);
                setPosts(response.data.data);
                setMeta(response.data.meta);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                setError("Failed to load quests. Please try again later.");
                setPosts([]);
            } finally {
                setLoading(false);
            }
        },
        [userToken, isSpecial, activeTab]
    );

    useEffect(() => {
        fetchPosts(currentPage);
    }, [fetchPosts, refreshPosts, currentPage]);

    const handleTabChange = useCallback(
        (value: "live" | "past") => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("tab", value);
            params.delete("page");
            router.push(`?${params.toString()}`);
        },
        [router, searchParams]
    );

    const handlePageChange = useCallback(
        (page: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", page.toString());
            router.push(`?${params.toString()}`);
        },
        [router, searchParams]
    );

    const handleSpecialChange = useCallback(
        (value: boolean) => {
            setIsSpecial(value);
            // Reset to first page when changing quest type
            const params = new URLSearchParams(searchParams.toString());
            params.delete("page");
            router.push(`?${params.toString()}`);
        },
        [setIsSpecial, router, searchParams]
    );

    const postsGrid = useMemo(() => {
        if (loading) {
            return (
                <div className="p-4 text-center min-h-[150px] flex flex-col items-center justify-center">
                    <Loader size={48} className="animate-spin text-[#FFBE00]" />
                    <h3 className="text-2xl font-fredoka mt-4">
                        Loading Quests...
                    </h3>
                </div>
            );
        }

        if (error) {
            return (
                <div className="p-4 text-center min-h-[150px] flex flex-col items-center justify-center">
                    <h3 className="text-2xl font-fredoka text-red-500">
                        {error}
                    </h3>
                    <Button
                        onClick={() => fetchPosts(currentPage)}
                        className="mt-4 bg-[#FFBE00] text-black hover:bg-[#FFBE00]/80"
                    >
                        Try Again
                    </Button>
                </div>
            );
        }

        if (posts.length === 0) {
            return (
                <div className="p-4 text-center min-h-[150px] flex flex-col items-center justify-center">
                    <h3 className="text-2xl font-fredoka capitalize">
                        No {isSpecial ? "Special" : activeTab} Posts
                    </h3>
                </div>
            );
        }

        return (
            <div className="grid xl:grid-cols-3 md:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:place-items-center grid-cols-2 gap-3 mt-7">
                {posts.map((post) => (
                    <PostCard post={post} key={post.id} />
                ))}
            </div>
        );
    }, [loading, error, posts, isSpecial, activeTab, fetchPosts]);

    return (
        <div className="bg-black text-white min-h-screen">
            {/* <div className="p-4 sm:p-6 md:p-15 md:pb-5 py-5 flex flex-col gap-5 justify-center items-center">
        <FadeInUp>
          <h1 className="title md:text-[76px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka font-bold uppercase text-center">
            Complete Quests,
            <br />
            Collect Bones & Earn
            <br />
            MetaDawgs Token
          </h1>
        </FadeInUp>
        <FadeInUp>
          <p className="text-xl text-[#ACACAC] md:leading-[35px] max-w-[560px] text-center">
            Complete the quest for a chance to earn a guaranteed whitelist spot
            on TGE and earn MetaDawgs token as an early participant in the
            ecosystem
          </p>
        </FadeInUp>
        <FadeInUp className="pips flex gap-x-4 gap-y-2 flex-wrap items-center justify-center">
          <AvatarGroup />
          <p className="text-xs font-semibold">A Lot Have Participated</p>
        </FadeInUp>
      </div> */}

            <div className="conquests space-y-16 p-6">
                <div className="social_quests md:mx-[5%] lg:mx-[18%]">
                    <QuestTopCard />
                    {!!userToken && (
                        <>
                            <div className="text-center mt-12 mb-8">
                                <h2 className="title md:text-[48px] sm:text-4xl text-3xl font-fredoka font-bold text-white">
                                    Metadawgs Raiders Quests
                                </h2>
                            </div>
                            <div className="quests-box w-full sm:mt-8 mt-4">
                                <div className="flex justify-between gap-4 items-center mb-6">
                                    {!isSpecial && (
                                        <div className="flex sm:gap-4 gap-2 flex-wrap">
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
                                    )}
                                    {isSpecial && <div></div>}

                                    <button
                                        className="inline-flex items-center gap-2 sm:pl-8 pl-4 pr-4 py-2.5 cursor-pointer font-bold text-white sm:text-sm text-xs rounded-full relative
                   radial-gradient-custom
                   transform transition-all duration-300 ease-in-out
                   hover:scale-105 hover:shadow-xl
                   hover:animate-none
                   shadow-lg shadow-purple-500/25
                   border-2 border-white/20
                   group"
                                        onClick={() =>
                                            handleSpecialChange(!isSpecial)
                                        }
                                    >
                                        <div
                                            className="absolute sm:left-[-22px] left-[-18px] top-1/2 -translate-y-1/2 
                        transform transition-all duration-300 ease-in-out
                        group-hover:rotate-12 group-hover:scale-110
                        animate-bounce"
                                        >
                                            <Image
                                                src="/images/packet.png"
                                                alt="Packet icon"
                                                width={45}
                                                height={46}
                                                className="sm:w-auto w-[32px] h-auto"
                                                priority
                                            />
                                        </div>

                                        <span
                                            className="relative z-10 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent
                         animate-pulse group-hover:animate-none
                         transition-all duration-300"
                                        >
                                            {!isSpecial
                                                ? "Special Quests"
                                                : "Normal Quests"}
                                        </span>

                                        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                                            <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                                            <div className="absolute bottom-3 left-12 w-1 h-1 bg-yellow-300 rounded-full animate-ping animation-delay-1000"></div>
                                            <div className="absolute top-3 left-1/2 w-1 h-1 bg-pink-300 rounded-full animate-ping animation-delay-2000"></div>
                                        </div>

                                        <div
                                            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                        opacity-0 group-hover:opacity-30 transition-opacity duration-300
                        animate-pulse scale-110 blur-sm"
                                        ></div>
                                    </button>
                                </div>

                                <div>{postsGrid}</div>
                                {meta.totalPages > 1 && (
                                    <div className="mt-8 flex justify-center">
                                        <DarkPagination
                                            meta={meta}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    {!userToken && (
                        <div className="lg:py-[5%] p-6 md:mx-[5%] lg:mx-[15%]">
                            <div className="flex flex-col justify-center items-center gap-4">
                                <div className="circle bg-white rounded-full p-2.5 mb-1">
                                    <Image
                                        src={"/images/man-avatar.png"}
                                        alt="warning"
                                        width={100}
                                        height={100}
                                        priority
                                    />
                                </div>
                                <h3 className="text-center font-fredoka text-3xl">
                                    Authentication Required
                                </h3>
                                <p className="text-center max-w-[480px] text-base">
                                    Ready to embark on epic quests and earn
                                    rewards? First, you need to authenticate and
                                    start collecting bones for your MetaDawgs
                                    journey!
                                </p>
                                <Link className="block w-fit" href={authUrl}>
                                    <Button className="w-fit py-6! px-5! rounded-full cursor-pointer bg-[#FFBE00] text-black hover:bg-[#FFBE00]/80 transition-colors">
                                        <svg
                                            width="14"
                                            height="12"
                                            viewBox="0 0 14 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5.99204 7.76733L9.1665 12H13.8332L8.5943 5.01487L12.9537 0H11.187L7.77604 3.92385L4.83317 0H0.166504L5.17374 6.67633L0.545937 12H2.31262L5.99204 7.76733ZM9.83317 10.6667L2.83317 1.33333H4.1665L11.1665 10.6667H9.83317Z"
                                                fill="black"
                                            />
                                        </svg>{" "}
                                        Sign in with X
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuestPage;
