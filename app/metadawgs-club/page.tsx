"use client";

import { useState } from "react";
import Onboarding from "./Onboarding";
import useAuth from "@/hooks/use-auth";
import OnboardingModal from "./modals/OnboardModal";
import QuestPage from "@/app/metadawgs-club/QuestPage";

function Page() {
  const { userProfile } = useAuth();
  const [isOnboarded, setIsOnboarded] = useState<boolean>(
    !!userProfile &&
      !!userProfile.user.walletApproved
  );

  const [onboardOpen, setOnboardOpen] = useState<boolean>(
    !userProfile?.hasLinkedTelegram
  );

  const continueOn = () => {
    setOnboardOpen(false);
  };

  if (!isOnboarded) {
    return <Onboarding setIsOnboarded={(value) => setIsOnboarded(value)} />;
  }

  return (
    <>
      <QuestPage/>
      <OnboardingModal
        open={onboardOpen}
        onClose={() => setOnboardOpen(false)}
        continueOn={continueOn}
        hideTheRest={true}
      />
    </>
  );
}

export default Page;
