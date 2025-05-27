"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { TelegramLeaderboardType, XLeaderboardType } from "@/lib/type";
import { useSocket } from "@/app/SocketProvider";
import { fetchWithAuth } from "@/lib/api";
import { telegram_columns } from "./TelegramColumns";
import { x_columns } from "./XColumns";

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
    const {
        socket,
        isConnected,
        isConnecting,
        error: socketError,
    } = useSocket();
    const [state, setState] = useState<
        LeaderboardState<TelegramLeaderboardType>
    >(initialLeaderboardState);

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

        // Initial fetch attempt if connected
        if (isConnected) {
            setState((prev) => ({ ...prev, loading: true, error: null }));
        }

        return () => {
            socket.off("leaderboard", handleLeaderboard);
            socket.off("error", handleError);
        };
    }, [socket, isConnected, isConnecting, socketError]);

    return (
        <div className="w-full max-w-3xl">
            <DataTable
                columns={telegram_columns}
                data={state.data}
                isLoading={state.loading || isConnecting}
                error={state.error || socketError}
            />
        </div>
    );
}

export function XLeaderboardTable() {
    const [state, setState] = useState<LeaderboardState<XLeaderboardType>>(
        initialLeaderboardState
    );

    useEffect(() => {
        let isMounted = true;

        async function getLeaderboard() {
            try {
                const {
                    data: { data },
                } = await fetchWithAuth<{ data: XLeaderboardType[] }>(
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

    return (
        <div className="w-full max-w-3xl">
            <DataTable
                columns={x_columns}
                data={state.data}
                isLoading={state.loading}
                error={state.error}
            />
        </div>
    );
}
