"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Collabs } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CollabsRequestModal from "./CollabsRequestModal";

export const columns: ColumnDef<Collabs>[] = [
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
        <a
          href={`https://x.com/${row.original.username}`}
          className="block text-[#0000FF] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {row.getValue("username")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "about",
    header: () => <div className="">About</div>,
    cell: ({ row }) => (
      <div className="truncate max-w-2xs">{row.original.about}</div>
    ),
  },
  {
    accessorKey: "link",
    header: () => <div className="">link</div>,
    cell: ({ row }) => (
      <div className="">
        <a
          href={`${row.original.link}`}
          className="block text-[#0000FF] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {row.getValue("link")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <div className="">Action</div>,
    cell: ({ row }) => {
      return <Action data={row.original} />;
    },
  },
];

const Action = ({ data }: { data: Collabs }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        className="rounded-full bg-[#FFBE00] text-black"
        onClick={() => setOpen(true)}
      >
        View
      </Button>
      <CollabsRequestModal
        key={"View_Creator"}
        open={open}
        onClose={() => setOpen(false)}
        data={data}
      />
    </>
  );
};
