declare global {
  interface Window {
    solana?: {
      isConnected: boolean;
      connect(): Promise<void>;
      disconnect(): Promise<void>;
      on(event: string, handler: (args: any) => void): void;
      request(method: string, params?: any): Promise<any>;
    };
  }
}

export {};