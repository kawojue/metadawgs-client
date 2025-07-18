"use client";

import { FadeInUp } from "@/components/custom/ScrollAnimation";
import SelectLeaderboardBtn from "@/components/custom/SelectLeaderBoardBtn";
import {
    CreatorsLeaderboardTable,
    GrindersLeaderboardTable,
    OverallLeaderboardTable,
    TelegramLeaderboardTable,
    ReferralsLeaderboardTable,
} from "@/components/custom/tables/leaderboard";
import { useStringQuery } from "@/hooks/use-query";
import { LeaderboardType } from "@/lib/type";

function Leaderboard() {
    const [leaderboardType] = useStringQuery<LeaderboardType>(
        "type",
        "overall"
    );

    return (
        <div
            className="flex flex-col gap-6 md:gap-8 items-center justify-center p-4 sm:p-6 md:p-10 min-h-dch relative bg-black text-white z-1"
            id="Leaderboard"
        >
            <FadeInUp className="w-full text-center flex flex-col justify-center items-center max-w-4xl rounded-2xl pool after:rounded-2xl p-5 sm:p-6 md:py-8 space-y-3 relative after:bg-[linear-gradient(to_right,#000000c8,#000000),url('/images/plane.jpg')] after:bg-cover after:bg-no-repeat">
                <h2 className="title md:text-[64px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka text-center font-semibold capitalize">
                    MetaDawgs
                    <br />
                    Leaderboard
                </h2>
                <p className="text-base text-[#ACACAC] max-w-[400px] text-center">
                    For all the grinders on X, spreading good vibes and
                    believing in a brighter future.
                </p>
            </FadeInUp>

            <FadeInUp>
                <SelectLeaderboardBtn />
            </FadeInUp>

            <FadeInUp className="w-full flex justify-center items-center">
                {leaderboardType === "grinders" && <GrindersLeaderboardTable />}
                {leaderboardType === "creators" && <CreatorsLeaderboardTable />}
                {leaderboardType === "overall" && <OverallLeaderboardTable />}
                {leaderboardType === "telegram" && <TelegramLeaderboardTable />}
                {leaderboardType === "referrals" && (
                    <ReferralsLeaderboardTable />
                )}
            </FadeInUp>
        </div>
    );
}

export default Leaderboard;
