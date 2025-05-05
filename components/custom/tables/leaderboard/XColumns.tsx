import { ColumnDef } from "@tanstack/react-table";
import { InfoIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatNumberWithCommas, getNumberSuffix } from "@/lib/common";
import { XLeaderboardType } from "@/lib/type";

export const x_columns: ColumnDef<XLeaderboardType>[] = [
  {
    accessorKey: "rank",
    header: () => (
      <div className="text-white flex items-center">
        Rank
        <InfoIcon className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="w-7 h-7 min-w-7 min-h-7">
          <AvatarImage src={row.original.avatar} />
          <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500"></AvatarFallback>
        </Avatar>
        <span className="text-white font-medium">
          {row.getValue("rank")}
          {getNumberSuffix(row.getValue("rank"))} Place
        </span>
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: () => <div className="text-white">User</div>,
    cell: ({ row }) => (
      <div className="text-white">
        <a
          href={`https://x.com/${row.getValue("username")}`}
          className="block text-white font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          {row.getValue("username")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "tasks",
    header: () => <div className="text-white">Tasks Completed</div>,
    cell: ({ row }) => (
      <div className="text-white">{row.getValue("tasks")} Tasks</div>
    ),
  },
  {
    accessorKey: "points",
    header: () => <div className="text-white">Points</div>,
    cell: ({ row }) => {
      // const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF"];
      // const color = colors[Math.floor(Math.random() * colors.length)];

      return (
        <div className="flex items-center gap-2">
          <span>🍖</span>

          <span className="text-white">
            {formatNumberWithCommas(row.getValue("points"))}
          </span>
        </div>
      );
    },
  },
];
