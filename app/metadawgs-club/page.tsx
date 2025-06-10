"use client";
import { useState, useMemo } from "react";
import Onboarding from "./Onboarding";
import useAuth from "@/hooks/use-auth";
import OnboardingModal from "./modals/OnboardModal";
import QuestPage from "@/app/metadawgs-club/QuestPage";
import { useWallet } from "@solana/wallet-adapter-react";
import { Loader } from "lucide-react";

function Page() {
    const { userProfile, isLoading } = useAuth();
    const { publicKey } = useWallet();

    const isOnboarded = useMemo(
        () => !!(userProfile && publicKey && userProfile.hasLinkedTelegram),
        [userProfile, publicKey]
    );

    const [onboardOpen, setOnboardOpen] = useState<boolean>(false);

    const continueOn = () => {
        setOnboardOpen(false);
    };

    if (isLoading) {
        return (
            <div className="h-dch w-full grid place-content-center">
                <Loader size={72} color={"#FFBE00"} className="animate-spin" />
            </div>
        );
    }

    if (!userProfile || !isOnboarded) {
        return (
            <div>
                <Onboarding setIsOnboarded={() => setOnboardOpen(true)} />
            </div>
        );
    }

    return (
        <div>
            <QuestPage />
            {onboardOpen && (
                <OnboardingModal
                    open={onboardOpen}
                    onClose={() => setOnboardOpen(false)}
                    continueOn={continueOn}
                    hideTheRest={true}
                />
            )}
        </div>
    );
}

export default Page;
