"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import TopBanner from "./TopBanner";
import { Button } from "@/components/ui/button";
import PostsGrid from "./PostsGrid";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SearchIcon, UsersRound } from "lucide-react";

function MindShare() {
  const [inDawgsHouse] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = (searchParams.get("tab") as "live" | "past") || "live";

  const handleTabChange = useCallback(
    (value: "live" | "past") => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", value);
      params.delete("page");
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <>
      <div className="bg-black text-white min-h-screen">
        <div className="conquests space-y-16 p-6">
          <div className="social_quests md:mx-[5%] space-y-4 lg:mx-[18%]">
            <TopBanner inDawgsHouse={inDawgsHouse} />
            <br />
            <div className="space-y-5">
              <h2 className="title text-center md:text-[48px] sm:text-4xl text-3xl font-fredoka font-bold text-white">
                {inDawgsHouse ? `Smth Dawghouse` : "Dawghouses to Join"}
              </h2>
              {!inDawgsHouse && (
                <div className="w-full max-w-lg h-12 rounded-md bg-white/4 mx-auto relative">
                  <button className="left-4 top-1/2 -translate-y-1/2 absolute">
                    <SearchIcon />
                  </button>
                  <input
                    className="w-full h-full rounded-md pl-12 text-white"
                    placeholder="Search dawghouses"
                  />
                </div>
              )}
              {inDawgsHouse && (
                <div className="flex justify-start gap-4 mb-6">
                  <Button
                    className={`rounded-full !px-6 !py-4 font-medium text-[14px] cursor-pointer transition-colors ${
                      activeTab === "live"
                        ? "text-black bg-[#FFBE00]"
                        : "text-white bg-[#1E1E1E]"
                    }`}
                    onClick={() => handleTabChange("live")}
                  >
                    Live
                  </Button>
                  <Button
                    className={`rounded-full !px-6 !py-4 font-medium text-[14px] cursor-pointer transition-colors ${
                      activeTab === "past"
                        ? "text-black bg-[#FFBE00]"
                        : "text-white bg-[#1E1E1E]"
                    }`}
                    onClick={() => handleTabChange("past")}
                  >
                    Past
                  </Button>
                </div>
              )}

              {inDawgsHouse && <PostsGrid activeTab={activeTab} />}

              {!inDawgsHouse && (
                <div className="grid xl:grid-cols-3 md:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:place-items-center grid-cols-2 gap-3 mt-7">
                  <div className="card rounded-2xl col-span-1 grid after:rounded-2xl max-w-[320px] mx-auto pool overflow-hidden drill">
                    {/* <div className="absolute left-1/2 -translate-x-1/2 -top-4">
                      <Image
                        width={30}
                        height={30}
                        src={
                          "https://res.cloudinary.com/kawojue/image/upload/v1752273768/h69u_vn5p_220810_sjapqa.jpg"
                        }
                        alt="House"
                        className=""
                      />
                    </div> */}
                    <div className="absolute right-6 top-6">
                      <div className=" bg-transparent font-bold text-2xl p-4 flex justify-center items-center flex-col w-full">
                        {/* <div className="flex w-full justify-end"></div> */}
                        <div className="">
                          <span>#32</span>
                        </div>
                      </div>
                    </div>
                    <div className="info p-4 sm:p-5">
                      <Avatar className="size-12 bg-[#FFBE00] mb-6">
                        <AvatarFallback className="bg-[#FFBE00]">
                          DA
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg md:text-4xl font-bold">
                        Dave dawghouse
                      </h3>
                      <div className="flex justify-between mt-5 items-end">
                        <div className="-space-y-1">
                          <span className="block text-3xl md:text-4xl font-bold mt-1">
                            30
                          </span>
                          <span className="block text-xs sm:text-sm">
                            Participants
                          </span>
                        </div>
                        <Button
                          className={`rounded-full !px-6 !py-4 font-medium text-[14px] cursor-pointer transition-colors text-black bg-[#FFBE00]`}
                          onClick={() => handleTabChange("live")}
                        >
                          Join <UsersRound />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MindShare;
