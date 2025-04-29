import { FadeInUp, SlideInRight } from "@/components/custom/ScrollAnimation";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

function page() {
  return (
    <div>
      <div className="bg-black text-white p-4 sm:p-6 md:p-10 flex flex-col gap-10 justify-center items-center min-h-dch">
        <FadeInUp>
          <h1 className="title md:text-[76px] sm:text-6xl text-4xl font-fredoka font-bold capitalize tracking-wider text-center">
            Welcome to the
            <br />
            Telegram Invite Race!
          </h1>
        </FadeInUp>

        <ul className="grid gap-6 md:gap-8 max-w-2xl mx-auto">
          <SlideInRight>
            <li className="flex gap-5">
              <div className="border-2 mt-0.5 font-medium shadow-[inset_0px_-1.5px_3px_0px_rgba(0,0,0,0.4)] border-white rounded-full size-[30px] min-w-[30px] grid place-items-center place-content-center text-white bg-[#FFBE00]">
                1
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold font-fredoka text-xl md:text-2xl">
                  Step into the Arena. 🥊
                </span>
                <span className="text-[#ACACAC] md:text-xl text-lg">
                  Join our official Telegram group - the battleground awaits!
                </span>
              </div>
            </li>
          </SlideInRight>
          <SlideInRight>
            <li className="flex gap-5">
              <div className="border-2 mt-0.5 font-medium shadow-[inset_0px_-1.5px_3px_0px_rgba(0,0,0,0.4)] border-white rounded-full size-[30px] min-w-[30px] grid place-items-center place-content-center text-white bg-[#A078FF]">
                2
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold font-fredoka text-xl md:text-2xl">
                  Arm Yourself with Your Invite Link. ⚔
                </span>
                <span className="text-[#ACACAC] md:text-xl text-lg">
                  Use our Invite Bot to generate your unique invite link.
                </span>
              </div>
            </li>
          </SlideInRight>
          <SlideInRight>
            <li className="flex gap-5">
              <div className="border-2 mt-0.5 font-medium shadow-[inset_0px_-1.5px_3px_0px_rgba(0,0,0,0.4)] border-white rounded-full size-[30px] min-w-[30px] grid place-items-center place-content-center text-white bg-[#00C159]">
                3
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold font-fredoka text-xl md:text-2xl">
                  Recruit, Score, Dominate. 🏆
                </span>
                <span className="text-[#ACACAC] md:text-xl text-lg">
                  Share your link far and wide! Every friend you bring in nets
                  you <strong className="text-white">5 Points</strong>. Rack up points, crush the
                  leaderboard, and prove
                  {"you’re"} the ultimate champion!
                </span>
              </div>
            </li>
          </SlideInRight>
        </ul>

        <FadeInUp>
          <Link href={"/leaderboard/telegram"} className="block">
            <Button className="rounded-full px-7! font-medium !py-6 bg-[#08A5D9]">
              View Leaderboard <ArrowUpRight strokeWidth={3} />
            </Button>
          </Link>
        </FadeInUp>
      </div>
    </div>
  );
}

export default page;
