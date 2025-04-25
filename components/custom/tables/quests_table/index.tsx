"use client";

import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { MetaType, Quest } from "@/lib/type";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchWithAuth } from "@/lib/api";

export default function QuestsTable() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getQuests() {
      try {
        const resUsers = await fetchWithAuth<{
          quests: Quest[];
          meta: MetaType;
        }>("/users", {
          isAdmin: true,
        });

        setQuests(resUsers.data.quests);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getQuests();
  }, []);

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
