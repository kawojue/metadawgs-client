import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="div">
      <div className="banner bg-black text-white h-svh w-full grid place-content-center place-items-center p- sm:p-6 md:p-10">
        <div className="inner grid md:grid-cols-[0.7fr_0.3fr] gap-4 md:gap-14 items-center justify-center">
          <div className="info space-y-6">
            <h1 className="title text-[96px] leading-[100px] tracking-[-2px] font-fredoka font-semibold uppercase">
              MetaDawgs
              <br />
              For the bold &<br />
              the grinders.
            </h1>
            <p className="text-2xl text-[#ACACAC] leading-[35px] max-w-[620px]">
              This is for all the dawgs, this is for all the grinders on X,
              spreading good vibes and energy, believing in a brighter day and a
              brighter future.
            </p>
            <Button className="bg-[#9D4EDD] rounded-full px-5! py-6! text-base cursor-pointer">
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
          </div>
          <div className="dog mx-auto">
            <Image
              src="/images/dog.png"
              alt="MetaDawgs"
              width={400}
              height={690}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
