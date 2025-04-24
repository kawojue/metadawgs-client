"use client";

import React, { useState } from "react";
import { SlideInLeft } from "./ScrollAnimation";
import { quests } from "@/lib/dummydata";
import { QuestTile } from "./QuestTile";
import ReferralInputModal from "./modals/ReferralInputModal";
import useLocalStorage from "use-local-storage";
import { ProfileType } from "@/lib/type";
import { XUserProfile } from "@/lib/values";

function ReferralTile() {
  const [userProfile] = useLocalStorage<ProfileType | null>(XUserProfile, null);
  const [openReferral, setOpenReferral] = useState<boolean>(false);

  if (!!userProfile && !userProfile?.eligibleToUseReferralCode) {
    return;
  }

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
}

export default ReferralTile;
