"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
    isConnecting: boolean;
    error: string | null;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
    isConnecting: true,
    error: null,
});

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const socket = useMemo(() => {
        try {
            const socket = getSocket();
            return socket;
        } catch (err) {
            console.error("Failed to initialize socket:", err);
            setError("Failed to connect to server");
            return null;
        }
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleConnect = () => {
            setIsConnected(true);
            setIsConnecting(false);
            setError(null);
        };

        const handleDisconnect = (reason: string) => {
            setIsConnected(false);
            setIsConnecting(false);
            if (reason === "io server disconnect") {
                setError("Server disconnected. Attempting to reconnect...");
            } else {
                setError("Connection lost. Attempting to reconnect...");
            }
        };

        const handleConnectError = (err: Error) => {
            console.error("Socket connection error:", err);
            setError("Failed to connect to server");
            setIsConnecting(false);
        };

        const handleReconnect = (attemptNumber: number) => {
            console.log("Reconnected after", attemptNumber, "attempts");
            setError(null);
        };

        const handleReconnectError = (err: Error) => {
            console.error("Socket reconnection error:", err);
            setError("Failed to reconnect to server");
        };

        setIsConnected(socket.connected);
        setIsConnecting(!socket.connected);

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("connect_error", handleConnectError);
        socket.on("reconnect", handleReconnect);
        socket.on("reconnect_error", handleReconnectError);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("connect_error", handleConnectError);
            socket.off("reconnect", handleReconnect);
            socket.off("reconnect_error", handleReconnectError);
            socket.disconnect();
        };
    }, [socket]);

    const value = useMemo(
        () => ({
            socket,
            isConnected,
            isConnecting,
            error,
        }),
        [socket, isConnected, isConnecting, error]
    );

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
}
