import { ColumnDef } from "@tanstack/react-table";
import { AdminMindShareType } from "@/lib/type";
import {
    formatNumberWithCommas,
    generateRandomString,
    hashAddress,
} from "@/lib/common";
import { useState } from "react";
import useLocalStorage from "use-local-storage";
import { XRefreshTable } from "@/lib/values";
import { deleteWithAuth, patchWithAuth } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { LoaderIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const columns: ColumnDef<AdminMindShareType>[] = [
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
                {/* //TODO: use bones */}
                {formatNumberWithCommas(Number(row.original?.bones) || 0)}
            </div>
        ),
    },
    {
        accessorKey: "actions",
        header: () => <div className="">Actions</div>,
        cell: ({ row }) => {
            return <Action entryId={row.original.id} entry={row.original} />;
        },
    },
];

const Action = ({
    entryId,
    entry,
}: {
    entryId: string;
    entry: AdminMindShareType;
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [, setRefreshTable] = useLocalStorage<string>(XRefreshTable, "");
    const [isPublic, setIsPublic] = useState(entry.public);
    // const [openEdit, setOpenEdit] = useState<boolean>(false);

    async function DeleteEntry() {
        if (isLoading) return;

        try {
            setIsLoading(true);

            await deleteWithAuth(`/posts/entries/${entryId}`, {
                isAdmin: true,
            });

            setRefreshTable(generateRandomString(10));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            toast(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred"
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function toggleSpecial() {
        if (isLoading) return;

        try {
            setIsLoading(true);

            await patchWithAuth(
                `/posts/mindshare/entries/${entryId}/publicity`,
                undefined,
                {
                    isAdmin: true,
                }
            );

            setIsPublic((prev) => !prev);

            setRefreshTable(generateRandomString(10));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            toast(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred"
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="flex gap-4 items-center">
                <Button
                    className="cursor-pointer"
                    variant={"ghost"}
                    size={"icon"}
                    title="Delete"
                    disabled={isLoading}
                    onClick={DeleteEntry}
                >
                    {isLoading && <LoaderIcon />}
                    {!isLoading && (
                        <TrashIcon size={32} className="text-red-500" />
                    )}
                </Button>

                <button
                    className={cn(
                        "toggle rounded-full h-5 w-10 relative cursor-pointer bg-gray-300 disabled:opacity-60",
                        isPublic && "",
                        !isPublic && ""
                    )}
                    onClick={toggleSpecial}
                    title="Toggle Special Mind Share Publicity"
                    disabled={isLoading}
                >
                    <span
                        className={cn(
                            "h-6 w-6 rounded-full absolute top-1/2 -translate-y-1/2 transition duration-100",
                            isPublic && "-right-1 bg-[#FFBE00]",
                            !isPublic && "-left-1 bg-black"
                        )}
                    ></span>
                </button>
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
            {/* <EntryFormModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        entry={entry}
      /> */}
        </>
    );
};
