"use client";

import ReferralTile from "@/components/custom/ReferralTile";
import { FadeInUp } from "@/components/custom/ScrollAnimation";
import VerifyParticipate from "@/components/custom/VerifyParticipateTile";
import { useEffect } from "react";
import useAuth from "@/hooks/use-auth";

interface OnboardingProps {
    setIsOnboarded: () => void;
}

function Onboarding({ setIsOnboarded }: OnboardingProps) {
    const { userProfile } = useAuth();

    useEffect(() => {
        if (userProfile && userProfile.hasLinkedTelegram) {
            setIsOnboarded();
        }
    }, [userProfile, setIsOnboarded]);

    return (
        <div className="p-4 sm:p-6 md:p-10 flex flex-col gap-5 justify-center items-center md:pt-10 max-[750px]:my-15">
            <FadeInUp className="space-y-2">
                <h2 className="md:text-6xl text-3xl font-fredoka font-semibold text-center">
                    Onboarding Tasks
                </h2>
                <p className="text-[#ACACAC] text-lg max-w-lg mx-auto text-center">
                    Complete the following tasks to stand a chance to earn more
                    metadawgs as an early participant in the ecosystem
                </p>
            </FadeInUp>

            <div className="quests-box w-full max-w-3xl mt-2">
                <ul className="grid grid-cols-1 md:gap-5 gap-3">
                    <li>
                        <ReferralTile />
                    </li>
                    <li>
                        <VerifyParticipate />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Onboarding;
