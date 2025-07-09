"use client";

import { XOpenSignUpModal, XRefreshPosts } from "@/lib/values";
import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { toast } from "sonner";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/use-auth";
import {
    copyToClipboard,
    formatNumberWithCommas,
    hashAddress,
} from "@/lib/common";
// import { VerificationBadge } from "@/lib/icons";
import { UserStats } from "@/lib/type";
import { CopyIcon, Heart, SparklesIcon } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";
import SubmitEntryInputModal from "@/components/custom/modals/SubmitEntryInputModal";
import { Button } from "@/components/ui/button";

function TopBanner() {
    const [refreshPosts] = useLocalStorage<string>(XRefreshPosts, "");
    const { userToken, userProfile } = useAuth();
    const [, s_setLoading] = useState<boolean>(false);
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const [, setOpenSignup] = useLocalStorage(XOpenSignUpModal, false);
    const [showEntryInput, setShowEntryInput] = useState<boolean>(false);

    const fetchStats = useCallback(async () => {
        if (!userToken) {
            setUserStats(null);
            return;
        }

        try {
            s_setLoading(true);

            const endpoint = `/user/mindshare/aggregation`;

            const { data } = await fetchWithAuth<UserStats>(endpoint);
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
    }, [refreshPosts, fetchStats]);

    function openEntryInput() {
        if (!userToken) {
            setOpenSignup(true);
            return;
        }

        setShowEntryInput(true);
    }
    return (
        <>
            <div className="w-full rounded-2xl pool after:rounded-2xl p-5 sm:p-5 sm:py-7 space-y-5 relative after:bg-[linear-gradient(to_right,#000000,#000000d3),url('/images/throne.jpg')] after:bg-fill after:bg-right after:bg-no-repeat">
                <div className="grid gap-4 max-[350px]:grid-cols-1 grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
                    {/* <div className="card bg-white/5 col-span-1 flex-col-reverse sm:flex-row h-full rounded-md flex sm:items-center sm:justify-between gap-4 gap-y-5 p-4">
                        <div className="flex flex-col gap-3 sm:gap-3">
                            <h4 className="title text-sm sm:text-base">
                                Profile
                            </h4>

                            {userProfile && (
                                <div className="div flex gap-2 items-center font-semibold">
                                    <p className="">{`@${userProfile?.user.username}`}</p>
                                    {userProfile?.user?.verified && (
                                        <VerificationBadge />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="icon text-3xl">
                            <Avatar className="w-10 h-10 min-w-10 min-h-10">
                                <AvatarImage src={userProfile?.user?.avatar} />
                                <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500"></AvatarFallback>
                            </Avatar>
                        </div>
                    </div> */}
                    <div className="card bg-white/5 col-span-1 flex-col-reverse sm:flex-row h-full rounded-md flex sm:items-center sm:justify-between gap-4 gap-y-5 p-4">
                        <div className="flex flex-col gap-3 sm:gap-2">
                            <h4 className="title text-text-sm sm:base">
                                No. of posts
                            </h4>
                            <p className="text-3xl font-bold">
                                {formatNumberWithCommas(
                                    userStats?.postsCount || 0
                                ) || "0"}
                            </p>
                        </div>
                        <div className="icon text-3xl">💬</div>
                    </div>
                    <div className="card bg-white/5 col-span-1 flex-col-reverse sm:flex-row h-full rounded-md flex sm:items-center sm:justify-between gap-4 gap-y-5 p-4">
                        <div className="flex flex-col gap-3 sm:gap-2">
                            <h4 className="title text-text-sm sm:base">
                                No. of engagements
                            </h4>
                            <p className="text-3xl font-bold">
                                {formatNumberWithCommas(
                                    userStats?.engagements.total || 0
                                )}
                            </p>
                        </div>
                        <div className="icon text-3xl">
                            <Heart
                                fill="red"
                                className="text-[red]"
                                size={32}
                            />
                        </div>
                    </div>
                    <div className="card bg-white/5 col-span-1 flex-col-reverse sm:flex-row h-full rounded-md flex sm:items-center sm:justify-between gap-4 gap-y-5 p-4">
                        <div className="flex flex-col gap-3 sm:gap-2">
                            <h4 className="title text-text-sm sm:base">
                                Your MindShare Creators&apos; Bones
                            </h4>
                            <p className="text-3xl font-bold">
                                {formatNumberWithCommas(
                                    userStats?.bonesEarned || 0
                                )}
                            </p>
                        </div>
                        <div className="icon text-3xl">🍖</div>
                    </div>

                    <div className="card bg-white/5 col-span-1 flex-col-reverse sm:flex-row h-full rounded-md flex sm:items-center sm:justify-between gap-4 gap-y-5 p-4">
                        <div className="flex flex-col gap-3 sm:gap-2">
                            <h4 className="title text-text-sm sm:base">
                                Your MindShare Super Bones
                            </h4>
                            <p className="text-3xl font-bold">
                                {formatNumberWithCommas(
                                    userStats?.superPoints || 0
                                )}
                            </p>
                        </div>
                        <div className="icon text-3xl">
                            <SparklesIcon
                                size={32}
                                fill="#FFBE00"
                                className="text-[#FFBE00]"
                                strokeWidth={1}
                            />
                        </div>
                    </div>
                    <div className="card bg-white/5 col-span-1 flex-col-reverse sm:flex-row h-full rounded-md flex sm:items-center sm:justify-between gap-4 gap-y-5 p-4">
                        <div className="flex flex-col gap-3 sm:gap-3">
                            <h4 className="title text-sm sm:text-base">
                                Referral Link
                            </h4>
                            <p className="text-3xl font-bold">
                                <Button
                                    className="bg-[#A078FF] p-1.5 px-2.5 rounded-full cursor-pointer text-sm hover:bg-[#A078FF]/80 flex items-center gap-2"
                                    onClick={() => {
                                        copyToClipboard(
                                            `https://metadawgs.com/metadawgs-club?ref=${userProfile?.referralCode}`
                                        );
                                        toast(
                                            "Referral link is saved to the clipboard"
                                        );
                                    }}
                                >
                                    <span className=".5 block sm:hidden">
                                        {hashAddress(
                                            `https://metadawgs.com/metadawgs-club?ref=${userProfile?.referralCode}`,
                                            1
                                        )}
                                    </span>
                                    <span className=".5 sm:block hidden">
                                        {hashAddress(
                                            `https://metadawgs.com/metadawgs-club?ref=${userProfile?.referralCode}`,
                                            8
                                        )}
                                    </span>
                                    <CopyIcon />
                                </Button>
                            </p>
                        </div>
                        <div className="icon text-3xl">🤝</div>
                    </div>
                </div>
                <div className="flex gap-4 gap-y-2 flex-wrap">
                    <Button
                        className="rounded-full !px-6 !py-5 pt-5.5! font-medium text-[14px] cursor-pointer text-black bg-[#FFBE00] hover:bg-[#E6A800] transition-colors duration-200"
                        onClick={openEntryInput}
                    >
                        <span>Submit Twitter/TikTok/Youtube Link</span>
                    </Button>
                </div>
            </div>
            <SubmitEntryInputModal
                open={showEntryInput}
                onClose={() => setShowEntryInput(false)}
                isMindShare
            />
        </>
    );
}

export default TopBanner;
