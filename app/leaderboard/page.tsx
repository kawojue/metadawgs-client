import { Suspense } from "react";
import Leaderboard from "./Leaderboard";

export const metadata = {
  title: "Leaderboard",
  description: "Explore the Leaderboard showcasing top contributors.",
};

function page() {
  return (
    <Suspense fallback={"loading..."}>
      <Leaderboard />
    </Suspense>
  );
}

export default page;
