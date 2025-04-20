import AvatarGroup from "@/components/custom/AvatarGroup";
import { Button } from "@/components/ui/button";
import { TelegramIcon, TwitterIcon } from "@/lib/icons";
import { ArrowUpRight, PlusIcon } from "lucide-react";
import Image from "next/image";

function Quests() {
  const quests = [
    {
      id: 1,
      point: 20,
      todo: "Follow @metadwags on Twitter",
      app_name: "twitter",
      link: "",
    },
    {
      id: 2,
      point: 20,
      todo: "Join our Telegram Community",
      app_name: "telegram",
      link: "",
    },
    {
      id: 3,
      point: 20,
      todo: "Participate in the Weekly Contest",
      app_name: "twitter",
      link: "",
    },
  ];

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
    <div
      className="flex flex-col gap-6 items-center justify-center p-4 sm:p-6 md:p-20 min-h-svh text-center relative"
      id="Quest"
    >
      <h1 className="title md:text-[76px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka font-semibold uppercase">
        Complete Quests,
        <br />
        Collect Sparks & Earn
        <br />
        MetaDawgs Token
      </h1>
      <p className="text-xl text-[#ACACAC] md:leading-[35px] max-w-[560px]">
        Complete the following tasks to stand a chance to earn more metadawgs as
        an early participant in the ecosystem
      </p>
      <div className="pips flex gap-x-4 gap-y-2 flex-wrap items-center justify-center">
        <AvatarGroup />
        <p className="text-xs font-semibold">30K Have Participated</p>
      </div>
      <Button className="bg-[black] shadow-[rgba(255,_255,_255,_0.4)] rounded-full px-5! py-6! text-sm cursor-pointer">
        <svg
          width="15"
          height="12"
          viewBox="0 0 15 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.49204 7.76733L9.6665 12H14.3332L9.0943 5.01487L13.4537 0H11.687L8.27604 3.92385L5.33317 0H0.666504L5.67374 6.67633L1.04594 12H2.81262L6.49204 7.76733ZM10.3332 10.6667L3.33317 1.33333H4.6665L11.6665 10.6667H10.3332Z"
            fill="white"
          />
        </svg>
        <span>Continue with X</span>
      </Button>

      <div className="quests-box w-full max-w-3xl sm:mt-4 mt-2">
        <ul className="grid grid-cols-1 md:gap-5 gap-3">
          {quests.map((quest) => (
            <li key={quest.id}>
              <div className="quest rounded-full h-19 w-full col-span-1 flex text-white justify-between gap-5 p-4 px-5 pl-6 bg-black/60 border border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative after:absolute after:-z-10 after:rounded-full after:left-0 after:top-0 after:size-full after:bg-[url('/images/quest-bg.png')] after:bg-no-repeat after:bg-cover">
                <div className="lint flex gap-4 items-center">
                  <div className="app-icon max-[340px]:hidden">
                    {renderQuestIcon(quest.app_name)}
                  </div>
                  <p className="info text-[16px] text-start line-clamp-2">
                    {quest.todo}
                  </p>
                  <div className="rounded-full overflow-hidden bg-[linear-gradient(90deg,_#FFBE00_0%,_#229EFF_100%)] p-[1px]">
                    <div className="point-pill text-xs bg-black/90 p-1 px-2.5 rounded-full flex flex-nowrap items-center gap-0.5 text-nowrap">
                      {quest.point}{" "}
                      <span className="sm:block hidden">Points</span>{" "}
                      <PlusIcon className="sm:hidden block" size={12} />
                    </div>
                  </div>
                </div>

                <a href={quest.link} className="block">
                  <Button className="verify bg-[#FFBE00] text-black text-sm rounded-full sm:px-5! sm:py-[22px]! py-[20px]! cursor-pointer hover:text-white!">
                    <span className="sm:block hidden">Verify</span>
                    <ArrowUpRight size={10} />
                  </Button>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="dog mx-auto absolute bottom-5 right-5 -z-10">
        <Image
          src="/images/small_dog.svg"
          alt="Small MetaDawgs"
          width={230}
          height={260}
        />
      </div>
    </div>
  );
}

export default Quests;
