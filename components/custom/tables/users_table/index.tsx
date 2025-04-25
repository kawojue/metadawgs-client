"use client";

import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { MetaType, UserType } from "@/lib/type";

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

export default function UsersTable() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getUsers() {
      try {
        const resUsers = await fetchWithAuth<{
          users: UserType[];
          meta: MetaType;
        }>("/users", {
          isAdmin: true,
        });

        setUsers(resUsers.data.users);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  return (
    <div className="w-full space-y-8">
      <DataTable columns={columns} data={users} isLoading={loading} />
      {!!users.length && (
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
