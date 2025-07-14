"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { fetchWithAuth } from "@/lib/api";
import React, { useCallback, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { IDawghouse, MetaType } from "@/lib/type";
import { XRefreshHouse, XRefreshPosts } from "@/lib/values";
import { Loader } from "lucide-react";
import DarkPagination from "@/components/custom/DarkPagination";
import { useRouter, useSearchParams } from "next/navigation";
import JoinDawgHouseModal from "@/components/custom/modals/JoinDawgHouseModal";
import { formatNumberWithCommas } from "@/lib/common";

function HousesGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { userToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [houses, setHouses] = useState<IDawghouse[]>([]);
  const [meta, setMeta] = useState<MetaType | null>(null);
  const [refreshPosts] = useLocalStorage<string>(XRefreshPosts, "");
  const [refreshHouse] = useLocalStorage<string>(XRefreshHouse, "");
  const [joinHouseOpen, setJoinHouseOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<IDawghouse | null>(null);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("q");

  const limit = 25;

  const fetchHouses = useCallback(
    async (page: number = 1) => {
      if (!userToken) {
        setHouses([]);
        setMeta(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const endpoint = `/dawghouses?page=${page}&limit=${limit}${
          search ? `&search=${search}` : ""
        }`;

        const response = await fetchWithAuth<{
          data: IDawghouse[];
          meta: MetaType;
        }>(endpoint);

        setHouses(response.data.data);

        setMeta(response.data.meta);
      } catch (error) {
        console.error("Failed to fetch houses:", error);
        setError("Failed to load dawghouses. Please try again later.");
        setHouses([]);
        setMeta(null);
      } finally {
        setLoading(false);
      }
    },
    [userToken, limit, search]
  );

  useEffect(() => {
    fetchHouses(currentPage);
  }, [fetchHouses, refreshPosts, currentPage, refreshHouse]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  function joinHouse(house: IDawghouse) {
    setSelectedHouse(house);
    setJoinHouseOpen(true);
  }

  if (loading) {
    return (
      <div className="p-4 text-center min-h-[150px] flex flex-col items-center justify-center">
        <Loader size={48} className="animate-spin text-[#FFBE00]" />
        <h3 className="text-2xl font-fredoka mt-4">Getting Dawghouses...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center min-h-[150px] flex flex-col items-center justify-center">
        <h3 className="text-2xl font-fredoka text-red-500">{error}</h3>
        <Button
          onClick={() => fetchHouses(currentPage)}
          className="mt-4 bg-[#FFBE00] text-black hover:bg-[#FFBE00]/80"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (houses.length === 0) {
    return (
      <div className="p-4 text-center min-h-[150px] flex flex-col items-center justify-center">
        <h3 className="text-2xl font-fredoka capitalize">
          {!search
            ? "No Dawghouses at the moment"
            : `No Dawghouses with the term '${search}'`}
        </h3>
      </div>
    );
  }

  return (
    <>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:place-items-center grid-cols-2 gap-3 mt-7">
        {houses.map((house) => (
          <div
            key={house.id}
            className="card rounded-2xl col-span-1 grid after:rounded-2xl max-w-[450px] w-full mx-auto pool overflow-hidden drill"
          >
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
              <div className=" bg-transparent font-extrabold text-3xl p-4 flex justify-center items-center flex-col w-full">
                {/* <div className="flex w-full justify-end"></div> */}
                <div className="flex items-center gap-1">
                  <span className="text-xl">🏆</span>
                  <span>{house.rank}</span>
                </div>
              </div>
            </div>
            <div className="info p-4 sm:p-5">
              <Avatar className="size-12 bg-[#FFBE00] mb-6">
                <AvatarImage src={house.creator.avatar} />
                <AvatarFallback className="bg-[#FFBE00] uppercase font-bold text-black">
                  {house.creator.displayName[0]}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-2xl md:text-3xl flex flex-col font-bold capitalize">
                <span className="text-wrap line-clamp-3">{house.name}</span>{" "}
                <span>Dawghouse</span>
              </h3>
              <div className="flex justify-between mt-5 gap-20 items-end">
                <div className="-space-y-1">
                  <span className="block text-3xl md:text-4xl font-bold mt-1">
                    {formatNumberWithCommas(house.totalParticipants)}
                  </span>
                  <span className="block text-xs sm:text-sm">Participants</span>
                </div>
                <div className="rounded-full overflow-hidden bg-gradient-to-r from-[#FFBE00] via-[#FF6B6B] to-[#4ECDC4] p-[2px]">
                  <Button
                    className={`rounded-full !px-6 !py-4 font-medium text-[14px] cursor-pointer transition-colors text-white bg-black`}
                    onClick={() => joinHouse(house)}
                  >
                    Join <UsersRound />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <DarkPagination meta={meta} onPageChange={handlePageChange} />
        </div>
      )}
      {selectedHouse && (
        <JoinDawgHouseModal
          open={joinHouseOpen}
          onClose={() => {
            setJoinHouseOpen(false);
            setSelectedHouse(null);
          }}
          dawgHouse={selectedHouse}
        />
      )}
    </>
  );
}

export default HousesGrid;
