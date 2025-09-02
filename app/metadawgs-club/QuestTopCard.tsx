"use client";

import JoinCreatorsInputModal from "@/components/custom/modals/JoinCreatorsInputModal";
import SubmitEntryInputModal from "@/components/custom/modals/SubmitEntryInputModal";
import { FadeInUp } from "@/components/custom/ScrollAnimation";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { XOpenSignUpModal } from "@/lib/values";
import { BellIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
// import { toast } from "sonner";
import useLocalStorage from "use-local-storage";

function QuestTopCard() {
    const { userToken, userProfile } = useAuth();
    const [, setOpenSignup] = useLocalStorage(XOpenSignUpModal, false);
    const [showEntryInput, setShowEntryInput] = useState<boolean>(false);
    const [showJoinCreators, setShowJoinCreators] = useState<boolean>(false);
    const router = useRouter();

    const isCreator = useMemo(
        () =>
            userProfile?.creatorClubVerification === "APPROVED" ||
            userProfile?.creatorClubVerification === "REJECTED",
        [userProfile]
    );

    //   const isNotRealCreator = useMemo(
    //     () =>
    //       userProfile?.creatorClubVerification === "NOT_APPLIED" ||
    //       userProfile?.creatorClubVerification === "REJECTED" ||
    //       userProfile?.creatorClubVerification === "PENDING",
    //     [userProfile]
    //   );

    //   function openEntryInput() {
    //     if (!userToken) {
    //       setOpenSignup(true);
    //       return;
    //     }

    //     setShowEntryInput(true);
    //   }

    function openQuestJoin() {
        if (!userToken) {
            setOpenSignup(true);
            return;
        }

        setShowJoinCreators(true);
    }

    function openTweetExamples() {
        if (!userToken) {
            setOpenSignup(true);
            return;
        }

        router.push("/tweet-examples");
    }

    function openMindShareCreatorsClub() {
        if (!userToken) {
            setOpenSignup(true);
            return;
        }

        router.push("/metadawgs-club/dawghouses");
    }

    if (isCreator) {
        return (
            <>
                <FadeInUp className="w-full rounded-2xl pool after:rounded-2xl p-5 sm:p-5 sm:py-7 space-y-3 relative after:bg-[linear-gradient(to_right,#000000,#000000d3),url('/images/throne.jpg')] after:bg-fill after:bg-right after:bg-no-repeat">
                    {/* Tweet Examples Button - Top Right */}
                    <Button
                        onClick={openTweetExamples}
                        className="absolute top-5 right-5 z-10 rounded-full !px-4 !py-2 font-medium text-[12px] cursor-pointer text-white bg-black/50 hover:bg-black/70 border border-white/20 backdrop-blur-sm transition-all duration-200"
                    >
                        <span>Tweet Examples</span>
                    </Button>

                    {userProfile?.creatorClubVerification === "APPROVED" && (
                        <div className="rounded-full w-fit overflow-hidden bg-[linear-gradient(90deg,_#FFBE00_0%,_#229EFF_100%)] p-[0.5px]">
                            <div className="point-pill text-xs font-medium pool after:rounded-full p-2 px-3 rounded-full flex flex-nowrap items-center gap-0.5 text-nowrap">
                                Approved
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clip-path="url(#clip0_6855_2322)">
                                        <path
                                            d="M5.0035 1.05164C4.30272 0.824785 3.5409 1.14033 3.20578 1.79628L2.80289 2.58487C2.75502 2.67857 2.67881 2.75477 2.58511 2.80264L1.79653 3.20553C1.14058 3.54066 0.825029 4.30247 1.05188 5.00325L1.32461 5.84576C1.35702 5.94586 1.35702 6.05365 1.32461 6.15375L1.05188 6.99625C0.825029 7.69705 1.14058 8.45885 1.79653 8.794L2.58511 9.19685C2.67881 9.24475 2.75502 9.32095 2.80289 9.41465L3.20578 10.2033C3.5409 10.8592 4.30272 11.1748 5.0035 10.9479L5.846 10.6752C5.9461 10.6428 6.0539 10.6428 6.154 10.6752L6.9965 10.9479C7.6973 11.1748 8.4591 10.8592 8.79425 10.2033L9.1971 9.41465C9.245 9.32095 9.3212 9.24475 9.4149 9.19685L10.2035 8.794C10.8594 8.45885 11.175 7.69705 10.9481 6.99625L10.6754 6.15375C10.643 6.05365 10.643 5.94586 10.6754 5.84576L10.9481 5.00325C11.175 4.30247 10.8594 3.54066 10.2035 3.20553L9.4149 2.80264C9.3212 2.75477 9.245 2.67857 9.1971 2.58487L8.79425 1.79628C8.4591 1.14033 7.6973 0.824785 6.9965 1.05164L6.154 1.32437C6.0539 1.35677 5.9461 1.35677 5.846 1.32437L5.0035 1.05164ZM3.37988 5.87841L4.08699 5.17126L5.5012 6.58551L8.32965 3.75708L9.03675 4.46418L5.5012 7.9997L3.37988 5.87841Z"
                                            fill="#00C159"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_6855_2322">
                                            <rect
                                                width="12"
                                                height="12"
                                                fill="white"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    )}
                    <h3 className="font-semibold font-fredoka text-2xl max-w-sm">
                        Win $10,000 Mega Rewards by creating content about{" "}
                        <span className="font-extrabold">Metadawgs TGE</span>
                    </h3>
                    {userProfile?.creatorClubVerification === "APPROVED" && (
                        <p className="text-white text-[12px] max-w-md">
                            Your content creation submission must have your
                            affiliate link there. That’s what our portal is
                            tracking. $MDAWGS
                        </p>
                    )}

                    {userProfile?.creatorClubVerification === "REJECTED" && (
                        <div className="bg-[#1A1A1A] p-4 rounded-xl flex gap-3 w-fit items-center max-w-sm text-xs mb-4">
                            <BellIcon
                                className="text-[#FFBE00]"
                                fill="#FFBE00"
                                size={18}
                            />
                            <p className="text-white text-[13px] max-w-md w-fit">
                                {"You’re"} not eligible to join the content
                                creators club. <br />
                                Level up your account and apply after 7 days or
                                join daily engagement quests below to accumulate
                                bones.
                            </p>
                        </div>
                    )}

                    <div className="flex gap-4 gap-y-2 flex-wrap">
                        {/* <Button
                            className="rounded-full !px-6 !py-5 pt-5.5! font-medium text-[14px] cursor-pointer text-black bg-[#FFBE00] hover:bg-[#E6A800] transition-colors duration-200"
                            onClick={openEntryInput}
                            disabled={isNotRealCreator}
                        >
                            <span>Submit Post</span>
                        </Button> */}
                        <div className="rounded-full overflow-hidden bg-gradient-to-r from-[#FFBE00] via-[#FF6B6B] to-[#4ECDC4] p-[2px]">
                            <Button
                                className="rounded-full !px-6 !py-5 pt-5.5! font-medium text-[14px] cursor-pointer text-white bg-black hover:bg-gray-900 transition-colors duration-200 flex items-center gap-2"
                                onClick={openMindShareCreatorsClub}
                            >
                                <PlusIcon size={14} />
                                <span>Dawghouses</span>
                            </Button>
                        </div>
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
                <Button
                    onClick={openTweetExamples}
                    className="absolute top-6 right-6 z-10 rounded-full !px-4 !py-2 font-medium text-[12px] cursor-pointer text-white bg-black/50 hover:bg-black/70 border border-white/20 backdrop-blur-sm transition-all duration-200"
                >
                    <span>Tweet Examples</span>
                </Button>

                <h3 className="font-semibold font-fredoka text-3xl max-w-sm">
                    Join the MetaDawgs Creators Club
                </h3>
                <p className="text-white text-[15px] max-w-sm">
                    Be part of metadawgs content creators club
                </p>

                <div className="flex gap-4 gap-y-2 flex-wrap">
                    <Button
                        className="rounded-full !px-6 !py-5 pt-5.5! font-medium text-[14px] cursor-pointer text-black bg-[#FFBE00] hover:bg-[#E6A800] transition-colors duration-200"
                        onClick={openQuestJoin}
                        disabled={
                            userProfile?.creatorClubVerification === "PENDING"
                        }
                    >
                        <span>Join Creators</span>
                    </Button>
                </div>
                {userProfile?.creatorClubVerification === "PENDING" && (
                    <span className="text-xs text-[#ffBE00]">
                        Your request to join creators club is pending
                    </span>
                )}
            </FadeInUp>

            <JoinCreatorsInputModal
                open={showJoinCreators}
                onClose={() => setShowJoinCreators(false)}
            />
        </>
    );
}

export default QuestTopCard;
