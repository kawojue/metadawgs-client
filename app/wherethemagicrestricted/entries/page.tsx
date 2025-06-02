import EntriesTable from "@/components/custom/tables/entries_table";

function page() {
  return (
    <div className="space-y-8">
      <div className="table-x w-full">
        <EntriesTable />
      </div>
    </div>
  );
}

export default page;
