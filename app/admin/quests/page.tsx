import QuestsTable from "@/components/custom/tables/quests_table";
import { Button } from "@/components/ui/button";
import { SearchIcon, TrashIcon } from "lucide-react";

function page() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex sm:justify-between sm:flex-row flex-col-reverse gap-4 sm:items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-semibold font-fredoka">Quests</h2>
          </div>

          <div className="flex items-center sm:justify-start justify-end gap-4">
            <div className="search-box relative text-[#181B20]">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-full h-[48px] px-12 text-lg max-w-[200px]"
              />
            </div>

            <Button
              variant={"ghost"}
              className="cursor-pointer rounded-full hover:bg-red-500 hover:text-white"
            >
              <TrashIcon />
              Trash
            </Button>
          </div>
        </div>

        <div className="table-x w-full">
          <QuestsTable />
        </div>
      </div>
    </div>
  );
}

export default page;
