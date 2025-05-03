"use client";

import React from "react";
import { SlideInLeft } from "./ScrollAnimation";
import { QuestTile } from "./QuestTile";
import { useLocalStorage } from "@solana/wallet-adapter-react";
import { XVerifyParticipate } from "@/lib/values";

const VerifyParticipate = () => {
  const [, setParticipateVerified] = useLocalStorage(XVerifyParticipate, false);
  return (
    <>
      <SlideInLeft>
        <QuestTile
          quest={{
            id: 1,
            point: 20,
            todo: "Participate in the daily Contest",
            app_name: "twitter",
            link: "/quests#Posts",
            inApp: true,
          }}
          func={() => {
            setParticipateVerified(true);
          }}
        />
      </SlideInLeft>
    </>
  );
};

export default VerifyParticipate;
