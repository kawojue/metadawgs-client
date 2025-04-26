"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { TelegramLeaderboardType, XLeaderboardType } from "@/lib/type";
import { useSocket } from "@/app/SocketProvider";
import { fetchWithAuth } from "@/lib/api";
import { telegram_columns } from "./TelegramColumns";
import { x_columns } from "./XColumns";

export function TelegramLeaderboardTable() {
  const socket = useSocket();
  const [leaderboard, setLeaderboard] = useState<TelegramLeaderboardType[]>([]);
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
      <DataTable
        columns={telegram_columns}
        data={leaderboard}
        isLoading={loading}
      />
    </div>
  );
}

export function XLeaderboardTable() {
  const [leaderboard, setLeaderboard] = useState<XLeaderboardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getLeaderboard() {
      try {
        const {
          data: { data },
        } = await fetchWithAuth<{ data: XLeaderboardType[] }>(
          "/user/leaderboard"
        );

        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }

    getLeaderboard();
  }, []);

  return (
    <div className="w-full max-w-3xl">
      <DataTable columns={x_columns} data={leaderboard} isLoading={loading} />
    </div>
  );
}
