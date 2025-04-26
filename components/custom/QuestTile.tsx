"use client";

import { DawgIcon, TelegramIcon, TwitterIcon } from "@/lib/icons";
import { ArrowUpRightIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { SignupAlert } from "./modals/SignupAlert";
import useLocalStorage from "use-local-storage";
import { XUserProfile } from "@/lib/values";
import { QuestType } from "@/lib/type";

type Props = {
  quest: QuestType;
  func?: () => void;
  funcText?: string | ReactNode;
};

type IconKey = "instagram" | "twitter" | "telegram" | "dawg" | "default";

export const QuestTile = ({ quest, func, funcText }: Props) => {
  const [userProfile] = useLocalStorage(XUserProfile, null);
  const [openSignup, setOpenSignup] = useState(false);

  const renderQuestIcon = (app_name: IconKey) => {
    const icons = {
      instagram: <TwitterIcon />,
      twitter: <TwitterIcon />,
      telegram: <TelegramIcon />,
      dawg: <DawgIcon />,
      default: <TwitterIcon />,
    };

    return icons[app_name] || icons.default;
  };

  const handleButtonClick = () => {
    if (!userProfile) {
      setOpenSignup(true);
      return;
    }

    if (func) func();
  };

  const buttonContent = funcText || (
    <>
      <span className="sm:block hidden">Verify</span>
      <ArrowUpRightIcon size={10} />
    </>
  );

  return (
    <>
      <div className="quest rounded-full w-full flex justify-between gap-5 p-4 px-5 pl-6 bg-black/60 border border-white/60 text-white relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg.png')] after:bg-no-repeat after:bg-center after:bg-cover">
        <div className="flex gap-4 items-center">
          <div className="max-[340px]:hidden">
            {renderQuestIcon(quest.app_name as IconKey)}
          </div>
          <p className="text-[16px] text-start line-clamp-2">{quest.todo}</p>
          <div className="rounded-full overflow-hidden bg-[linear-gradient(90deg,_#FFBE00_0%,_#229EFF_100%)] p-[1px]">
            <div className="text-xs bg-black/90 p-1 px-2.5 rounded-full flex items-center gap-0.5 text-nowrap">
              {quest.point} <span className="sm:block hidden">Points</span>
              <PlusIcon className="sm:hidden block" size={12} />
            </div>
          </div>
        </div>

        {func ? (
          <Button
            className="bg-[#FFBE00] text-black text-sm rounded-full sm:px-5! sm:py-[22px]! py-[20px]! cursor-pointer hover:bg-[#FFBE00]/80!"
            onClick={handleButtonClick}
          >
            {buttonContent}
          </Button>
        ) : userProfile ? (
          <a href={quest.link} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#FFBE00] text-black text-sm rounded-full sm:px-5! sm:py-[22px]! py-[20px]! cursor-pointer hover:bg-[#FFBE00]/80!">
              {buttonContent}
            </Button>
          </a>
        ) : (
          <Button
            className="bg-[#FFBE00] text-black text-sm rounded-full sm:px-5! sm:py-[22px]! py-[20px]! cursor-pointer hover:bg-[#FFBE00]/80!"
            onClick={() => setOpenSignup(true)}
          >
            {buttonContent}
          </Button>
        )}
      </div>

      {openSignup && (
        <SignupAlert open={openSignup} onClose={() => setOpenSignup(false)} />
      )}
    </>
  );
};
