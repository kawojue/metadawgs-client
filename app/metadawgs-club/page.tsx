"use client";
import { useState, useMemo, useEffect } from "react";
import Onboarding from "./Onboarding";
import useAuth from "@/hooks/use-auth";
import OnboardingModal from "./modals/OnboardModal";
import QuestPage from "@/app/metadawgs-club/QuestPage";
import { useWallet } from "@solana/wallet-adapter-react";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";

function Page() {
    const { userProfile, isLoading } = useAuth();
    const { publicKey } = useWallet();
    const pathname = usePathname();

    const isOnboarded = useMemo(
        () =>
            !!(
                userProfile &&
                (userProfile?.user?.walletAddress || publicKey?.toBase58())
            ),
        [userProfile, publicKey]
    );

    const [onboardOpen, setOnboardOpen] = useState<boolean>(
        !isOnboarded && pathname === "/metadawgs-club"
    );

    useEffect(() => {
        if (!isOnboarded && pathname === "/metadawgs-club") {
            setOnboardOpen(true);
        } else {
            setOnboardOpen(false);
        }
    }, [isOnboarded, pathname]);

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
                <OnboardingModal
                    open={onboardOpen}
                    onClose={() => setOnboardOpen(false)}
                    continueOn={continueOn}
                />
            </div>
        );
    }

    return (
        <div>
            <QuestPage />
            <OnboardingModal
                open={onboardOpen}
                onClose={() => setOnboardOpen(false)}
                continueOn={continueOn}
            />
        </div>
    );
}

export default Page;
