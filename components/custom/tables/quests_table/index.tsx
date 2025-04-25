"use client";

import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { Quest } from "@/lib/type";
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

export default function QuestsTable() {
  const socket = useSocket();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!socket) return;

    socket.on("quests", (data) => {
      // console.log('found quests', data)
      setQuests(data);
      setLoading(false);
    });

    return () => {
      socket.off("quests");
    };
  }, [socket]);

  return (
    <div className="w-full space-y-8">
      <DataTable columns={columns} data={quests} isLoading={loading} />
      {!!quests.length && (
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
