"use client";

import useAuth from "@/hooks/use-auth";
import DawgHouses from "./DawgHouses";
import { redirect } from "next/navigation";
import { Loader } from "lucide-react";

function Page() {
  const { isLoading, userProfile } = useAuth();
  if (isLoading) {
    return (
      <div className="h-dch w-full grid place-content-center">
        <Loader size={72} color={"#FFBE00"} className="animate-spin" />
      </div>
    );
  }

  if (!userProfile) {
    return redirect("/metadawgs-club");
  }

  return <DawgHouses />;
}

export default Page;
