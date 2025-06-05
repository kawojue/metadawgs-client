"use client";

import { FadeIn, FadeInUp } from "@/components/custom/ScrollAnimation";
import { Button } from "@/components/ui/button";
import siteConfig from "@/lib/siteConfig";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import OnboardingModal from "./modals/OnboardModal";
import { useState } from "react";
import { useBooleanQuery } from "@/hooks/use-query";

function Onboarding({
  setIsOnboarded,
}: {
  setIsOnboarded: (value: boolean) => void;
}) {
  const [continueAuth] = useBooleanQuery("c_a", false);
  const [onboardOpen, setOnboardOpen] = useState<boolean>(continueAuth);

  const continueOn = () => {
    setIsOnboarded(true);
    setOnboardOpen(false);
  };

  return (
    <>
      <div className="bg-black text-white p-4 sm:p-6 md:p-10 flex flex-col gap-6 md:gap-12 justify-center items-center min-h-dch">
        <FadeIn>
          <h1 className="title md:text-[64px] sm:text-5xl text-4xl font-fredoka font-bold capitalize tracking-wider text-center">
            Welcome to
            <br />
            Metadawgs GrindFi <br />
            Club!
          </h1>
        </FadeIn>

        <ul className="grid gap-4 max-w-2xl mx-auto">
          <FadeInUp>
            <li className="flex gap-5 pool rounded-2xl after:rounded-2xl p-6 sm:p-8">
              <div className="border-2 mt-0.5 font-medium shadow-[inset_0px_-1.5px_3px_0px_rgba(0,0,0,0.4)] rounded-full size-[30px] min-w-[30px] border-[#FFBE00]">
                <Image
                  width={30}
                  height={30}
                  alt="A"
                  className="object-cover"
                  src={"/images/man-avatar.png"}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold font-fredoka text-xl md:text-2xl">
                  Join the MetaDawgs Creators Club
                </span>
                <span className="text-[#ACACAC] md:text-xl text-lg">
                  Join our official{" "}
                  <a
                    href={siteConfig.socialLinks.telegram}
                    className="font-bold text-white"
                  >
                    Telegram
                  </a>{" "}
                  group - the battleground awaits!
                </span>
              </div>
            </li>
          </FadeInUp>
          <FadeInUp>
            <li className="flex gap-5 pool rounded-2xl after:rounded-2xl p-6 sm:p-8">
              <div className="border-2 mt-0.5 font-medium shadow-[inset_0px_-1.5px_3px_0px_rgba(0,0,0,0.4)] rounded-full size-[30px] min-w-[30px] border-[#A078FF]">
                <Image
                  width={30}
                  height={30}
                  alt="A"
                  className="object-cover"
                  src={"/images/man-avatar.png"}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold font-fredoka text-xl md:text-2xl">
                  Participate In the MetaDawgs Grinders Quest{" "}
                </span>
                <span className="text-[#ACACAC] md:text-xl text-lg">
                  Use our Invite Bot to generate your unique invite link.
                </span>
              </div>
            </li>
          </FadeInUp>
          <FadeInUp>
            <li className="flex gap-5 pool rounded-2xl after:rounded-2xl p-6 sm:p-8">
              <div className="border-2 mt-0.5 font-medium shadow-[inset_0px_-1.5px_3px_0px_rgba(0,0,0,0.4)] rounded-full size-[30px] min-w-[30px] border-[#00C159]">
                <Image
                  width={30}
                  height={30}
                  alt="A"
                  className="object-cover"
                  src={"/images/man-avatar.png"}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold font-fredoka text-xl md:text-2xl">
                  Grind the MetaDawgs Telegram Quest{" "}
                </span>
                <span className="text-[#ACACAC] md:text-xl text-lg">
                  Join our official Telegram group - the battleground awaits!
                </span>
              </div>
            </li>
          </FadeInUp>
          <FadeInUp>
            <li className="flex gap-5 pool rounded-2xl after:rounded-2xl p-6 sm:p-8">
              <div className="border-2 mt-0.5 font-medium shadow-[inset_0px_-1.5px_3px_0px_rgba(0,0,0,0.4)] rounded-full size-[30px] min-w-[30px] border-[#c12700]">
                <Image
                  width={30}
                  height={30}
                  alt="A"
                  className="object-cover"
                  src={"/images/man-avatar.png"}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold font-fredoka text-xl md:text-2xl">
                  Recruit, Score, Dominate. 🏆
                </span>
                <span className="text-[#ACACAC] md:text-xl text-lg">
                  Share your link far and wide! Every friend you bring in nets
                  you <strong className="text-white">5 Bones</strong>. Rack up
                  points, crush the leaderboard, and prove
                  {"you’re"} the ultimate champion!
                </span>
              </div>
            </li>
          </FadeInUp>
        </ul>

        <Button
          className="rounded-full px-7! font-medium !py-6 bg-[#08A5D9]"
          onClick={() => setOnboardOpen(true)}
        >
          Join Metadawgs Club <ArrowUpRight strokeWidth={3} />
        </Button>
      </div>

      <OnboardingModal
        open={onboardOpen}
        onClose={() => setOnboardOpen(false)}
        toggleOpen={() => setOnboardOpen(true)}
        continueOn={continueOn}
      />
    </>
  );
}

export default Onboarding;
