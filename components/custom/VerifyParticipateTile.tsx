"use client";

import React, { useEffect, useState } from "react";
import { SlideInLeft } from "./ScrollAnimation";
import { QuestTile } from "./QuestTile";
import { XVerifyParticipate } from "@/lib/values";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";

const VerifyParticipate = () => {
  const { userProfile } = useAuth();
  // const [, setParticipateVerified] = useLocalStorage(
  //   `${XVerifyParticipate}-${userProfile?.user.username}`,
  //   false
  // );
  const [participateVerified, setParticipateVerified] =
    useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const storedValue = localStorage.getItem(
      `${XVerifyParticipate}-${userProfile?.user.username}`
    );
    if (storedValue) {
      setParticipateVerified(true);
    }
  }, [userProfile?.user.username]);

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
            localStorage.setItem(
              `${XVerifyParticipate}-${userProfile?.user.username}`,
              "true"
            );
            router.push("/quests#Posts");
          }}
        />
      </SlideInLeft>
    </>
  );
};

export default VerifyParticipate;
