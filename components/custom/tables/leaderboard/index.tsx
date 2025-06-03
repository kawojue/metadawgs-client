"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import {
  CreatorsLeaderboardType,
  GrindersLeaderboardType,
  MetaType,
  OverallLeaderboardType,
  TelegramLeaderboardType,
} from "@/lib/type";
import { useSocket } from "@/app/SocketProvider";
import { fetchWithAuth } from "@/lib/api";
import { telegram_columns } from "./TelegramColumns";
import { x_columns } from "./OverallColumns";
import DarkPagination from "../../DarkPagination";
import { useNumberQuery } from "@/hooks/use-query";

type LeaderboardState<T> = {
  data: T[];
  loading: boolean;
  error: string | null;
  meta?: MetaType;
};

const initialLeaderboardState = {
  data: [],
  loading: true,
  error: null,
  meta: undefined,
};

export function TelegramLeaderboardTable() {
  const { socket, isConnected, isConnecting, error: socketError } = useSocket();
  const [state, setState] = useState<LeaderboardState<TelegramLeaderboardType>>(
    initialLeaderboardState
  );

  useEffect(() => {
    if (!socket) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Socket not connected. Please refresh the page.",
      }));
      return;
    }

    if (socketError) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: socketError,
      }));
      return;
    }

    if (isConnecting) {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));
      return;
    }

    const handleLeaderboard = (data: TelegramLeaderboardType[]) => {
      setState({ data, loading: false, error: null });
    };

    const handleError = (error: Error) => {
      console.error("Socket error:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to fetch leaderboard. Please try again.",
      }));
    };

    socket.on("leaderboard", handleLeaderboard);
    socket.on("error", handleError);

    if (isConnected) {
      setState((prev) => ({ ...prev, loading: true, error: null }));
    }

    return () => {
      socket.off("leaderboard", handleLeaderboard);
      socket.off("error", handleError);
    };
  }, [socket, isConnected, isConnecting, socketError]);

  return (
    <div className="w-full max-w-4xl space-y-8">
      <DataTable
        columns={telegram_columns}
        data={state.data}
        isLoading={state.loading || isConnecting}
        error={state.error || socketError}
      />

      {/* <DarkPagination data={state.data} /> */}
    </div>
  );
}

export function OverallLeaderboardTable() {
  const [state, setState] = useState<LeaderboardState<OverallLeaderboardType>>(
    initialLeaderboardState
  );

  const [page, setPage] = useNumberQuery("page", 1);

  useEffect(() => {
    let isMounted = true;

    async function getLeaderboard() {
      try {
        const {
          data: { data, meta },
        } = await fetchWithAuth<{
          data: OverallLeaderboardType[];
          meta: MetaType;
        }>(`/user/leaderboard/overall?page=${page}`);

        console.log(meta);

        if (isMounted) {
          setState({ data, loading: false, error: null, meta: meta });
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: "Failed to fetch leaderboard. Please try again.",
            meta: undefined,
          }));
        }
      }
    }

    getLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <div className="w-full max-w-4xl space-y-8">
      <DataTable
        columns={x_columns}
        data={state.data}
        isLoading={state.loading}
        error={state.error}
      />
      {!!state.meta && (
        <DarkPagination
          meta={state.meta}
          onPageChange={(value) => {
            setPage(value);
          }}
        />
      )}
    </div>
  );
}

export function CreatorsLeaderboardTable() {
  const [state, setState] = useState<LeaderboardState<CreatorsLeaderboardType>>(
    initialLeaderboardState
  );

  const [page, setPage] = useNumberQuery("page", 1);

  useEffect(() => {
    let isMounted = true;

    async function getLeaderboard() {
      try {
        const {
          data: { data, meta },
        } = await fetchWithAuth<{
          data: CreatorsLeaderboardType[];
          meta: MetaType;
        }>(`/user/leaderboard/creators?page=${page}`);

        if (isMounted) {
          setState({ data, loading: false, error: null, meta: meta });
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: "Failed to fetch leaderboard. Please try again.",
            meta: undefined,
          }));
        }
      }
    }

    getLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <div className="w-full max-w-4xl space-y-8">
      <DataTable
        columns={x_columns}
        data={state.data}
        isLoading={state.loading}
        error={state.error}
      />

      {!!state.meta && (
        <DarkPagination
          meta={state.meta}
          onPageChange={(value) => {
            setPage(value);
          }}
        />
      )}
    </div>
  );
}

export function GrindersLeaderboardTable() {
  const [state, setState] = useState<LeaderboardState<GrindersLeaderboardType>>(
    initialLeaderboardState
  );

  const [page, setPage] = useNumberQuery("page", 1);

  useEffect(() => {
    let isMounted = true;

    async function getLeaderboard() {
      try {
        const {
          data: { data, meta },
        } = await fetchWithAuth<{
          data: GrindersLeaderboardType[];
          meta: MetaType;
        }>(`/user/leaderboard/grinders?page=${page}`);

        if (isMounted) {
          setState({ data, loading: false, error: null, meta: meta });
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: "Failed to fetch leaderboard. Please try again.",
            meta: undefined,
          }));
        }
      }
    }

    getLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <div className="w-full max-w-4xl space-y-8">
      <DataTable
        columns={x_columns}
        data={state.data}
        isLoading={state.loading}
        error={state.error}
      />

      {!!state.meta && (
        <DarkPagination
          meta={state.meta}
          onPageChange={(value) => {
            setPage(value);
          }}
        />
      )}
    </div>
  );
}
