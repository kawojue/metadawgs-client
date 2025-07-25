"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

type Metrics = {
    totalSoldSol: number;
    endTime: string;
    targetSol: number;
    startTime: string;
    minPerWallet: number;
    maxPerWallet: number;
    tokenMint: string;
    tokensSoldByType: {
        affiliate: number;
        whitelist: number;
        public: number;
        total: number;
    };
    status: {
        public: boolean;
        airdrop: boolean;
        affiliate: boolean;
        whitelist: boolean;
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

    const fetchMetrics = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_PRESALE_API_ENDPOINT}/metrics`
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
    }, []);

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
