"use client";

import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { LeaderboardType } from "@/lib/type";
import { useSocket } from "@/app/SocketProvider";

export default function LeaderboardTable() {
  const socket = useSocket();
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!socket) return;

    socket.on("leaderboard", (data) => {
      // console.log('found leaderboard', data)
      setLeaderboard(data);
      setLoading(false);
    });

    return () => {
      socket.off("leaderboard");
    };
  }, [socket]);

  return (
    <div className="w-full max-w-3xl">
      <DataTable columns={columns} data={leaderboard} isLoading={loading} />
    </div>
  );
}
