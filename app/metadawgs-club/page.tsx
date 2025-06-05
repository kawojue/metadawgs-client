"use client";
import { useState, Suspense } from "react";
import Onboarding from "./Onboarding";
import useAuth from "@/hooks/use-auth";
import OnboardingModal from "./modals/OnboardModal";
import QuestPage from "@/app/metadawgs-club/QuestPage";
import { useWallet } from "@solana/wallet-adapter-react";

function Page() {
  const { userProfile } = useAuth();
  const { publicKey } = useWallet();

  const isOnboarded = !!(
    userProfile &&
    // userProfile.user.walletApproved &&
    publicKey &&
    userProfile.hasLinkedTelegram
  );

  const [onboardOpen, setOnboardOpen] = useState<boolean>(false);

  const continueOn = () => {
    setOnboardOpen(false);
  };

  if (!userProfile || !isOnboarded) {
    return (
      <Suspense fallback={"loading..."}>
        <Onboarding setIsOnboarded={() => {}} />;
      </Suspense>
    );
  }

  return (
    <Suspense fallback={"loading..."}>
      <>
        <QuestPage />
        <OnboardingModal
          open={onboardOpen}
          onClose={() => setOnboardOpen(false)}
          continueOn={continueOn}
          hideTheRest={true}
        />
      </>
    </Suspense>
  );
}

export default Page;
