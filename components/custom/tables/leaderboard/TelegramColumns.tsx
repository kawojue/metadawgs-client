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
