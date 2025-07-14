"use client";

import useAuth from "@/hooks/use-auth";
import MindShare from "./MindShare";
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

  return <MindShare />;
}

export default Page;
