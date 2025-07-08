import { ColumnDef } from "@tanstack/react-table";
import { EntryType } from "@/lib/type";
import { formatNumberWithCommas, generateRandomString, hashAddress } from "@/lib/common";
import { useState } from "react";
import useLocalStorage from "use-local-storage";
import { XRefreshTable } from "@/lib/values";
import { deleteWithAuth } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { LoaderIcon, TrashIcon } from "lucide-react";

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
    accessorKey: "user",
    header: () => <div className="">Username</div>,
    cell: ({ row }) => (
      <a
        href={`https://x.com/${row.original.user.username}`}
        className="block text-[#0000FF] underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {row.original.user.username}
      </a>
    ),
  },
  {
    accessorKey: "postUrl",
    header: () => <div className="">Tweet URL</div>,
    cell: ({ row }) => (
      <div className="">
        <a
          href={row.getValue("postUrl")}
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
    accessorKey: "point",
    header: () => <div className="">Bones</div>,
    cell: ({ row }) => (
      <div className="">
        {formatNumberWithCommas(Number(row.original.point.value) || 0)}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <div className="">Action</div>,
    cell: ({ row }) => {
      return <Action questId={row.original.id} quest={row.original} />;
    },
  },
];

const Action = ({ questId }: { questId: number; quest: EntryType }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setRefreshTable] = useLocalStorage<string>(XRefreshTable, "");
  // const [openEdit, setOpenEdit] = useState<boolean>(false);

  async function DeleteQuest() {
    if (isLoading) return;

    try {
      setIsLoading(true);

      await deleteWithAuth(`/posts/quests/${questId}`, {
        isAdmin: true,
      });

      setRefreshTable(generateRandomString(10));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex gap-2 items-center">
        <Button
          className="cursor-pointer"
          variant={"ghost"}
          size={"icon"}
          disabled={isLoading}
          onClick={DeleteQuest}
        >
          {isLoading && <LoaderIcon />}
          {!isLoading && <TrashIcon className="text-red-500" />}
        </Button>
        {/* <Button
          className="cursor-pointer"
          variant={"ghost"}
          size={"icon"}
          disabled={isLoading}
          onClick={() => setOpenEdit(true)}
        >
          <PenIcon className="text-blue-500" />
        </Button> */}
      </div>
      {/* <QuestFormModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        quest={quest}
      /> */}
    </>
  );
};