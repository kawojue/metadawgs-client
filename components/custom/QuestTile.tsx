"use client";

import { DawgIcon, TelegramIcon, TwitterIcon } from "@/lib/icons";
import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import useLocalStorage from "use-local-storage";
import { XOpenSignUpModal, XUserProfile } from "@/lib/values";
import { QuestType } from "@/lib/type";
import Link from "next/link";

type Props = {
  quest: QuestType;
  func?: () => void;
  funcText?: string | ReactNode;
};

type IconKey = "instagram" | "twitter" | "telegram" | "dawg" | "default";

export const QuestTile = ({ quest, func, funcText }: Props) => {
  const [userProfile] = useLocalStorage(XUserProfile, null);
  const [, setOpenSignup] = useLocalStorage<boolean>(XOpenSignUpModal, false);

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
      <div className="quest-tile">
        <div className="flex gap-4 items-center">
          <div className="max-[340px]:hidden">
            {renderQuestIcon(quest.app_name as IconKey)}
          </div>
          <p className="text-[16px] text-start line-clamp-2">{quest.todo}</p>
          {/* <div className="rounded-full overflow-hidden bg-[linear-gradient(90deg,_#FFBE00_0%,_#229EFF_100%)] p-[1px]">
            <div className="text-xs bg-black/90 p-1 px-2.5 rounded-full flex items-center gap-0.5 text-nowrap">
              {quest.point} <span className="sm:block hidden">Bones</span>
              <PlusIcon className="sm:hidden block" size={12} />
            </div>
          </div> */}
        </div>

        {func ? (
          <Button
            className="bg-[#FFBE00] text-black text-sm rounded-full sm:px-5! sm:py-[22px]! py-[20px]! cursor-pointer hover:bg-[#FFBE00]/80!"
            onClick={handleButtonClick}
          >
            {buttonContent}
          </Button>
        ) : userProfile ? (
          <Link
            href={quest.link}
            target={!quest.inApp ? "_blank" : undefined}
            rel={!quest.inApp ? "noopener noreferrer" : undefined}
            onClick={handleButtonClick}
          >
            <Button className="bg-[#FFBE00] text-black text-sm rounded-full sm:px-5! sm:py-[22px]! py-[20px]! cursor-pointer hover:bg-[#FFBE00]/80!">
              {buttonContent}
            </Button>
          </Link>
        ) : (
          <Button
            className="bg-[#FFBE00] text-black text-sm rounded-full sm:px-5! sm:py-[22px]! py-[20px]! cursor-pointer hover:bg-[#FFBE00]/80!"
            onClick={() => setOpenSignup(true)}
          >
            {buttonContent}
          </Button>
        )}
      </div>
    </>
  );
};
