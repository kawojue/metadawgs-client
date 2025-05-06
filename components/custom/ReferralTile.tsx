"use client";

import React, { useState } from "react";
import { SlideInLeft } from "./ScrollAnimation";
import { quests } from "@/lib/data";
import { QuestTile } from "./QuestTile";
import ReferralInputModal from "./modals/ReferralInputModal";
import useLocalStorage from "use-local-storage";

import { XNoCode } from "@/lib/values";
import useAuth from "@/hooks/use-auth";

function ReferralTile() {
  const { userProfile } = useAuth();
  const [noCode] = useLocalStorage<boolean>(XNoCode, false);

  if (!!userProfile) {
    if (userProfile.eligibleToUseReferralCode) {
      if (noCode) {
        return null;
      }
      return <ReferralTileContent />;
    } else {
      return null;
    }
  }

  return <ReferralTileContent />;
}

export default ReferralTile;

const ReferralTileContent = () => {
  const [openReferral, setOpenReferral] = useState<boolean>(false);
  return (
    <>
      <SlideInLeft>
        <QuestTile
          quest={{
            id: quests.length,
            todo: "Referral Code",
            point: 20,
            app_name: "dawg",
            link: "",
            inApp: true,
          }}
          func={() => {
            setOpenReferral(true);
          }}
          funcText={"Input Code"}
        />
      </SlideInLeft>

      {openReferral && (
        <ReferralInputModal
          open={openReferral}
          onClose={() => setOpenReferral(false)}
        />
      )}
    </>
  );
};
