import AuthUserButton from "@/components/AuthUserButton";
import AvatarGroup from "@/components/custom/AvatarGroup";
import { QuestTile } from "@/components/custom/QuestTile";
import {
  FadeInUp,
  SlideInLeft,
  ZoomIn,
} from "@/components/custom/ScrollAnimation";
import { quests } from "@/lib/dummydata";
import Image from "next/image";

function Quests() {
  return (
    <div
      className="flex flex-col gap-6 items-center justify-center p-4 sm:p-6 md:p-20 py-15 min-h-svh text-center relative"
      id="Quests"
    >
      <FadeInUp>
        <h2 className="title md:text-[76px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka font-semibold uppercase">
          Complete Quests,
          <br />
          Collect Sparks & Earn
          <br />
          MetaDawgs Token
        </h2>
      </FadeInUp>
      <FadeInUp>
        <p className="text-xl text-[#ACACAC] md:leading-[35px] max-w-[560px]">
          Complete the following tasks to stand a chance to earn more metadawgs
          as an early participant in the ecosystem
        </p>
      </FadeInUp>

      <FadeInUp className="pips flex gap-x-4 gap-y-2 flex-wrap items-center justify-center">
        <AvatarGroup />
        <p className="text-xs font-semibold">30K Have Participated</p>
      </FadeInUp>
      <FadeInUp>
       <AuthUserButton/>
      </FadeInUp>

      <div className="quests-box w-full max-w-3xl sm:mt-4 mt-2">
        <ul className="grid grid-cols-1 md:gap-5 gap-3">
          {quests.map((quest) => (
            <li key={quest.id}>
              <SlideInLeft>
                <QuestTile quest={quest} />
              </SlideInLeft>
            </li>
          ))}
        </ul>
      </div>

      <ZoomIn className="dog mx-auto absolute bottom-5 right-5 -z-10">
        <Image
          src="/images/small_dog.svg"
          alt="Small MetaDawgs"
          width={230}
          height={260}
        />
      </ZoomIn>
    </div>
  );
}

export default Quests;
