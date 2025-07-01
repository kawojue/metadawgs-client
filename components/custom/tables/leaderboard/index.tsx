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
import { Loader } from "lucide-react";

const ITEMS_PER_PAGE = 10;

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
    const {
        socket,
        isConnected,
        isConnecting,
        error: socketError,
    } = useSocket();
    const [state, setState] = useState<
        LeaderboardState<TelegramLeaderboardType>
    >(initialLeaderboardState);
    const [allData, setAllData] = useState<TelegramLeaderboardType[]>([]);
    const [page, setPage] = useNumberQuery("page", 1);

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
            setAllData(data);

            const startIndex = (page - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const paginatedData = data.slice(startIndex, endIndex);

            const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
            const meta = {
                currentPage: page,
                totalPages,
                totalItems: data.length,
                size: ITEMS_PER_PAGE,
                hasNext: page < totalPages,
                hasPrev: page > 1,
                offset: (page - 1) * ITEMS_PER_PAGE,
                nextPage: page < totalPages ? page + 1 : null,
                previousPage: page > 1 ? page - 1 : null,
            };

            setState({
                data: paginatedData,
                loading: false,
                error: null,
                meta,
            });
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

    useEffect(() => {
        if (allData.length > 0) {
            const startIndex = (page - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const paginatedData = allData.slice(startIndex, endIndex);

            const totalPages = Math.ceil(allData.length / ITEMS_PER_PAGE);
            const meta = {
                currentPage: page,
                totalPages,
                totalItems: allData.length,
                size: ITEMS_PER_PAGE,
                hasNext: page < totalPages,
                hasPrev: page > 1,
                offset: (page - 1) * ITEMS_PER_PAGE,
                nextPage: page < totalPages ? page + 1 : null,
                previousPage: page > 1 ? page - 1 : null,
            };

            setState((prev) => ({ ...prev, data: paginatedData, meta }));
        }
    }, [page, allData]);

    if (state.loading || isConnecting) {
        return (
            <div className="w-full max-w-4xl space-y-8 flex justify-center items-center min-h-[200px]">
                <Loader size={48} className="animate-spin text-[#FFBE00]" />
            </div>
        );
    }

    if (state.error || socketError) {
        return (
            <div className="w-full max-w-4xl space-y-8 text-center min-h-[200px] flex flex-col justify-center items-center">
                <p className="text-red-500 text-lg">
                    {state.error || socketError}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-[#FFBE00] text-black rounded-full hover:bg-[#FFBE00]/80 transition-colors"
                >
                    Refresh Page
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl space-y-8">
            <DataTable
                columns={telegram_columns}
                data={state.data}
                isLoading={false}
                error={null}
            />
            {state.meta && state.meta.totalPages > 1 && (
                <DarkPagination
                    meta={state.meta}
                    onPageChange={(value) => {
                        setPage(value);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                />
            )}
        </div>
    );
}

export function OverallLeaderboardTable() {
    const [state, setState] = useState<
        LeaderboardState<OverallLeaderboardType>
    >(initialLeaderboardState);

    const [page, setPage] = useNumberQuery("page", 1);

    useEffect(() => {
        let isMounted = true;

        async function getLeaderboard() {
            try {
                setState((prev) => ({ ...prev, loading: true, error: null }));

                const {
                    data: { data, meta },
                } = await fetchWithAuth<{
                    data: OverallLeaderboardType[];
                    meta: MetaType;
                }>(
                    `/user/leaderboard/overall?page=${page}&limit=${ITEMS_PER_PAGE}`
                );

                if (isMounted) {
                    setState({ data, loading: false, error: null, meta });
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

    if (state.loading) {
        return (
            <div className="w-full max-w-4xl space-y-8 flex justify-center items-center min-h-[200px]">
                <Loader size={48} className="animate-spin text-[#FFBE00]" />
            </div>
        );
    }

    if (state.error) {
        return (
            <div className="w-full max-w-4xl space-y-8 text-center min-h-[200px] flex flex-col justify-center items-center">
                <p className="text-red-500 text-lg">{state.error}</p>
                <button
                    onClick={() => setPage(1)}
                    className="mt-4 px-4 py-2 bg-[#FFBE00] text-black rounded-full hover:bg-[#FFBE00]/80 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl space-y-8">
            <DataTable
                columns={x_columns}
                data={state.data}
                isLoading={false}
                error={null}
            />
            {state.meta && state.meta.totalPages > 1 && (
                <DarkPagination
                    meta={state.meta}
                    onPageChange={(value) => {
                        setPage(value);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                />
            )}
        </div>
    );
}

export function CreatorsLeaderboardTable() {
    const [state, setState] = useState<
        LeaderboardState<CreatorsLeaderboardType>
    >(initialLeaderboardState);

    const [page, setPage] = useNumberQuery("page", 1);

    useEffect(() => {
        let isMounted = true;

        async function getLeaderboard() {
            try {
                setState((prev) => ({ ...prev, loading: true, error: null }));

                const {
                    data: { data, meta },
                } = await fetchWithAuth<{
                    data: CreatorsLeaderboardType[];
                    meta: MetaType;
                }>(
                    `/user/leaderboard/creators?page=${page}&limit=${ITEMS_PER_PAGE}`
                );

                if (isMounted) {
                    setState({ data, loading: false, error: null, meta });
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

    if (state.loading) {
        return (
            <div className="w-full max-w-4xl space-y-8 flex justify-center items-center min-h-[200px]">
                <Loader size={48} className="animate-spin text-[#FFBE00]" />
            </div>
        );
    }

    if (state.error) {
        return (
            <div className="w-full max-w-4xl space-y-8 text-center min-h-[200px] flex flex-col justify-center items-center">
                <p className="text-red-500 text-lg">{state.error}</p>
                <button
                    onClick={() => setPage(1)}
                    className="mt-4 px-4 py-2 bg-[#FFBE00] text-black rounded-full hover:bg-[#FFBE00]/80 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl space-y-8">
            <DataTable
                columns={x_columns}
                data={state.data}
                isLoading={false}
                error={null}
            />
            {state.meta && state.meta.totalPages > 1 && (
                <DarkPagination
                    meta={state.meta}
                    onPageChange={(value) => {
                        setPage(value);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                />
            )}
        </div>
    );
}

export function GrindersLeaderboardTable() {
    const [state, setState] = useState<
        LeaderboardState<GrindersLeaderboardType>
    >(initialLeaderboardState);

    const [page, setPage] = useNumberQuery("page", 1);

    useEffect(() => {
        let isMounted = true;

        async function getLeaderboard() {
            try {
                setState((prev) => ({ ...prev, loading: true, error: null }));

                const {
                    data: { data, meta },
                } = await fetchWithAuth<{
                    data: GrindersLeaderboardType[];
                    meta: MetaType;
                }>(
                    `/user/leaderboard/grinders?page=${page}&limit=${ITEMS_PER_PAGE}`
                );

                if (isMounted) {
                    setState({ data, loading: false, error: null, meta });
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

    if (state.loading) {
        return (
            <div className="w-full max-w-4xl space-y-8 flex justify-center items-center min-h-[200px]">
                <Loader size={48} className="animate-spin text-[#FFBE00]" />
            </div>
        );
    }

    if (state.error) {
        return (
            <div className="w-full max-w-4xl space-y-8 text-center min-h-[200px] flex flex-col justify-center items-center">
                <p className="text-red-500 text-lg">{state.error}</p>
                <button
                    onClick={() => setPage(1)}
                    className="mt-4 px-4 py-2 bg-[#FFBE00] text-black rounded-full hover:bg-[#FFBE00]/80 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl space-y-8">
            <DataTable
                columns={x_columns}
                data={state.data}
                isLoading={false}
                error={null}
            />
            {state.meta && state.meta.totalPages > 1 && (
                <DarkPagination
                    meta={state.meta}
                    onPageChange={(value) => {
                        setPage(value);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                />
            )}
        </div>
    );
}
