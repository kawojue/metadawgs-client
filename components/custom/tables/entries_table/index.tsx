"use client";

import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { EntryType, MetaType } from "@/lib/type";

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

export default function EntriesTable() {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getEntries() {
      try {
        const resEntries = await fetchWithAuth<{
          entries: EntryType[];
          meta: MetaType;
        }>("/Entries", {
          isAdmin: true,
        });

        setEntries(resEntries.data.entries);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getEntries();
  }, []);

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
