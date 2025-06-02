import UsersTable from "@/components/custom/tables/users_table";

function page() {
  return (
    <div className="space-y-8">
      <div className="table-x w-full">
        <UsersTable />
      </div>
    </div>
  );
}

export default page;
