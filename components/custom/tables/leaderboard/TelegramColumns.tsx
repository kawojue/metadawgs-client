import { ColumnDef } from "@tanstack/react-table";

import { formatNumberWithCommas } from "@/lib/common";
import { TelegramLeaderboardType } from "@/lib/type";

export const telegram_columns: ColumnDef<TelegramLeaderboardType>[] = [
  // {
  //   accessorKey: "rank",
  //   header: () => (
  //     <div className="text-white flex items-center">
  //       Rank
  //       <InfoIcon className="ml-2 h-4 w-4" />
  //     </div>
  //   ),
  //   cell: ({ row }) => (
  //     <div className="flex items-center gap-3">
  //       <Avatar className="w-7 h-7 min-w-7 min-h-7">
  //         <AvatarImage src={row.original.avatar} />
  //         <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500"></AvatarFallback>
  //       </Avatar>
  //     </div>
  //   ),
  // },
  {
    accessorKey: "username",
    header: () => <div className="text-white">User</div>,
    cell: ({ row }) => (
      <div className="text-white">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "invites",
    header: () => <div className="text-white">Invites</div>,
    cell: ({ row }) => (
      <div className="text-white">
        {formatNumberWithCommas(row.getValue("invites"))}
      </div>
    ),
  },
  {
    accessorKey: "messages",
    header: () => <div className="text-white">Messages</div>,
    cell: ({ row }) => (
      <div className="text-white">
        {formatNumberWithCommas(row.getValue("messages"))}
      </div>
    ),
  },
  {
    accessorKey: "reactions",
    header: () => <div className="text-white">Reactions</div>,
    cell: ({ row }) => (
      <div className="text-white">
        {formatNumberWithCommas(row.getValue("reactions"))}
      </div>
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
