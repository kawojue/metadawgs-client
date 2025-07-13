"use client";

import { XOpenSignUpModal, XRefreshPosts } from "@/lib/values";
import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { toast } from "sonner";
import useAuth from "@/hooks/use-auth";

// import { VerificationBadge } from "@/lib/icons";
import { UserStats } from "@/lib/type";
import {
  ArrowLeft,
  FilePenLine,
  Video,
  HousePlusIcon,
  LogOutIcon,
} from "lucide-react";
import { fetchWithAuth } from "@/lib/api";
import SubmitEntryInputModal from "@/components/custom/modals/SubmitEntryInputModal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CreateDawgHouseModal from "@/components/custom/modals/CreateDawgHouseModal";
import StatsGrid from "@/components/custom/StatsGrid";
import { dawghouseCards, elseCards } from "./data";
import { formatTime } from "@/lib/common";
import { LeaveDawgHouseAlert } from "@/components/custom/modals/LeaveDawgHouseAlert";

function TopBanner({ inDawgsHouse }: { inDawgsHouse?: boolean }) {
  const [refreshPosts] = useLocalStorage<string>(XRefreshPosts, "");
  const { userToken, userProfile } = useAuth();
  const router = useRouter();
  const [, s_setLoading] = useState<boolean>(false);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [, setOpenSignup] = useLocalStorage(XOpenSignUpModal, false);
  const [showEntryInput, setShowEntryInput] = useState<boolean>(false);
  const [showCreateHouse, setShowCreateHouse] = useState<boolean>(false);
  const [showLeaveHouse, setShowLeaveHouse] = useState<boolean>(false);

  const [isInputVideo, setIsInputVideo] = useState<boolean>(false);

  const [timeLeft, setTimeLeft] = useState(86400);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function openEntryInput(isVideo?: boolean) {
    if (!userToken) {
      setOpenSignup(true);
      return;
    }

    setIsInputVideo(!!isVideo);
    setShowEntryInput(true);
  }

  function createDawgHouse() {
    if (!userToken) {
      setOpenSignup(true);
      return;
    }

    setShowCreateHouse(true);
  }

  function leaveDawgHouse() {
    if (!userToken) {
      setOpenSignup(true);
      return;
    }

    setShowLeaveHouse(true);
  }

  return (
    <>
      <Button
        onClick={() => router.push("/metadawgs-club")}
        className="mb-4 bg-[#FFBE00] hover:bg-[#E6A800] text-black border-none rounded-full p-2 h-10 w-10 flex items-center justify-center transition-colors duration-200"
      >
        <ArrowLeft size={20} />
      </Button>
      <div className="w-full rounded-2xl pool after:rounded-2xl p-5 sm:p-5 sm:py-7 space-y-5 relative after:bg-[linear-gradient(to_right,#000000,#000000d3),url('/images/throne.jpg')] after:bg-fill after:bg-right after:bg-no-repeat">
        <StatsGrid
          utils={{
            userProfile: userProfile || undefined,
          }}
          data={
            inDawgsHouse
              ? {
                  totalReferrals: 100,
                  totalReferralsTotal: 150,
                  totalEngagements: 10,
                  totalEngagementsTotal: 300,
                  totalBones: userStats?.bonesEarned,
                  totalBonesTotal: 100000,
                  tournamentDuration: formatTime(timeLeft),
                  twitterPosts: userStats?.postsCount,
                  totalVideos: 12,
                  totalDawgs: 45,
                  dawghouseRank: 3,
                  bonesReward: 1500,
                  referral: "referral_link",
                }
              : {
                  tournamentDuration: formatTime(timeLeft),
                  bonesReward: 250,
                  posts: 15,
                  engagements: 120,
                  superBones: 50,
                  referralsGoal: 100,
                  bonesGoal: 10000,
                  engagementsGoal: 500,
                }
          }
          statsCards={inDawgsHouse ? dawghouseCards : elseCards}
        />
        <div className="flex gap-4 gap-y-2 flex-wrap justify-between">
          <div className="flex items-center gap-4">
            <Button
              className="rounded-full !px-6 !py-5 pt-5.5! font-medium text-[14px] cursor-pointer text-black bg-[#FFBE00] transition-colors duration-200"
              onClick={() => openEntryInput()}
            >
              <FilePenLine /> <span>Submit Post</span>
            </Button>
            <Button
              className="rounded-full !px-6 !py-5 pt-5.5! font-medium text-[14px] cursor-pointer text-black bg-[#92A1C6] transition-colors duration-200"
              onClick={() => openEntryInput(true)}
            >
              <Video /> <span>Submit Video</span>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {!inDawgsHouse && (
              <div className="rounded-full overflow-hidden bg-gradient-to-r from-[#FFBE00] via-[#FF6B6B] to-[#4ECDC4] p-[2px]">
                <Button
                  className="rounded-full !px-6 py-5 font-medium text-[14px] cursor-pointer text-white bg-black hover:bg-gray-900 transition-colors duration-200 flex items-center gap-2"
                  onClick={createDawgHouse}
                >
                  <HousePlusIcon /> <span>Create Dawghouse</span>
                </Button>
              </div>
            )}
            {inDawgsHouse && (
              <Button
                className="rounded-full !px-6 !py-5.5 font-medium text-[14px] cursor-pointer text-white bg-[#970000] transition-colors duration-200"
                onClick={leaveDawgHouse}
              >
                <LogOutIcon /> <span>Leave Dawghouse</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      <SubmitEntryInputModal
        open={showEntryInput}
        isVideo={isInputVideo}
        onClose={() => setShowEntryInput(false)}
        isMindShare
      />
      <CreateDawgHouseModal
        open={showCreateHouse}
        onClose={() => setShowCreateHouse(false)}
      />
      <LeaveDawgHouseAlert
        open={showLeaveHouse}
        onClose={() => setShowLeaveHouse(false)}
      />
    </>
  );
}

export default TopBanner;
