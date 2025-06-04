import SpecialQuestsTable from "@/components/custom/tables/special_quests_table";

function page() {
  return (
    <div className="space-y-8">
      <div className="table-x w-full">
        <SpecialQuestsTable />
      </div>
    </div>
  );
}

export default page;
