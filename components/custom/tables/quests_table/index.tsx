"use client";

import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { MetaType, Quest } from "@/lib/type";

import { fetchWithAuth } from "@/lib/api";
import useLocalStorage from "use-local-storage";
import { XRefreshTable } from "@/lib/values";
import ShadcnPagination from "@/components/custom/CustomPagination";
import { useNumberQuery, useStringQuery } from "@/hooks/use-query";
import { SearchIcon } from "lucide-react";
import { useDebouncedFetch } from "@/hooks/use-debounce-fetch";

type Props = {
  isPreview?: boolean;
};

export default function QuestTable({ isPreview }: Props) {
  const { debouncedFetch, loading } = useDebouncedFetch<{
    quests: Quest[];
    meta: MetaType;
  }>();

  const [quests, setQuest] = useState<Quest[]>([]);
  const [meta, setMeta] = useState<MetaType | null>(null);
  const [refreshTable] = useLocalStorage<string>(XRefreshTable, "false");

  const [page] = useNumberQuery("page", 1);
  const [limit] = useNumberQuery("limit", 20);
  const [search, setSearch] = useStringQuery("search", "");
  const [inputValue, setInputValue] = useState(search);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSearch(event.target.value);
  };

  useEffect(() => {
    debouncedFetch(async (signal) => {
      const resQuest = await fetchWithAuth<{
        quests: Quest[];
        meta: MetaType;
      }>(`/posts/quests?page=${page}&limit=${limit}&search=${search}`, {
        isAdmin: true,
        signal,
      });

      setQuest(resQuest.data.quests);
      setMeta(resQuest.data.meta);

      return resQuest.data;
    });
  }, [limit, page, refreshTable, search, debouncedFetch]);

  return (
    <div className="space-y-3">
      <div className="flex sm:justify-between sm:flex-row flex-col-reverse gap-4 sm:items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold font-fredoka">
            {isPreview && "New "}Quests
          </h2>
          {isPreview && (
            <span className="grid place-content-center place-items-center p-0.5 px-2 bg-red-500 text-white rounded-full text-xs">
              0
            </span>
          )}
        </div>

        <div className="flex items-center sm:justify-start justify-end gap-4">
          <div className="search-box relative text-[#181B20]">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              value={inputValue}
              className="w-full rounded-full h-[48px] px-12 text-lg max-w-[200px]"
              onChange={onSearchChange}
            />
          </div>

          {/* <Button
            variant={"ghost"}
            className="cursor-pointer rounded-full hover:bg-red-500 hover:text-white"
          >
            <TrashIcon />
            Trash
          </Button> */}
        </div>
      </div>
      <div className="w-full space-y-8">
        <DataTable columns={columns} data={quests} isLoading={loading} />
        {meta && !loading && (
          <ShadcnPagination
            meta={meta}
            baseUrl={isPreview ? "/admin" : "/admin/quests"}
          />
        )}
      </div>
    </div>
  );
}
