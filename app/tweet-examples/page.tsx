export const runtime = "edge";

import AvatarGroup from "@/components/custom/AvatarGroup";
import { TweetCard } from "@/components/custom/twitter";
import { sampleTweets } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Tweet Example",
  description:
    "Explore example tweets and complete tasks to earn rewards as an early participant in the MetaDawgs ecosystem.",
};

function page() {
  return (
    <div className="bg-black text-white">
      <div className="p-4 sm:p-6 md:p-10 flex flex-col gap-5 justify-center items-center min-h-dch">
        <h1 className="title md:text-[76px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka font-bold uppercase text-center">
          View Quest
          <br />
          Entries Examples
        </h1>

        <p className="text-xl text-[#ACACAC] md:leading-[35px] max-w-[560px] text-center">
          Complete the quest for a chance to earn a guaranteed whitelist spot on
          TGE and earn MetaDawgs token as an early participant in the ecosystem
        </p>
        <div className="pips flex gap-x-4 gap-y-2 flex-wrap items-center justify-center">
          <AvatarGroup />
          <p className="text-xs font-semibold">A Lot Have Participated</p>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full max-w-screen-md  my-4">
          {sampleTweets.map((tweet, index) => (
            <TweetCard tweet={tweet} key={index} />
          ))}
        </div>

        <Link
          href={"/metadawgs-club/#Posts"}
          className="rounded-full px-5! flex items-center justify-center gap-2 font-medium !py-3 bg-[#FFC36C] text-black shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] hover:opacity-80"
        >
          <span>Submit an Entry</span>
          <ArrowUpRight size={16} strokeWidth={3} />
        </Link>
      </div>
    </div>
  );
}

export default page;
