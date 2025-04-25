"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserType } from "@/lib/type";
import { formatNumberWithCommas, hashAddress } from "@/lib/common";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<UserType>[] = [
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
        <a href="#" className="block">
          {row.getValue("username")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "walletAddress",
    header: () => <div className="">Wallet Address</div>,
    cell: ({ row }) => (
      <div className="">{hashAddress(row.getValue("walletAddress") ?? "")}</div>
    ),
  },
  {
    accessorKey: "points",
    header: () => <div className="">Total Points</div>,
    cell: ({ row }) => (
      <div className="">{formatNumberWithCommas(row.getValue("points"))}</div>
    ),
  },
  {
    accessorKey: "tasks",
    header: () => <div className="">Tasks Completed</div>,
    cell: ({ row }) => (
      <div className="">
        {formatNumberWithCommas(row.getValue("tasks"))} Tasks
      </div>
    ),
  },
  {
    accessorKey: "invites",
    header: () => <div className="">Invites</div>,
    cell: ({ row }) => (
      <div className="">
        {formatNumberWithCommas(row.getValue("invites"))} Tasks
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <div className="">Action</div>,
    cell: ({ row }) => {
      return (
        <>
          {row.original.banned == true ? (
            <Button>Ban</Button>
          ) : (
            <Button>Unban</Button>
          )}
        </>
      );
    },
  },
];
