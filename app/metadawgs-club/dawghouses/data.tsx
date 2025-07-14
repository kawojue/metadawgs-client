import { StatsCard } from "@/components/custom/StatsGrid";
import { TwitterIcon } from "@/lib/icons";
import { Heart, Users, Timer, Video } from "lucide-react";

export const dawghouseCards: StatsCard[] = [
  {
    id: "tournamentDuration",
    title: "Tournament Duration",
    icon: <Timer className="text-purple-400" size={32} />,
    type: "text",
  },
  {
    id: "totalReferrals",
    title: "Total Referrals",
    icon: <Users className="text-blue-400" size={32} />,
    type: "text",
  },
  {
    id: "totalEngagements",
    title: "Total Engagements",
    icon: <Heart fill="red" className="text-red-400" size={32} />,
    type: "component",
  },
  {
    id: "totalBones",
    title: "Total Bones Earned",
    icon: "🍖",
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
    id: "bonesReward",
    title: "Tournament Bones Reward",
    icon: "🍖",
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
    id: "bonesReward",
    title: "Bones Reward",
    icon: "🍖",
    type: "component",
  },
  {
    id: "posts",
    title: "Number of Posts",
    icon: "💬",
    type: "text",
  },
  {
    id: "engagements",
    title: "Number of Engagements",
    icon: <Heart fill="red" className="text-red-400" size={32} />,
    type: "component",
  },
  {
    id: "superBones",
    title: "Super Bones",
    icon: "🍖",
    type: "component",
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
