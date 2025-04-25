import UsersTable from "@/components/custom/tables/users_table";
import { Button } from "@/components/ui/button";
import { SearchIcon, TrashIcon } from "lucide-react";

function page() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex justify-between gap-4 items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-semibold font-fredoka">Users</h2>
          </div>

          <div className="flex items-center">
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
          <UsersTable />
        </div>
      </div>
    </div>
  );
}

export default page;
