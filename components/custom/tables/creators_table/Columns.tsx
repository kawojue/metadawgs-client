"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Approval } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import CreatorsRequestModal from "./CreatorsRequestModal";

export const columns: ColumnDef<Approval>[] = [
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
    accessorKey: "answer1",
    header: () => <div className="">Answer 1</div>,
    cell: ({ row }) => (
      <div className="truncate max-w-2xs">
        {row.original.applicationSubmission.answer1}
      </div>
    ),
  },
  {
    accessorKey: "answer2",
    header: () => <div className="">Answer 2</div>,
    cell: ({ row }) => (
      <div className="truncate max-w-2xs">
        {row.original.applicationSubmission.answer2}
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

const Action = ({ data }: { data: Approval }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        className="rounded-full bg-[#FFBE00] text-black"
        onClick={() => setOpen(true)}
      >
        View
      </Button>
      <CreatorsRequestModal
        key={"View_Creator"}
        open={open}
        onClose={() => setOpen(false)}
        data={data}
      />
    </>
  );
};
