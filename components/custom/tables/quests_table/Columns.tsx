import { ColumnDef } from "@tanstack/react-table";
import { Quest } from "@/lib/type";
import { hashAddress } from "@/lib/common";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export const columns: ColumnDef<Quest>[] = [
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
    accessorKey: "name",
    header: () => <div className="">Quest Name</div>,
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: () => <div className="">Description</div>,
    cell: ({ row }) => (
      <div className="line-clamp-2">
        {hashAddress(row.getValue("description"))}
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
    accessorKey: "actions",
    header: () => <div className="">Action</div>,
    cell: () => {
      return (
        <Button variant={"ghost"} size={"icon"}>
          <TrashIcon className="text-red-500" />
        </Button>
      );
    },
  },
];
