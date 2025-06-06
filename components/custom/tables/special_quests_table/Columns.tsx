import { ColumnDef } from "@tanstack/react-table";
import { Quest } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { LoaderIcon, TrashIcon } from "lucide-react";
import { generateRandomString, hashAddress } from "@/lib/common";
import useLocalStorage from "use-local-storage";
import { useState } from "react";
import { XRefreshTable } from "@/lib/values";
import { deleteWithAuth } from "@/lib/api";
// import QuestFormModal from "./QuestForm";

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
      <div className="line-clamp-2">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "postUrl",
    header: () => <div className="">Tweet URL</div>,
    cell: ({ row }) => (
      <div className="">
        <a
          href={row.getValue("postUrl")}
          className="block text-[#0000FF] underline line-clamp-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          {hashAddress(row.getValue("postUrl"), 15)}
        </a>
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

const Action = ({ questId }: { questId: number; quest: Quest }) => {
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
