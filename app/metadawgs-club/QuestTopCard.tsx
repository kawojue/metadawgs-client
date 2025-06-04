"use client";

import JoinCreatorsInputModal from "@/components/custom/modals/JoinCreatorsInputModal";
import SubmitEntryInputModal from "@/components/custom/modals/SubmitEntryInputModal";
import { FadeInUp } from "@/components/custom/ScrollAnimation";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { XOpenSignUpModal } from "@/lib/values";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useLocalStorage from "use-local-storage";

function QuestTopCard() {
  const { userToken } = useAuth();
  const [, setOpenSignup] = useLocalStorage(XOpenSignUpModal, false);
  const [showEntryInput, setShowEntryInput] = useState<boolean>(false);
  const [showJoinCreators, setShowJoinCreators] = useState<boolean>(false);
  const router = useRouter();
  const isCreator = true;

  function openEntryInput() {
    if (!userToken) {
      setOpenSignup(true);
      return;
    }

    setShowEntryInput(true);
  }

  function openTweetExamples() {
    if (!userToken) {
      setOpenSignup(true);
      return;
    }

    router.push("/tweet-examples");
  }

  if (isCreator) {
    return (
      <>
        <FadeInUp className="w-full rounded-2xl pool after:rounded-2xl p-5 sm:p-6 sm:py-8 space-y-3 relative after:bg-[linear-gradient(to_right,#000000,#000000c8),url('/images/throne.jpg')] after:bg-cover after:bg-no-repeat">
          <div className="rounded-full w-fit overflow-hidden bg-[linear-gradient(90deg,_#FFBE00_0%,_#229EFF_100%)] p-[1px]">
            <div className="point-pill text-xs font-medium pool after:rounded-full p-2 px-3 rounded-full flex flex-nowrap items-center gap-0.5 text-nowrap">
              Base Reward 500 Bones
            </div>
          </div>
          <h3 className="font-semibold font-fredoka text-3xl max-w-sm">
            Write a post about MetaDawgs on Twitter.
          </h3>
          <p className="text-white text-[15px] max-w-md">
            Click {"Submit Entry"} button to complete this task. Allow 1-20
            minutes for the system check.
          </p>

          <div className="flex gap-4 gap-y-2 flex-wrap">
            <Button
              className="rounded-full !px-6 !py-5 pt-5.5! font-medium text-[14px] cursor-pointer text-black bg-[#FFBE00]"
              onClick={openEntryInput}
            >
              <span>Submit X Post</span>
            </Button>
            <Button
              onClick={openTweetExamples}
              className="rounded-full !px-6 !py-5 pt-5.5! font-medium text-[14px] cursor-pointer text-black bg-[#D5D5D5]"
            >
              <span>Tweet Examples</span>
            </Button>
          </div>
        </FadeInUp>

        <SubmitEntryInputModal
          open={showEntryInput}
          onClose={() => setShowEntryInput(false)}
        />
      </>
    );
  }

  return (
    <>
      <FadeInUp className="w-full rounded-2xl pool after:rounded-2xl p-6 sm:py-10 space-y-3 relative after:bg-[linear-gradient(to_right,#000000,#000000c8),url('/images/throne.jpg')] after:bg-cover after:bg-no-repeat">
        <h3 className="font-semibold font-fredoka text-3xl max-w-sm">
          Join the MetaDawgs Creators Club
        </h3>
        <p className="text-white text-[15px] max-w-sm">
          Be part of metadawgs content creators club
        </p>

        <div className="flex gap-4 gap-y-2 flex-wrap">
          <Button
            className="rounded-full !px-6 !py-5 pt-5.5! font-medium text-[14px] cursor-pointer text-black bg-[#FFBE00]"
            onClick={openEntryInput}
          >
            <span>Join Creators</span>
          </Button>
          <Button
            onClick={openTweetExamples}
            className="rounded-full !px-6 !py-5 pt-5.5! font-medium text-[14px] cursor-pointer text-black bg-[#D5D5D5]"
          >
            <span>Tweet Examples</span>
          </Button>
        </div>
      </FadeInUp>

      <JoinCreatorsInputModal
        open={showJoinCreators}
        onClose={() => setShowJoinCreators(false)}
      />
    </>
  );
}

export default QuestTopCard;
