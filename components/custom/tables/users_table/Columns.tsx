"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserType } from "@/lib/type";
import { formatNumberWithCommas, hashAddress } from "@/lib/common";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { postWithAuth } from "@/lib/api";
import useLocalStorage from "use-local-storage";
import { XRefreshTable } from "@/lib/values";

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
        <a href={`https://x.com/${row.original.username}`} className="block text-[#0000FF] underline" target="_blank" rel="noopener noreferrer">
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
    accessorKey: "totalPoints",
    header: () => <div className="">Total Points</div>,
    cell: ({ row }) => (
      <div className="">
        {formatNumberWithCommas(row.getValue("totalPoints") ?? "")}
      </div>
    ),
  },
  {
    accessorKey: "tasks",
    header: () => <div className="">Tasks Completed</div>,
    cell: ({ row }) => (
      <div className="">
        {formatNumberWithCommas(row.getValue("tasks") ?? "")} Tasks
      </div>
    ),
  },

  {
    accessorKey: "actions",
    header: () => <div className="">Action</div>,
    cell: ({ row }) => {
      return <Action isBanned={row.original.banned} userId={row.original.id} />;
    },
  },
];

const Action = ({
  isBanned,
  userId,
}: {
  isBanned: boolean;
  userId: number;
}) => {
  const [banned, setBanned] = useState<boolean>(isBanned);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setRefreshTable] = useLocalStorage(XRefreshTable, false);

  async function Ban() {
    if (isLoading) return;

    try {
      setIsLoading(true);

      await postWithAuth(`/user/toggle-ban/${userId}`, undefined, {
        isAdmin: true,
      });
      setBanned(true);
      setRefreshTable((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function Unban() {
    if (isLoading) return;

    try {
      setIsLoading(true);

      await postWithAuth(`/user/toggle-ban/${userId}`, undefined, {
        isAdmin: true,
      });
      setBanned(false);
      setRefreshTable((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {!banned ? (
        <Button className="rounded-full bg-[#FF3B30] text-white" onClick={Ban}>
          {" "}
          {isLoading && <LoaderIcon />} {!isLoading && <span>Ban</span>}
        </Button>
      ) : (
        <Button
          className="rounded-full bg-[#FFBE00] text-black"
          onClick={Unban}
        >
          {" "}
          {isLoading && <LoaderIcon />} {!isLoading && <span>Unban</span>}
        </Button>
      )}
    </>
  );
};
