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
import { SolanaMobileWalletAdapter } from "@solana-mobile/wallet-adapter-mobile";
import {
    createDefaultAddressSelector,
    createDefaultAuthorizationResultCache,
    createDefaultWalletNotFoundHandler,
} from "@solana-mobile/wallet-adapter-mobile";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import "@solana/wallet-adapter-react-ui/styles.css";

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
            new PhantomWalletAdapter({ network }),
            new SolflareWalletAdapter({ network }),
            new CoinbaseWalletAdapter({ network }),
            new TrustWalletAdapter({ network }),
            new MathWalletAdapter({ network }),
            new SolanaMobileWalletAdapter({
                addressSelector: createDefaultAddressSelector(),
                appIdentity: {
                    name: "MetaDawgs App",
                    uri: "https://metadawgs.com",
                    icon: "/logo.svg",
                },
                authorizationResultCache:
                    createDefaultAuthorizationResultCache(),
                chain: WalletAdapterNetwork.Mainnet,
                onWalletNotFound: createDefaultWalletNotFoundHandler(),
            }),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletConnectionProvider;
