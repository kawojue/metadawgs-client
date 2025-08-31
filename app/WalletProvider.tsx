"use client";

import { FC, ReactNode, useMemo } from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { CoinbaseWalletAdapter } from "@solana/wallet-adapter-coinbase";
import { TrustWalletAdapter } from "@solana/wallet-adapter-trust";
import { MathWalletAdapter } from "@solana/wallet-adapter-mathwallet";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import "@solana/wallet-adapter-react-ui/styles.css";
import { useIsMobile } from "@/hooks/use-mobile";

const WalletConnectionProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(
        () =>
            process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT ||
            "https://api.mainnet-beta.solana.com",
        []
    );

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new CoinbaseWalletAdapter(),
            new TrustWalletAdapter(),
            new MathWalletAdapter(),
        ],
        [network]
    );

    const isMobile = useIsMobile();

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect={!isMobile}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletConnectionProvider;
