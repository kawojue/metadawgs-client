"use client";

import AvatarGroup from "@/components/custom/AvatarGroup";
import PostCard from "@/components/custom/PostCard";
import { QuestTile } from "@/components/custom/QuestTile";
import ReferralTile from "@/components/custom/ReferralTile";
import { FadeInUp, SlideInLeft } from "@/components/custom/ScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/api";
import { quests } from "@/lib/dummydata";
import { PostType } from "@/lib/type";
import { authWithTwitter } from "@/lib/utils";
import { XRefreshTable, XUserToken } from "@/lib/values";
import Image from "next/image";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

function Page() {
  const [userToken] = useLocalStorage(XUserToken, "");
  const [refreshTable] = useLocalStorage<string>(XRefreshTable, '');
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);
        const { data } = await fetchWithAuth<PostType[]>("/posts");
        console.log("Posts", data, loading);

        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTable]);

  return (
    <div className="">
      <div className="bg-black text-white p-4 sm:p-6 md:p-10 flex flex-col gap-5 justify-center items-center min-h-dch">
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
      {!!userToken && (
        <div className="conquests space-y-14 lg:py-[5%] p-6">
          <SlideInLeft className="onboarding md:mx-[5%] lg:mx-[15%]">
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
                      <li>
                        <ReferralTile />
                      </li>
                      {quests.map((quest) => (
                        <li key={quest.id}>
                          <QuestTile quest={quest} />
                        </li>
                      ))}
                    </ul>

                    {quests.length == 0 && (
                      <div className="p-4 text-center">
                        <h3 className="text-2xl font-fredoka">No Quests</h3>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SlideInLeft>
          <SlideInLeft className="social_quests md:mx-[5%] lg:mx-[15%]">
            <Accordion type="single" collapsible className="w-full" id="Posts">
              <AccordionItem value="social_quests">
                <AccordionTrigger className="cursor-pointer">
                  <h3 className="text-3xl font-fredoka font-semibold capitalize">
                    social quests
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="quests-box w-full sm:mt-8 mt-4 max-h-[500px] overflow-y-auto">
                    {loading && (
                      <div className="p-4 text-center">
                        <h3 className="text-2xl font-fredoka">Loading...</h3>
                      </div>
                    )}

                    {!loading && posts.length > 0 && (
                      <div className="grid xl:grid-cols-3 md:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:place-items-center grid-cols-2 md:gap-5 gap-3">
                        {posts.map((post) => (
                          <PostCard post={post} key={post.id} />
                        ))}
                      </div>
                    )}

                    {!loading && posts.length == 0 && (
                      <div className="p-4 text-center">
                        <h3 className="text-2xl font-fredoka">No Posts</h3>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SlideInLeft>
        </div>
      )}
      {!userToken && (
        <div className="lg:py-[5%] p-6 md:mx-[5%] lg:mx-[15%]">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="circle bg-black rounded-full p-2.5 mb-1">
              <Image
                src={"/images/paw.svg"}
                alt="warning"
                width={100}
                height={100}
              />
            </div>
            <h3 className="text-center font-fredoka text-3xl">
              Authentication Required!
            </h3>
            <p className="text-center max-w-[480px] text-base">
              Ready to embark on epic quests and earn rewards? First, you need
              to authenticate! and start collecting sparks for your MetaDawgs
              journey!
            </p>
            <Button
              className="w-fit py-6! px-5! rounded-full cursor-pointer bg-[#FFBE00] text-black"
              onClick={() => {
                authWithTwitter();
              }}
            >
              <svg
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99204 7.76733L9.1665 12H13.8332L8.5943 5.01487L12.9537 0H11.187L7.77604 3.92385L4.83317 0H0.166504L5.17374 6.67633L0.545937 12H2.31262L5.99204 7.76733ZM9.83317 10.6667L2.83317 1.33333H4.1665L11.1665 10.6667H9.83317Z"
                  fill="black"
                />
              </svg>{" "}
              Sign in with X
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
