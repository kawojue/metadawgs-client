"use client";

import React from "react";
import { SlideInLeft } from "./ScrollAnimation";
import { QuestTile } from "./QuestTile";
import { useLocalStorage } from "@solana/wallet-adapter-react";
import { XVerifyParticipate } from "@/lib/values";
import { useRouter } from "next/navigation";

const VerifyParticipate = () => {
  const [, setParticipateVerified] = useLocalStorage(XVerifyParticipate, false);
  const router = useRouter();

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
            setParticipateVerified(true);
            router.push("/quests#Posts");
          }}
        />
      </SlideInLeft>
    </>
  );
};

export default VerifyParticipate;
