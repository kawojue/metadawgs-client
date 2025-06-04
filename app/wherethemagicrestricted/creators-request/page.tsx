import CreatorsTable from "@/components/custom/tables/creators_table";


function page() {
  return (
    <div className="space-y-8">
      <div className="table-x w-full">
        <CreatorsTable/>
      </div>
    </div>
  );
}

export default page;
