"use client";

import { DawgIcon } from "@/lib/icons";
import { ArrowUpRight, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import useLocalStorage from "use-local-storage";
import { XComingSoonModal } from "@/lib/values";
import { PoolType } from "@/lib/type";

const Pool = ({ pool }: { pool: PoolType }) => {
  const [, setComingSoon] = useLocalStorage(XComingSoonModal, false);

  function addStake() {
    setComingSoon(true);
  }

  function removeStake() {
    setComingSoon(true);
  }

  function claimStake() {
    setComingSoon(true);
  }

  return (
    <div className="min-w-xs rounded-2xl pool col-span-1 sm:aspect-square after:rounded-2xl text-white p-6 md:p-8 flex flex-col justify-between gap-5">
      <div className="space-y-6 md:space-y-8">
        <div className="flex justify-between gap-4 items-center">
          <div className="">
            <span className="block text-[#D5D5D5] font-light text-[14px]">
              {pool.title}
            </span>
            <span className="block">{pool.description}</span>
          </div>

          <Image src={pool.icon} alt={pool.currency} width={40} height={40} />
        </div>
        <div className="flex justify-between gap-4 items-center">
          <div className="space-y-1">
            <span className="block text-[#D5D5D5] font-light text-[14px]">
              Your Stakes
            </span>
            <div className="flex items-center gap-2">
              <DawgIcon />
              <span className="block uppercase">{pool.stakes}</span>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <button
              className="rounded-full border-white border-2 size-7 grid place-content-center place-items-center cursor-pointer hover:opacity-80 bg-green-500"
              onClick={addStake}
            >
              <PlusIcon size={18} />
            </button>
            <button
              className="rounded-full border-white border-2 size-7 grid place-content-center place-items-center cursor-pointer hover:opacity-80 bg-red-500"
              onClick={removeStake}
            >
              <MinusIcon size={18} />
            </button>
          </div>
        </div>
        <div className="flex justify-between gap-4 items-center">
          <div className="space-y-1">
            <span className="block text-[#D5D5D5] font-light text-[14px]">
              Stakes Earned
            </span>
            <span className="block uppercase">{pool.stakesEarned}</span>
          </div>

          <Button
            className="rounded-full bg-[#A078FF] text-black !px-5 !py-4"
            onClick={claimStake}
          >
            Claim
          </Button>
        </div>
        <div className="grid gap-2">
          {pool.details.map((detail, index) => (
            <div
              key={index}
              className="flex justify-between gap-4 items-center"
            >
              <span className="block text-[#D5D5D5] font-light text-[15px]">
                {detail.label}
              </span>
              <span className="block text-[15px]">{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Link
          href={""}
          className="text-center flex items-center gap-2 justify-center text-[14px] font-sans"
        >
          Creator Address <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default Pool;
