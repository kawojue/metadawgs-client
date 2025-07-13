/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Heart, SparklesIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  copyToClipboard,
  formatNumberWithCommas,
  hashAddress,
} from "@/lib/common";
import { toast } from "sonner";
import { ProfileType } from "@/lib/type";

interface Utils {
  userProfile?: ProfileType;
  [key: string]: any;
}

export interface StatsCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  type: "text" | "component" | "custom";
}

interface StatsData {
  [key: string]: any;
}

interface CustomTransformers {
  [key: string]: (value: any, utils: Utils) => any;
}

interface StatsGridProps {
  data?: StatsData;
  utils?: Utils;
  statsCards?: StatsCard[];
  customTransformers?: CustomTransformers;
}

const transformStatsData = (
  data: StatsData,
  utils: Utils = {},
  customTransformers: CustomTransformers = {}
) => {
  const formatValue = (value: number) => {
    return formatNumberWithCommas(value || 0) || "0";
  };

  const defaultTransformations: CustomTransformers = {
    posts: (value) => formatValue(value),
    postsTotal: (value) => formatValue(value),
    engagements: (value) => formatValue(value),
    engagementsTotal: (value) => formatValue(value),
    bones: (value) => formatValue(value),
    bonesTotal: (value) => formatValue(value),
    superBones: (value) => formatValue(value),
    superBonesTotal: (value) => formatValue(value),
    referral: (value) => {
      if (!utils?.userProfile) {
        return value || "N/A";
      }

      const referralUrl = `https://metadawgs.com/metadawgs-club?ref=${utils?.userProfile.referralCode}`;
      return (
        <Button
          className="bg-[#A078FF] p-1.5 px-2.5 rounded-full cursor-pointer text-sm hover:bg-[#A078FF]/80 flex items-center gap-2"
          onClick={() => {
            copyToClipboard!(referralUrl);
            toast!("Referral link is saved to the clipboard");
          }}
        >
          <span className="block sm:hidden">
            {hashAddress!(referralUrl, 1)}
          </span>
          <span className="sm:block hidden">
            {hashAddress!(referralUrl, 8)}
          </span>
          <CopyIcon />
        </Button>
      );
    },
  };

  const transformations = { ...defaultTransformations, ...customTransformers };

  const transformedData: StatsData = {};
  Object.entries(data).forEach(([key, value]) => {
    if (transformations[key]) {
      transformedData[key] = transformations[key](value, utils);
    } else {
      transformedData[key] = value;
    }
  });

  return transformedData;
};

const defaultStatsCards: StatsCard[] = [
  {
    id: "posts",
    title: "No. of posts",
    icon: "💬",
    type: "text",
  },
  {
    id: "engagements",
    title: "No. of engagements",
    icon: <Heart fill="red" className="text-[red]" size={32} />,
    type: "component",
  },
  {
    id: "bones",
    title: "Your MindShare Creators' Bones",
    icon: "🍖",
    type: "text",
  },
  {
    id: "superBones",
    title: "Your MindShare Super Bones",
    icon: (
      <SparklesIcon
        size={32}
        fill="#FFBE00"
        className="text-[#FFBE00]"
        strokeWidth={1}
      />
    ),
    type: "component",
  },
  {
    id: "referral",
    title: "Referral Link",
    icon: "🤝",
    type: "custom",
  },
];

const StatsGrid: React.FC<StatsGridProps> = ({
  data = {},
  utils = {},
  statsCards = defaultStatsCards,
  customTransformers = {},
}) => {
  const transformedData = transformStatsData(data, utils, customTransformers);

  const renderCardValue = (card: StatsCard) => {
    const value = transformedData[card.id];
    const totalValue = transformedData[`${card.id}Total`];

    if (card.type === "custom") {
      return value;
    }

    return (
      <p className="text-3xl font-bold">
        {value || "0"}
        {totalValue && (
          <span className="text-lg text-gray-400 ml-1">/{totalValue}</span>
        )}
      </p>
    );
  };

  const renderIcon = (card: StatsCard) => {
    return <div className="icon text-3xl">{card.icon}</div>;
  };

  return (
    <div className="grid gap-4 max-[350px]:grid-cols-1 grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
      {statsCards.map((card) => (
        <div
          key={card.id}
          className="card bg-white/5 col-span-1 flex-col-reverse sm:flex-row h-full rounded-md flex sm:items-center sm:justify-between gap-4 gap-y-5 p-4"
        >
          <div
            className={`flex flex-col gap-3 ${
              card.id === "referral" ? "sm:gap-3" : "sm:gap-2"
            }`}
          >
            <h4
              className={`title ${
                card.id === "referral"
                  ? "text-sm sm:text-base"
                  : "text-text-sm sm:base"
              }`}
            >
              {card.title}
            </h4>
            {renderCardValue(card)}
          </div>
          {renderIcon(card)}
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
