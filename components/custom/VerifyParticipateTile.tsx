"use client";

import React from "react";
import { SlideInLeft } from "./ScrollAnimation";
import { QuestTile } from "./QuestTile";
import { XVerifyParticipate } from "@/lib/values";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import useLocalStorage from "use-local-storage";

const VerifyParticipate = () => {
  const { userProfile } = useAuth();
  const [participateVerified, setParticipateVerified] = useLocalStorage(
    `${XVerifyParticipate}`,
    false
  );

  const router = useRouter();

  if (participateVerified) {
    return;
  }

  return (
    <>
      <SlideInLeft>
        <QuestTile
          quest={{
            id: 1,
            point: 20,
            todo: "Participate in the daily Contest",
            app_name: "twitter",
            link: "",
            inApp: true,
          }}
          func={() => {
            if (userProfile?.eligibleToUseReferralCode) {
              return;
            }
            setParticipateVerified(true);
            router.push("/quests#Posts");
          }}
        />
      </SlideInLeft>
    </>
  );
};

export default VerifyParticipate;
