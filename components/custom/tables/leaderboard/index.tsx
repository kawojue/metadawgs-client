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
import DarkPagination from "../../DarkPagination2";

type LeaderboardState<T> = {
  data: T[];
  loading: boolean;
  error: string | null;
};

const initialLeaderboardState = {
  data: [],
  loading: true,
  error: null,
};

export function TelegramLeaderboardTable() {
  const { socket, isConnected, isConnecting, error: socketError } = useSocket();
  const [state, setState] = useState<LeaderboardState<TelegramLeaderboardType>>(
    initialLeaderboardState
  );

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const mockMeta: MetaType = {
    currentPage,
    totalPages,
    totalItems: 120,
    offset: 10,
    size: 10,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
    previousPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
  };

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full max-w-4xl space-y-8">
      <DataTable
        columns={telegram_columns}
        data={state.data}
        isLoading={state.loading || isConnecting}
        error={state.error || socketError}
      />

      <DarkPagination meta={mockMeta} onPageChange={handlePageChange} />
    </div>
  );
}

export function OverallLeaderboardTable() {
  const [state, setState] = useState<LeaderboardState<OverallLeaderboardType>>(
    initialLeaderboardState
  );

   const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const mockMeta: MetaType = {
    currentPage,
    totalPages,
    totalItems: 120,
    offset: 10,
    size: 10,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
    previousPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
  };

  useEffect(() => {
    let isMounted = true;

    async function getLeaderboard() {
      try {
        const {
          data: { data },
        } = await fetchWithAuth<{ data: OverallLeaderboardType[] }>(
          "/user/leaderboard"
        );

        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: "Failed to fetch leaderboard. Please try again.",
          }));
        }
      }
    }

    getLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full max-w-4xl space-y-8">
      <DataTable
        columns={x_columns}
        data={state.data}
        isLoading={state.loading}
        error={state.error}
      />

       <DarkPagination
          meta={mockMeta}
          onPageChange={handlePageChange}
        />
    </div>
  );
}

export function CreatorsLeaderboardTable() {
  const [state, setState] = useState<LeaderboardState<CreatorsLeaderboardType>>(
    initialLeaderboardState
  );

   const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const mockMeta: MetaType = {
    currentPage,
    totalPages,
    totalItems: 120,
    offset: 10,
    size: 10,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
    previousPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
  };

  useEffect(() => {
    let isMounted = true;

    async function getLeaderboard() {
      try {
        const {
          data: { data },
        } = await fetchWithAuth<{ data: CreatorsLeaderboardType[] }>(
          "/user/leaderboard"
        );

        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: "Failed to fetch leaderboard. Please try again.",
          }));
        }
      }
    }

    getLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full max-w-4xl space-y-8">
      <DataTable
        columns={x_columns}
        data={state.data}
        isLoading={state.loading}
        error={state.error}
      />

       <DarkPagination
          meta={mockMeta}
          onPageChange={handlePageChange}
        />
    </div>
  );
}

export function GrindersLeaderboardTable() {
  const [state, setState] = useState<LeaderboardState<GrindersLeaderboardType>>(
    initialLeaderboardState
  );

   const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const mockMeta: MetaType = {
    currentPage,
    totalPages,
    totalItems: 120,
    offset: 10,
    size: 10,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
    previousPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
  };

  useEffect(() => {
    let isMounted = true;

    async function getLeaderboard() {
      try {
        const {
          data: { data },
        } = await fetchWithAuth<{ data: GrindersLeaderboardType[] }>(
          "/user/leaderboard"
        );

        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: "Failed to fetch leaderboard. Please try again.",
          }));
        }
      }
    }

    getLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full max-w-4xl space-y-8">
      <DataTable
        columns={x_columns}
        data={state.data}
        isLoading={state.loading}
        error={state.error}
      />

       <DarkPagination
          meta={mockMeta}
          onPageChange={handlePageChange}
        />
    </div>
  );
}
