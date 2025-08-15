import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let metricsSocket: Socket | null = null;

const createSocketConnection = (url: string, name: string): Socket => {
    const socketInstance = io(url, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        autoConnect: true,
        forceNew: true,
    });

    socketInstance.on("connect_error", (error) => {
        console.error(`${name} socket connection error:`, error);
    });

    socketInstance.on("disconnect", (reason) => {
        console.warn(`${name} socket disconnected:`, reason);
        if (reason === "io server disconnect") {
            socketInstance?.connect();
        }
    });

    socketInstance.on("reconnect", (attemptNumber) => {
        console.log(
            `${name} socket reconnected after`,
            attemptNumber,
            "attempts"
        );
    });

    socketInstance.on("reconnect_error", (error) => {
        console.error(`${name} socket reconnection error:`, error);
    });

    return socketInstance;
};

export const getSocket = (): Socket => {
    if (!socket) {
        socket = createSocketConnection(
            process.env.NEXT_PUBLIC_SOCKET_URL!,
            "Main"
        );
    }
    return socket;
};

export const getMetricsSocket = (): Socket => {
    if (!metricsSocket) {
        metricsSocket = createSocketConnection(
            process.env.NEXT_PUBLIC_PRESALE_API_ENDPOINT!,
            "Metrics"
        );
    }
    return metricsSocket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const disconnectMetricsSocket = () => {
    if (metricsSocket) {
        metricsSocket.disconnect();
        metricsSocket = null;
    }
};

export const disconnectAllSockets = () => {
    disconnectSocket();
    disconnectMetricsSocket();
};
