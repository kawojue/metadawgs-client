import { ColumnDef } from "@tanstack/react-table";
import { EntryType } from "@/lib/type";
import { formatNumberWithCommas } from "@/lib/common";

export const columns: ColumnDef<EntryType>[] = [
  {
    accessorKey: "checkbox",
    header: () => (
      <div className="max-w-3">
        <input type="checkbox" name="" id="" />
      </div>
    ),
    cell: ({}) => (
      <div className="max-w-3">
        <input type="checkbox" name="" id="" />
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: () => <div className="">Username</div>,
    cell: ({ row }) => (
      <div className="">
        <a href="#" className="block" target="_blank" rel="noopener noreferrer">
          {row.getValue("username")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "tweet_url",
    header: () => <div className="">Tweet URL</div>,
    cell: ({ row }) => (
      <div className="">
        <a href="#" className="block text-[#0000FF] underline" target="_blank" rel="noopener noreferrer">
          {row.getValue("tweet_url")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "points",
    header: () => <div className="">Points</div>,
    cell: ({ row }) => (
      <div className="">{formatNumberWithCommas(row.getValue("points"))}</div>
    ),
  },
];
