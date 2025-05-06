import { FadeIn, SlideInRight } from "@/components/custom/ScrollAnimation";
import { roadmap } from "@/lib/data";
import Image from "next/image";

const HomeRoadmap = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="space-y-8 p-6 md:p-20 py-15 relative">
        <h2 className="title md:text-[64px] text-3xl tracking-[-2px] font-fredoka font-semibold uppercase">
          Roadmap
        </h2>

        <div className="flex lg:items-center lg:flex-row flex-col ld:justify-center xl:gap-14 md:gap-10 gap-5">
          <ul className="grid grid-cols-1 sm:gap-8 gap-6">
            {roadmap.map((phase, index) => (
              <SlideInRight key={index} className="col-span-1">
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 min-w-10 min-h-10 bg-[url('/images/man-icon.png')] bg-contain bg-no-repeat bg-center"></div>
                  <span className="text-left md:max-w-sm md:text-3xl text-2xl font-fredoka font-medium">
                    Wave {index + 1}: {phase}
                  </span>
                </li>
              </SlideInRight>
            ))}
          </ul>
          <FadeIn>
            <Image
              src={"/images/man2.png"}
              className="lg:block hidden"
              alt={"MetaDawgs Man"}
              width={540}
              height={540}
            />
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default HomeRoadmap;
