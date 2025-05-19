"use client";

import AvatarGroup from "@/components/custom/AvatarGroup";
import SubmitEntryInputModal from "@/components/custom/modals/SubmitEntryInputModal";
import PostCard from "@/components/custom/PostCard";
import { FadeInUp } from "@/components/custom/ScrollAnimation";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { fetchWithAuth } from "@/lib/api";
import { PostType } from "@/lib/type";
import { authWithTwitter } from "@/lib/utils";
import {
  XCompleteOnboarding,
  XNoCode,
  XOpenSignUpModal,
  XRefreshPosts,
  XUserToken,
  XVerifyParticipate,
} from "@/lib/values";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useLocalStorage from "use-local-storage";
import Onboarding from "./Onboarding";

function QuestPage() {
  const [userToken] = useLocalStorage(XUserToken, "");
  const { userProfile } = useAuth();
  const [, setCompleteOnboarding] = useLocalStorage(XCompleteOnboarding, false);
  const [noCode] = useLocalStorage<boolean>(XNoCode, false);
  const [participateVerified] = useLocalStorage(XVerifyParticipate, false);

  const [refreshPosts] = useLocalStorage<string>(XRefreshPosts, "");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showEntryInput, setShowEntryInput] = useState<boolean>(false);
  const [, setOpenSignup] = useLocalStorage(XOpenSignUpModal, false);

  const isOnboardingCompleted = useMemo(() => {
    if (!userProfile?.eligibleToUseReferralCode && participateVerified) {
      return true;
    }

    if (noCode && participateVerified) {
      return true;
    }

    return false;
  }, [userProfile?.eligibleToUseReferralCode, noCode, participateVerified]);

  const router = useRouter();

  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);
        const { data } = await fetchWithAuth<PostType[]>("/posts");
        console.log("Posts", data, loading);

        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshPosts]);

  function openEntryInput() {
    if (!userToken) {
      setOpenSignup(true);
      return;
    }

    if (!isOnboardingCompleted) {
      setCompleteOnboarding(true);
      return;
    }

    setShowEntryInput(true);
  }

  function openTweetExamples() {
    if (!userToken) {
      setOpenSignup(true);
      return;
    }

    if (!isOnboardingCompleted) {
      setCompleteOnboarding(true);
      return;
    }

    router.push("/tweet-examples");
  }

  return (
    <div className="bg-black text-white">
      <div className="p-4 sm:p-6 md:p-15 md:pb-10 py-5 flex flex-col gap-5 justify-center items-center">
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
      </div>

      <div className="posts" id="Onboarding"></div>
      {!!userProfile && !isOnboardingCompleted && <Onboarding />}
      {!userProfile && <Onboarding />}

      <div className="conquests space-y-14 lg:py-[5%] p-6">
        <div className="posts" id="Posts"></div>

        <div className="social_quests md:mx-[5%] lg:mx-[15%]">
          <FadeInUp className="w-full rounded-2xl pool after:rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="rounded-full w-fit overflow-hidden bg-[linear-gradient(90deg,_#FFBE00_0%,_#229EFF_100%)] p-[1px]">
              <div className="point-pill text-xs font-medium pool after:rounded-full p-2 px-3 rounded-full flex flex-nowrap items-center gap-0.5 text-nowrap">
                30 Bones
              </div>
            </div>
            <h3 className="font-semibold font-fredoka text-3xl">
              Write a post about metadawgs on X ( Twitter).
            </h3>
            <p className="text-white text-[15px]">
              Click {'"Submit Entry"'} button to complete this task. Allow 1-5
              minutes for the system check. See tweet examples for clarity.
            </p>

            <div className="flex gap-4 gap-y-2 flex-wrap">
              <Button
                className="rounded-full !px-6 !py-5 pt-5.5! font-medium text-[14px] cursor-pointer text-black bg-[#FFBE00]"
                onClick={openEntryInput}
              >
                <span>Submit Entry</span>
              </Button>
              <Button
                onClick={openTweetExamples}
                className="rounded-full !px-6 !py-5 pt-5.5! font-medium text-[14px] cursor-pointer text-black bg-[#D5D5D5]"
              >
                <span>Tweet Examples</span>
              </Button>
            </div>
          </FadeInUp>
          {!!userToken && (
            <div className="quests-box w-full sm:mt-8 mt-4 max-h-[500px]overflow-y-auto">
              {loading && (
                <div className="p-4 text-center">
                  <h3 className="text-2xl font-fredoka">Loading Quests...</h3>
                </div>
              )}

              {!loading && posts.length > 0 && (
                <div className="grid xl:grid-cols-3 md:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:place-items-center grid-cols-2 gap-3 mt-10">
                  {posts.map((post) => (
                    <FadeInUp key={post.id}>
                      <PostCard
                        post={post}
                        isOnboardingCompleted={isOnboardingCompleted}
                      />
                    </FadeInUp>
                  ))}
                </div>
              )}

              {!loading && posts.length == 0 && (
                <div className="p-4 text-center">
                  <h3 className="text-2xl font-fredoka">No Posts</h3>
                </div>
              )}
            </div>
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
                  />
                </div>
                <h3 className="text-center font-fredoka text-3xl">
                  Authentication Required
                </h3>
                <p className="text-center max-w-[480px] text-base">
                  Ready to embark on epic quests and earn rewards? First, you
                  need to authenticate and start collecting bones for your
                  MetaDawgs journey!
                </p>
                <Button
                  className="w-fit py-6! px-5! rounded-full cursor-pointer bg-[#FFBE00] text-black"
                  onClick={() => {
                    authWithTwitter();
                  }}
                >
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
              </div>
            </div>
          )}
        </div>
      </div>

      <SubmitEntryInputModal
        open={showEntryInput}
        onClose={() => setShowEntryInput(false)}
      />
    </div>
  );
}

export default QuestPage;
