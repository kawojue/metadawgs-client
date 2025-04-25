"use client";

import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { EntryType } from "@/lib/type";
import { useSocket } from "@/app/SocketProvider";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function EntriesTable() {
  const socket = useSocket();
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!socket) return;

    socket.on("Entries", (data) => {
      // console.log('found Entries', data)
      setEntries(data);
      setLoading(false);
    });

    return () => {
      socket.off("Entries");
    };
  }, [socket]);

  return (
    <div className="w-full space-y-8">
      <DataTable columns={columns} data={entries} isLoading={loading} />
      {!!entries.length && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
