"use client";

import { XOpenSignUpModal } from "@/lib/values";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import useAuth from "@/hooks/use-auth";

// import { VerificationBadge } from "@/lib/icons";
import {
  ArrowLeft,
  FilePenLine,
  Video,
  HousePlusIcon,
  LogOutIcon,
} from "lucide-react";
import SubmitEntryInputModal from "@/components/custom/modals/SubmitEntryInputModal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CreateDawgHouseModal from "@/components/custom/modals/CreateDawgHouseModal";
import StatsGrid from "@/components/custom/StatsGrid";
import { dawghouseCards, elseCards } from "./data";
import { formatNumberWithCommas, formatTime } from "@/lib/common";
import { LeaveDawgHouseAlert } from "@/components/custom/modals/LeaveDawgHouseAlert";
import { DawgMetrics } from "@/lib/type";
import PromptJoinHouseModal from "@/components/custom/modals/PromptJoinHouse";

function TopBanner({
  userStats,
  inDawgsHouse,
}: {
  userStats: DawgMetrics | null;
  inDawgsHouse: boolean;
}) {
  const { userToken, userProfile } = useAuth();
  const router = useRouter();

  const [, setOpenSignup] = useLocalStorage(XOpenSignUpModal, false);
  const [showEntryInput, setShowEntryInput] = useState<boolean>(false);
  const [showCreateHouse, setShowCreateHouse] = useState<boolean>(false);
  const [showLeaveHouse, setShowLeaveHouse] = useState<boolean>(false);

  const [isInputVideo, setIsInputVideo] = useState<boolean>(false);

  const [openJoinHouse, setOpenJoinHouse] = useState(false);

  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (userStats) {
      setTimeLeft(userStats?.tournamentDuration?.remaining ?? 0);
    }
  }, [userStats]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 0) return 0;
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function openEntryInput(isVideo?: boolean) {
    if (!userToken) {
      setOpenSignup(true);
      return;
    }

    if (!inDawgsHouse) {
      setOpenJoinHouse(true);
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
      <div className="flex justify-between gap-4 flex-wrap items-center">
        <Button
          onClick={() => router.push("/metadawgs-club")}
          className="mb-4 bg-[#FFBE00] hover:bg-[#E6A800] text-black border-none rounded-full p-2 h-10 w-10 flex items-center justify-center transition-colors duration-200"
        >
          <ArrowLeft size={20} />
        </Button>
        <span className="text-3xl font-bold">
          {userStats?.type === "individual" && "Personalized Metrics"}
          {userStats?.type === "dawghouse" &&
            `${userStats.dawghouse.name} dawghouse Metrics`}
        </span>
      </div>
      <div className="w-full rounded-2xl pool after:rounded-2xl p-5 sm:p-5 sm:py-7 space-y-5 relative after:bg-[linear-gradient(to_right,#000000,#000000d3),url('/images/throne.jpg')] after:bg-fill after:bg-right after:bg-no-repeat">
        <StatsGrid
          utils={{
            userProfile: userProfile || undefined,
          }}
          data={
            userStats?.type === "dawghouse"
              ? {
                  totalReferrals: formatNumberWithCommas(
                    userStats.totalReferrals
                  ),
                  totalReferralsTotal: formatNumberWithCommas(
                    userStats.referralsGoal
                  ),
                  totalEngagements: formatNumberWithCommas(
                    userStats.totalEngagements
                  ),
                  totalEngagementsTotal: formatNumberWithCommas(
                    userStats.engagementsGoal
                  ),
                  totalBones: formatNumberWithCommas(userStats?.totalBones),
                  totalBonesTotal: formatNumberWithCommas(userStats.bonesGoal),
                  tournamentDuration: formatTime(timeLeft),
                  twitterPosts: formatNumberWithCommas(
                    userStats?.totalTwitterPosts
                  ),
                  totalVideos: formatNumberWithCommas(userStats.totalVideos),
                  totalDawgs: formatNumberWithCommas(
                    userStats.totalParticipants
                  ),
                  dawghouseRank: userStats.dawghouseRank,
                  bonesReward: formatNumberWithCommas(userStats.bonesReward),
                  // referral: "referral_link",
                }
              : {
                  tournamentDuration: formatTime(timeLeft),
                  bonesReward: formatNumberWithCommas(
                    userStats?.bonesReward ?? 0
                  ),
                  posts: formatNumberWithCommas(userStats?.postEntries ?? 0),
                  engagements: formatNumberWithCommas(
                    userStats?.engagements ?? 0
                  ),
                  superBones: formatNumberWithCommas(
                    userStats?.superBones ?? 0
                  ),
                  referralsGoal: formatNumberWithCommas(
                    userStats?.goals.referrals ?? 0
                  ),
                  bonesGoal: formatNumberWithCommas(
                    userStats?.goals.bones ?? 0
                  ),
                  engagementsGoal: formatNumberWithCommas(
                    userStats?.goals.engagements ?? 0
                  ),
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

      <PromptJoinHouseModal
        open={openJoinHouse}
        onClose={() => setOpenJoinHouse(false)}
      />
    </>
  );
}

export default TopBanner;
