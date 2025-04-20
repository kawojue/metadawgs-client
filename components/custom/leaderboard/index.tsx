'use client'

import { columns } from "./Columns";
import { DataTable } from "./DataTable";

export type LeaderboardEntry = {
  rank: string;
  user: string;
  tasksCompleted: number;
  points: string;
  color: "yellow" | "green" | "blue";
};

const data: LeaderboardEntry[] = [
  {
    rank: "1st Place",
    user: "thezenmuo",
    tasksCompleted: 46,
    points: "92,123,056",
    color: "yellow",
  },
  {
    rank: "2nd Place",
    user: "raiseemtheboy",
    tasksCompleted: 45,
    points: "84,567,890",
    color: "green",
  },
  {
    rank: "3rd Place",
    user: "songbird",
    tasksCompleted: 39,
    points: "76,543,210",
    color: "blue",
  },
  {
    rank: "4th Place",
    user: "cloudchaser",
    tasksCompleted: 19,
    points: "90,123,456",
    color: "yellow",
  },
  {
    rank: "5th Place",
    user: "vibecheck",
    tasksCompleted: 78,
    points: "88,765,432",
    color: "green",
  },
  {
    rank: "6th Place",
    user: "nightowl",
    tasksCompleted: 36,
    points: "91,234,567",
    color: "yellow",
  },
  {
    rank: "7th Place",
    user: "dreamwatcher",
    tasksCompleted: 23,
    points: "65,678,901",
    color: "blue",
  },
];

export default function LeaderboardTable() {
  return (
    <div className="w-full max-w-3xl">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
