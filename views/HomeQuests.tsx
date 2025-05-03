// import AuthUserButton from "@/components/AuthUserButton";
import AvatarGroup from "@/components/custom/AvatarGroup";
import { FadeInUp, ZoomIn } from "@/components/custom/ScrollAnimation";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Quests() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center p-6 md:p-20 py-15 min-h-svh text-center relative bg-black text-white">
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
      {/* <FadeInUp>
        <AuthUserButton />
      </FadeInUp> */}

      <FadeInUp>
        <Link
          href={"/quests/#Posts"}
          className="rounded-full px-5! flex items-center justify-center gap-2 font-medium !py-3 bg-[#FFC36C] text-black shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] hover:opacity-80"
        >
          <span>Join Quests</span>
          <ArrowUpRight size={16} strokeWidth={3} />
        </Link>
      </FadeInUp>

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
