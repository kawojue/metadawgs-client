import { ColumnDef } from "@tanstack/react-table";
import { InfoIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LeaderboardType } from "@/lib/type";
import { formatNumberWithCommas, getNumberSuffix } from "@/lib/common";

export const telegram_columns: ColumnDef<LeaderboardType>[] = [
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
          <AvatarImage src={row.getValue("avatar")} />
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
      <div className="text-white">{row.getValue("username")}</div>
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
      const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      return (
        <div className="flex items-center gap-2">
          <svg
            width="15"
            height="12"
            viewBox="0 0 15 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8366 6.00178V7.33512C14.8366 9.54425 11.5533 11.3351 7.50327 11.3351C3.5255 11.3351 0.287429 9.60765 0.173049 7.45305L0.169922 7.33512V6.00178C0.169922 8.21092 3.45317 10.0018 7.50327 10.0018C11.5533 10.0018 14.8366 8.21092 14.8366 6.00178ZM7.50327 0.668457C11.5533 0.668457 14.8366 2.45932 14.8366 4.66845C14.8366 6.87758 11.5533 8.66845 7.50327 8.66845C3.45317 8.66845 0.169922 6.87758 0.169922 4.66845C0.169922 2.45932 3.45317 0.668457 7.50327 0.668457Z"
              fill={color}
            />
          </svg>

          <span className="text-white">
            {formatNumberWithCommas(row.getValue("points"))}
          </span>
        </div>
      );
    },
  },
];
