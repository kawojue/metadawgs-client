"use client";

import CountdownTimer from "@/components/custom/Countdown";
import { FadeIn } from "@/components/custom/ScrollAnimation";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function Page() {
  const [amount, setAmount] = useState<string>("");
  return (
    <div>
      <div className="bg-black text-white p-4 sm:p-6 md:p-15 py-5 flex flex-col gap-5 justify-center items-center">
        <FadeIn>
          <h1 className="title md:text-[76px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka font-bold uppercase text-center">
            Buy $MetaDawgs
            <br />
            Token Now
          </h1>
        </FadeIn>
      </div>

      <div className="box p-[10%] md:pt-[5%] pt-15">
        <div className="wait rounded-2xl bg-[#F5F5F5] flex flex-col gap-5 max-w-lg mx-auto p-6 sm:p-8">
          <CountdownTimer targetDate="2025-12-31T00:00:00Z" />
          <div className="progress w-full bg-gray-300 rounded-full h-4 overflow-hidden">
            <div
              className="bg-green-500 h-full"
              style={{ width: "65%" }} // Adjust the width dynamically as needed
            ></div>
          </div>
          <div className="progress-value">
            <p className="text-lg">
              Raised: <strong>89,353,663 SOL / 34,535,636 SOL</strong>
            </p>
          </div>
          <div className="balance shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)] z-1 rounded-2xl p-3 text-white text-center overflow-hidden relative">
            <h4 className="font-medium text-3xl">0.0003425</h4>
            <p className="text-sm">Solana balance</p>

            <Image
              src="/images/balance-bg.jpeg"
              alt="bg"
              width={400}
              height={100}
              className="image absolute top-0 left-0 size-full -z-1 text-transparent object-cover"
            />
          </div>
          <div className="amount-input flex flex-col gap-2">
            <label htmlFor="amount">Amount</label>
            <input
              className="h-[52px] font-semibold text-lg border border-[#9C9C9C] rounded-full w-full p-4 bg-white"
              type="number"
              value={amount}
              placeholder="0"
              onChange={(x) => {
                setAmount(x.target.value);
              }}
            />
          </div>
          <Button className="bg-[#FFBE00] text-black !py-6 rounded-full">
            <span>Buy Tokens</span>
            <ArrowUpRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
