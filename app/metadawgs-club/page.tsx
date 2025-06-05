"use client";
import { useState, useEffect } from "react";
import Onboarding from "./Onboarding";
import useAuth from "@/hooks/use-auth";
import OnboardingModal from "./modals/OnboardModal";
import QuestPage from "@/app/metadawgs-club/QuestPage";
import useLocalStorage from "use-local-storage";
import { XDoThatLater } from "@/lib/values";

function Page() {
  const { userProfile } = useAuth();

  const [willDoThatLater] = useLocalStorage<boolean>(XDoThatLater, false);
  const isOnboarded = !!(
    userProfile &&
    userProfile.user.walletApproved &&
    willDoThatLater
  );

  const [onboardOpen, setOnboardOpen] = useState<boolean>(false);

  useEffect(() => {
    if (userProfile) {
      setOnboardOpen(!userProfile.hasLinkedTelegram && !willDoThatLater);
    }
  }, [userProfile, willDoThatLater]);

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
