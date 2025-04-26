import AddressButton from "@/components/custom/AddressButton";
import { XLeaderboardTable } from "@/components/custom/tables/leaderboard";
import { FadeInUp } from "@/components/custom/ScrollAnimation";
import Image from "next/image";

function HomeLeaderboardX() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center p-4 sm:p-6 md:p-20 py-15 min-h-dch relative bg-black text-white z-1">
      <FadeInUp className="div relative">
        <h2 className="title md:text-[76px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka text-center font-semibold uppercase">
          Community
          <br />
          Leaderboard
        </h2>

        <Image
          src="/images/badge.svg"
          alt="Badge"
          width={160}
          height={225}
          className="badge absolute -top-2 md:-left-30 -left-15 -z-1 md:w-[160px] w-[80px]"
        />
      </FadeInUp>
      <FadeInUp>
        <p className="text-xl text-[#ACACAC] md:leading-[35px] max-w-[560px] text-center">
          This is for all the dwags, this is for all the grinders on X,
          spreading good vibes and energy, believing in a brighter day and a
          brighter future.
        </p>
      </FadeInUp>
      <FadeInUp>
        <AddressButton />
      </FadeInUp>

      <FadeInUp className="w-full flex flex-col justify-center items-center">
        <XLeaderboardTable />
      </FadeInUp>
    </div>
  );
}

export default HomeLeaderboardX;
