"use client";

import Feature from "@/components/custom/Feature";
import LaunchBot from "@/components/custom/LaunchBot";
import { FadeIn, FadeInUp } from "@/components/custom/ScrollAnimation";
import { features } from "@/lib/dummydata";
import Image from "next/image";

function page() {
  return (
    <div className="bg-black text-white">
      <div className="p-4 sm:p-6 md:p-10 flex flex-col gap-10 justify-center items-center min-h-dch max-w-screen-2xl mx-auto">
        <FadeInUp>
          <h1 className="title md:text-[76px] sm:text-6xl text-4xl font-fredoka font-bold capitalize tracking-wider text-center">
            DawgBot Terminal
            <br />
            A Next-Gen Solana Hub <br />
            for Degens
          </h1>
        </FadeInUp>
        <FadeInUp>
          <LaunchBot />
        </FadeInUp>
        <FadeIn className="animate-float">
          <Image
            className="bg-red-400s md:w-4/5 w-full mx-auto"
            src="/images/chant.png"
            alt="MetaDawgs"
            width={1440}
            height={810}
          />
        </FadeIn>

        <FadeInUp>
          <h1 className="title md:text-[76px] sm:text-6xl text-4xl font-fredoka font-bold capitalize tracking-wider text-center px-4">
            MetaDawgs Ai Terminal: A Next-Gen Solana Hub for Degens
          </h1>
        </FadeInUp>
        <FadeInUp>
          <p className="text-center text-2xl md:px-12">
            The MetaDawgs AI Agent Terminal, powered by Sendai Solana AgentKit,
            offers convenience and functionality to degens on Solana. Inspired
            by Telegram’s interactivity, it simplifies user interactions with
            Solana ecosystems through an AI-powered platform.
          </p>
        </FadeInUp>
        <FadeInUp>
          <LaunchBot />
        </FadeInUp>

        <div className="flex gap-4 md:gap-12 flex-wrap justify-center mt-10">
          {features.map((feature, index) => {
            return (
              <FadeInUp key={index}>
                <Feature feature={feature} />
              </FadeInUp>
            );
          })}
        </div>

        <FadeInUp>
          <LaunchBot />
        </FadeInUp>
      </div>
    </div>
  );
}

export default page;
