"use client";
import { useState, useEffect } from "react";
import Onboarding from "./Onboarding";
import useAuth from "@/hooks/use-auth";
import OnboardingModal from "./modals/OnboardModal";
import QuestPage from "@/app/metadawgs-club/QuestPage";

function Page() {
  const { userProfile } = useAuth();

  const isOnboarded = !!(userProfile && userProfile.user.walletApproved);

  const [onboardOpen, setOnboardOpen] = useState<boolean>(false);

  useEffect(() => {
    if (userProfile) {
      setOnboardOpen(!userProfile.hasLinkedTelegram);
    }
  }, [userProfile]);

  const continueOn = () => {
    setOnboardOpen(false);
  };

  if (!userProfile || !isOnboarded) {
    return <Onboarding setIsOnboarded={() => {}} />;
  }

  return (
    <>
      <QuestPage />
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
