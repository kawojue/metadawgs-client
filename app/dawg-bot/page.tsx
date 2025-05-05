import Feature from "@/components/custom/Feature";
import LaunchBot from "@/components/custom/LaunchBot";
import { FadeIn, FadeInUp } from "@/components/custom/ScrollAnimation";
import { features } from "@/lib/dummydata";
import Image from "next/image";

export const metadata = {
  title: "DawgBot",
  description: "MetaDawgs AI Terminal: A Next-Gen Solana Hub for Degens.",
};

function page() {
  return (
    <div className="bg-black text-white">
      <div className="p-4 sm:p-6 md:p-10 flex flex-col gap-10 justify-center items-center min-h-dch max-w-screen-2xl mx-auto">
        <FadeInUp>
          <h1 className="title md:text-[76px] sm:text-6xl text-4xl font-fredoka font-bold capitalize tracking-wider text-center">
            DawgBot Nexus:
            <br />
            The ultimate Command Center <br />
            for Degens on Solana.
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
            MetaDawgs Nexus: <br />
            Where Dawgs Gather, <br />
            Build, and Dominate
          </h1>
        </FadeInUp>
        <FadeInUp>
          <p className="text-center text-2xl max-w-5xl mx-auto">
            MetaDawgs Nexus is your all-in-one command center for conquering
            Solana. From sniping tokens and tracking alpha to claiming airdrops
            and deploying smart tools—this is where elite dawgs gather, build,
            and dominate the chain
          </p>
        </FadeInUp>
        <FadeInUp>
          <LaunchBot />
        </FadeInUp>

        <div className="flex gap-4 md:gap-10 flex-wrap justify-center mt-10">
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
