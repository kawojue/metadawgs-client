import { Quest } from "@/lib/type";
import { TelegramIcon, TwitterIcon } from "@/lib/icons";
import { ArrowUpRightIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { quest: Quest };

export const QuestTile = ({ quest }: Props) => {
  function renderQuestIcon(app_name: string) {
    switch (app_name) {
      case "instagram":
        return <TwitterIcon />;
      case "twitter":
        return <TwitterIcon />;
      case "telegram":
        return <TelegramIcon />;

      default:
        return <TwitterIcon />;
    }
  }

  return (
    <div className="quest rounded-full h-19 w-full col-span-1 flex text-white justify-between gap-5 p-4 px-5 pl-6 bg-black/60 border border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg.png')] after:bg-no-repeat after:bg-cover">
      <div className="lint flex gap-4 items-center">
        <div className="app-icon max-[340px]:hidden">
          {renderQuestIcon(quest.app_name)}
        </div>
        <p className="info text-[16px] text-start line-clamp-2">{quest.todo}</p>
        <div className="rounded-full overflow-hidden bg-[linear-gradient(90deg,_#FFBE00_0%,_#229EFF_100%)] p-[1px]">
          <div className="point-pill text-xs bg-black/90 p-1 px-2.5 rounded-full flex flex-nowrap items-center gap-0.5 text-nowrap">
            {quest.point} <span className="sm:block hidden">Points</span>{" "}
            <PlusIcon className="sm:hidden block" size={12} />
          </div>
        </div>
      </div>

      <a href={quest.link} className="block">
        <Button className="verify bg-[#FFBE00] text-black text-sm rounded-full sm:px-5! sm:py-[22px]! py-[20px]! cursor-pointer hover:text-white!">
          <span className="sm:block hidden">Verify</span>
          <ArrowUpRightIcon size={10} />
        </Button>
      </a>
    </div>
  );
};
