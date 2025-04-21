"use client";

import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { fetchWithAuth } from "@/lib/api";
import { LeaderboardType } from "@/lib/type";

export default function LeaderboardTable() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getLeaderboard() {
      try {
        setLoading(true);
        const {
          data: { data },
        } = await fetchWithAuth<{ data: LeaderboardType[] }>(
          "/user/leaderboard"
        );

        setLeaderboard(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getLeaderboard();
  }, []);

  return (
    <div className="w-full max-w-3xl">
      <DataTable columns={columns} data={leaderboard} isLoading={loading} />
    </div>
  );
}
