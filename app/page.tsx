import { FadeInUp, FadeIn } from "@/components/custom/ScrollAnimation";
import { Button } from "@/components/ui/button";
import FAQ from "@/views/FAQ";
import HomeQuests from "@/views/HomeQuests";
import HomeRoadmap from "@/views/HomeRoadmap";
import HomeTokenomics from "@/views/HomeTokenomics";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="div bg-black text-white">
      <div className="banner min-h-dch size-full grid md:place-content-center relative z-[1]">
        <div className="inner grid md:grid-cols-[1fr_0.6fr]">
          <div className="info md:space-y-6 space-y-4 p-6 md:p-10">
            <FadeInUp>
              <h1 className="title md:text-[90px] text-5xl md:leading-[80px] tracking-[-2px] font-fredoka font-semibold uppercase">
                MetaDawgs
                <br />
                Born in the dip,
                <br />
                built to dominate
              </h1>
            </FadeInUp>
            <FadeInUp className="md:space-y-6 space-y-4">
              <p className="text-xl md:text-2xl xl:text-[#ACACAC] text-white md:leading-[35px] max-w-[600px]">
                We’ve seen the bottom, felt the fear, and kept moving. Meta
                Dawgs don’t fold—we adapt, evolve, and lead. Born in the
                trenches of the digital frontier, we turn volatility into
                opportunity. Join the pack. Own your story.
              </p>
              <Link className="block" href={"/#Quests"} scroll={true}>
                <Button className="bg-[#9D4EDD] rounded-full px-5! py-6! text-base cursor-pointer hover:bg-[#9D4EDD]/80!">
                  <svg
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0041 0.335449C15.0667 0.335449 19.1708 2.57402 19.1708 5.33544V8.66877C19.1708 11.4302 15.0667 13.6688 10.0041 13.6688C5.03187 13.6688 0.984286 11.5094 0.841311 8.81619L0.837402 8.66877V5.33544C0.837402 2.57402 4.94146 0.335449 10.0041 0.335449ZM10.0041 10.3354C6.90369 10.3354 4.16281 9.49586 2.50389 8.21086L2.50407 8.66877C2.50407 10.2373 5.73959 12.0021 10.0041 12.0021C14.1797 12.0021 17.3688 10.31 17.4999 8.76702L17.5041 8.66877L17.5051 8.21019C15.8463 9.49561 13.105 10.3354 10.0041 10.3354ZM10.0041 2.00212C5.73959 2.00212 2.50407 3.76695 2.50407 5.33544C2.50407 6.90394 5.73959 8.66877 10.0041 8.66877C14.2686 8.66877 17.5041 6.90394 17.5041 5.33544C17.5041 3.76695 14.2686 2.00212 10.0041 2.00212Z"
                      fill="white"
                    />
                  </svg>
                  <span>Claim Airdrop</span>
                </Button>
              </Link>
            </FadeInUp>
          </div>

          <FadeIn className="bg-red-400s md:w-[calc(100svh_-_150px)] w-sm absolute right-0 bottom-0 -z-[1]">
            <Image
              className="max-[480px]:opacity-50"
              src="/man.png"
              alt="MetaDawgs"
              width={830}
              height={830}
            />
          </FadeIn>
        </div>
      </div>
      <div id="Quests" className="p-4 bg-black"></div>
      <HomeQuests />
      <div className="animate-float">
        <Image
          className="bg-red-400s md:w-4/5 w-full mx-auto"
          src="/images/chant.png"
          alt="MetaDawgs"
          width={1440}
          height={810}
        />
      </div>
      <HomeTokenomics />
      <HomeRoadmap />
      <FAQ />
    </div>
  );
}
