import QuestsTable from "@/components/custom/tables/quests_table";

function page() {
  return (
    <div className="space-y-8">
      <div className="table-x w-full">
        <QuestsTable />
      </div>
    </div>
  );
}

export default page;
