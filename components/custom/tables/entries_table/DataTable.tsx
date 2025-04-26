"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import Image from "next/image";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-2xl bg-[white] border border-[#000]/10 overflow-hidden">
      <Table>
        <TableHeader className="bg-[#F5F5F5]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={`border-b border-[#000]/10 last:border-r-0 p-5`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-[white]">
          {isLoading && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-black"
              >
                Loading...
              </TableCell>
            </TableRow>
          )}
          {!isLoading && (
            <>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-transparent transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="p-5 border-none text-[#5F80A0]"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="p-6 py-8 text-center text-black"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Image
                        width={209}
                        height={220}
                        alt={"bin"}
                        src={"/images/bin.svg"}
                      />

                      <h3 className="text-2xl font-semibold font-fredoka">
                        No Detail Available
                      </h3>
                      <p className="text-[#5F80A0] max-w-sm text-wrap">
                        Looks like {"there's"} nothing here yet. Once you start
                        data starts adding, {"you'll"} see the activities here.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}{" "}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
