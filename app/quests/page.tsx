"use client";

import AvatarGroup from "@/components/custom/AvatarGroup";
import QuestCard from "@/components/custom/QuestCard";
import { QuestTile } from "@/components/custom/QuestTile";
import { FadeInUp, SlideInLeft } from "@/components/custom/ScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchWithAuth } from "@/lib/api";
import { QuestType } from "@/lib/type";
import HomeLeaderboard from "@/views/HomeLeaderboard";
import { useEffect, useState } from "react";

function Page() {
  const [quests, setQuests] = useState<QuestType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getQuests() {
      try {
        setLoading(true);
        const { data } = await fetchWithAuth<QuestType[]>("/posts");
        console.log("Quests", data, loading);

        setQuests(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getQuests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <div className="bg-black text-white p-4 sm:p-6 md:p-10 py-5 flex flex-col gap-5 justify-center items-center min-h-dch">
        <FadeInUp>
          <h1 className="title md:text-[76px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka font-bold uppercase text-center">
            Complete Quests,
            <br />
            Collect Sparks & Earn
            <br />
            MetaDawgs Token
          </h1>
        </FadeInUp>
        <FadeInUp>
          <p className="text-xl text-[#ACACAC] md:leading-[35px] max-w-[560px] text-center">
            Complete the following tasks to stand a chance to earn more
            metadawgs as an early participant in the ecosystem
          </p>
        </FadeInUp>
        <FadeInUp className="pips flex gap-x-4 gap-y-2 flex-wrap items-center justify-center">
          <AvatarGroup />
          <p className="text-xs font-semibold">30K Have Participated</p>
        </FadeInUp>
      </div>
      <div className="conquests space-y-14 md:py-[5%] p-6">
        <SlideInLeft className="onboarding md:mx-[20%]">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="onboarding">
              <AccordionTrigger className="cursor-pointer">
                <h3 className="text-3xl font-fredoka font-semibold">
                  Onboarding
                </h3>
              </AccordionTrigger>
              <AccordionContent>
                <div className="quests-box w-full sm:mt-8 mt-4">
                  <ul className="grid grid-cols-1 md:gap-5 gap-3">
                    {quests.map((quest) => (
                      <li key={quest.id}>
                        <QuestTile quest={quest} />
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SlideInLeft>
        <SlideInLeft className="social_quests md:mx-[20%]">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="social_quests">
              <AccordionTrigger className="cursor-pointer">
                <h3 className="text-3xl font-fredoka font-semibold capitalize">
                  social quests
                </h3>
              </AccordionTrigger>
              <AccordionContent>
                <div className="quests-box w-full sm:mt-8 mt-4">
                  <ul className="grid grid-cols-3 md:gap-5 gap-3">
                    {quests.map((quest) => (
                      <li key={quest.id}>
                        <QuestCard quest={quest} />
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SlideInLeft>
      </div>
      <HomeLeaderboard />
    </div>
  );
}

export default Page;
