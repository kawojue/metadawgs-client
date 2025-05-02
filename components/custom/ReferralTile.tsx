"use client";

import React, { useState } from "react";
import { SlideInLeft } from "./ScrollAnimation";
import { quests } from "@/lib/dummydata";
import { QuestTile } from "./QuestTile";
import ReferralInputModal from "./modals/ReferralInputModal";
import useLocalStorage from "use-local-storage";
import { ProfileType } from "@/lib/type";
import { XNoCode, XUserProfile } from "@/lib/values";

function ReferralTile() {
  const [userProfile] = useLocalStorage<ProfileType | null>(XUserProfile, null);
  const [noCode] = useLocalStorage<boolean>(XNoCode, false); // Ensure the key is a string

  if (!!userProfile) {
    if (userProfile?.eligibleToUseReferralCode) {
      if (noCode) {
        return null; // If noCode is true, don't show the referral UI
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
