"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { getMetricsSocket } from "@/lib/socket";
import { Socket } from "socket.io-client";

type Metrics = {
    endTime: string;
    hardCap: number;
    softCap: number;
    startTime: string;
    totalSoldSol: number;
    minSolPerWallet: number;
    maxSolPerWallet: number;
    tokenMint: string;
    tokensSoldByType: {
        public: number;
        private: number;
    };
    status: {
        public: boolean;
        private: boolean;
        airdrop: boolean;
        affiliate: boolean;
    };
};

type MetricsContextType = {
    metrics: Metrics | null;
    isLoading: boolean;
    error: string | null;
    refetchMetrics: () => Promise<void>;
};

const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

export function MetricsProvider({ children }: { children: ReactNode }) {
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const fetchMetrics = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_PRESALE_API_ENDPOINT}/presale/metrics`
            );

            if (!res.ok) {
                throw new Error("Couldn't get metrics.");
            }

            const result = await res.json();
            setMetrics(result.data);
        } catch (err) {
            console.error("Error fetching metrics:", err);
            setError(
                err instanceof Error ? err.message : "Failed to fetch metrics"
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMetrics();

        const metricsSocket = getMetricsSocket();
        setSocket(metricsSocket);

        const handleConnect = () => {
            setIsConnected(true);
        };

        const handleDisconnect = () => {
            setIsConnected(false);
        };

        setIsConnected(metricsSocket.connected);

        metricsSocket.on("connect", handleConnect);
        metricsSocket.on("disconnect", handleDisconnect);

        return () => {
            metricsSocket.off("connect", handleConnect);
            metricsSocket.off("disconnect", handleDisconnect);
        };
    }, []);

    useEffect(() => {
        if (!socket || !isConnected) return;

        const handleMetricsUpdate = (data: Metrics) => {
            setMetrics(data);
            setError(null);
        };

        socket.on("tge-metrics", handleMetricsUpdate);

        return () => {
            socket.off("tge-metrics", handleMetricsUpdate);
        };
    }, [socket, isConnected]);

    const refetchMetrics = async () => {
        await fetchMetrics();
    };

    return (
        <MetricsContext.Provider
            value={{
                metrics,
                isLoading,
                error,
                refetchMetrics,
            }}
        >
            {children}
        </MetricsContext.Provider>
    );
}

export function useMetrics() {
    const context = useContext(MetricsContext);
    if (context === undefined) {
        throw new Error("useMetrics must be used within a MetricsProvider");
    }
    return context;
}
