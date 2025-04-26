import { ColumnDef } from "@tanstack/react-table";
import { EntryType } from "@/lib/type";
import { formatNumberWithCommas, hashAddress } from "@/lib/common";

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
    accessorKey: "user.username",
    header: () => <div className="">Username</div>,
    cell: ({ row }) => (
      <a
        href={`https://x.com/${row.original.user.username}`}
        className="block text-[#0000FF] underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {row.getValue("user.username")}
      </a>
    ),
  },
  {
    accessorKey: "postUrl",
    header: () => <div className="">Tweet URL</div>,
    cell: ({ row }) => (
      <div className="">
        <a
          href="#"
          className="block text-[#0000FF] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {hashAddress(row.getValue("postUrl"), 15)}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "point.value",
    header: () => <div className="">Points</div>,
    cell: ({ row }) => (
      <div className="">
        {formatNumberWithCommas(row.getValue("point.value"))}
      </div>
    ),
  },
];
