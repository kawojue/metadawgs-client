import { StatsCard } from "@/components/custom/StatsGrid";
import { TwitterIcon } from "@/lib/icons";
import { DollarSign, Timer, Video, Target } from "lucide-react";

export const dawghouseCards: StatsCard[] = [
    {
        id: "tournamentDuration",
        title: "Tournament Duration",
        icon: <Timer className="text-purple-400" size={32} />,
        type: "text",
    },
    {
        id: "totalEarnings",
        title: "Total Earnings",
        icon: <DollarSign className="text-green-400" size={32} />,
        type: "text",
    },
    {
        id: "earningsGoal",
        title: "Earnings Goal",
        icon: <Target className="text-yellow-400" size={32} />,
        type: "text",
    },

    {
        id: "twitterPosts",
        title: "Total Twitter Posts",
        icon: <TwitterIcon />,
        type: "component",
    },
    {
        id: "totalVideos",
        title: "Number of Videos",
        icon: <Video className="text-green-400" size={32} />,
        type: "component",
    },
    {
        id: "totalDawgs",
        title: "Dawgs in Dawghouse",
        icon: "🐾",
        type: "text",
    },
    {
        id: "dawghouseRank",
        title: "Dawghouse Rank",
        icon: "🏆",
        type: "text",
    },
    {
        id: "earningsReward",
        title: "💰 Earnings Reward",
        icon: <DollarSign className="text-emerald-400" size={32} />,
        type: "component",
    },
];

// Stats cards for regular users
export const elseCards: StatsCard[] = [
    {
        id: "tournamentDuration",
        title: "Tournament Duration",
        icon: <Timer className="text-purple-400" size={32} />,
        type: "text",
    },
    {
        id: "earningsReward",
        title: "💰 Earnings Reward",
        icon: <DollarSign className="text-emerald-400" size={32} />,
        type: "component",
    },
    {
        id: "posts",
        title: "Number of Posts",
        icon: "💬",
        type: "text",
    },
    {
        id: "totalEarnings",
        title: "Total Earnings",
        icon: <DollarSign className="text-green-400" size={32} />,
        type: "text",
    },
    {
        id: "earningsGoal",
        title: "Earnings Goal",
        icon: <Target className="text-yellow-400" size={32} />,
        type: "text",
    },
    // {
    //   id: "referralsGoal",
    //   title: "Referrals Goal",
    //   icon: <Target className="text-green-400" size={32} />,
    //   type: "component",
    // },
    // {
    //   id: "bonesGoal",
    //   title: "Bones Goal",
    //   icon: <Target className="text-green-400" size={32} />,
    //   type: "component",
    // },
    // {
    //   id: "engagementsGoal",
    //   title: "Engagements Goal",
    //   icon: <Target className="text-green-400" size={32} />,
    //   type: "component",
    // },
];
