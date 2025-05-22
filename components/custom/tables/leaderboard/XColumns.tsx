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
          className="flex gap-2 items-center text-white font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          {row.getValue("username")}
          {row.original?.verified && (
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.631241"
                y="0.911133"
                width="20.7375"
                height="20.7375"
                rx="10.3688"
                fill="white"
              />
              <path
                d="M9.33914 3.03301C8.17117 2.65491 6.90148 3.18083 6.34294 4.27408L5.67146 5.58839C5.59167 5.74456 5.46466 5.87156 5.3085 5.95135L3.99419 6.62283C2.90094 7.18137 2.37502 8.45107 2.75311 9.61903L3.20766 11.0232C3.26167 11.19 3.26167 11.3697 3.20766 11.5365L2.75311 12.9407C2.37502 14.1087 2.90094 15.3784 3.99419 15.9369L5.3085 16.6084C5.46466 16.6882 5.59167 16.8152 5.67146 16.9714L6.34294 18.2857C6.90148 19.3789 8.17117 19.9049 9.33914 19.5268L10.7433 19.0722C10.9101 19.0182 11.0898 19.0182 11.2566 19.0722L12.6608 19.5268C13.8288 19.9049 15.0985 19.3789 15.6571 18.2857L16.3285 16.9714C16.4083 16.8152 16.5353 16.6882 16.6915 16.6084L18.0058 15.9369C19.0991 15.3784 19.625 14.1087 19.2469 12.9407L18.7923 11.5365C18.7383 11.3697 18.7383 11.19 18.7923 11.0232L19.2469 9.61903C19.625 8.45107 19.0991 7.18137 18.0058 6.62283L16.6915 5.95135C16.5353 5.87156 16.4083 5.74456 16.3285 5.58839L15.6571 4.27408C15.0985 3.18083 13.8288 2.65491 12.6608 3.03301L11.2566 3.48756C11.0898 3.54156 10.9101 3.54156 10.7433 3.48756L9.33914 3.03301ZM6.63311 11.0776L7.81163 9.89903L10.1686 12.2561L14.8827 7.54207L16.0612 8.72058L10.1686 14.6131L6.63311 11.0776Z"
                fill="#229EFF"
              />
            </svg>
          )}
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
    header: () => <div className="text-white">Bones</div>,
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
