import { Quest } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";

const QuestCard = ({ quest }: { quest: Quest }) => {
  return (
    <div className="card rounded-2xl col-span-1 grid bg-[#FBFBFB] border border-[#F5F5F5] overflow-hidden">
      <div className="banner aspect-video bg-[#E5E5E5]"></div>
      <div className="info space-y-3 p-4 sm:p-5">
        <div className="rounded-full w-fit overflow-hidden bg-[linear-gradient(90deg,_#FFBE00_0%,_#229EFF_100%)] p-[1px]">
          <div className="point-pill text-xs font-medium bg-[#dfebf5] p-1.5 px-3 rounded-full flex flex-nowrap items-center gap-0.5 text-nowrap">
            {quest.point} MetaDwags
          </div>
        </div>
        <h3 className="title font-semibold font-fredoka text-xl ">
          Post Launch on X
        </h3>
        <p className="text-[#677697] text-[15px]">{quest.todo}</p>
        <div className="flex gap-3 items-center">
          <Button className="rounded-full !px-5 !py-4 font-normal text-black bg-[#92A1C6]">
            <span>View Post</span> <ArrowUpRightIcon size={11} />
          </Button>
          <Button className="rounded-full !px-5 !py-4 font-normal text-black bg-[#FFBE00]">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestCard;
