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
    accessorKey: "user.username",
    header: () => <div className="">Username</div>,
    cell: ({ row }) => (
      <div className="">
        <a
          href={`https://x.com/${row.original.user.username}`}
          className="block text-[#0000FF] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {row.original.user.username}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "telegramHandle",
    header: () => <div className="">Telegram Handle</div>,
    cell: ({ row }) => (
      <div className="">
        <a
          href={`https://t.me/${row.original.telegramHandle}`}
          className="block text-[#0000FF] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {row.getValue("telegramHandle")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "answer",
    header: () => <div className="">Answer</div>,
    cell: ({ row }) => (
      <div className="truncate max-w-2xs">{row.original.answer}</div>
    ),
  },
  {
    accessorKey: "otherUrl",
    header: () => <div className="">Other Url</div>,
    cell: ({ row }) => (
      <div className="">
        <a
          href={`${row.original.otherUrl}`}
          className="block text-[#0000FF] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {row.getValue("otherUrl")}
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
