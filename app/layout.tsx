import type { Metadata } from "next";
import { Geist_Mono, Fredoka, Josefin_Sans } from "next/font/google";
import "./globals.css";
import MainLayout from "./MainLayout";
import { SocketProvider } from "./SocketProvider";
import WalletConnectionProvider from "./WalletProvider";
import siteConfig from "@/lib/siteConfig";
import { Toaster } from "@/components/ui/sonner";
import JsonLd from "./json-ld";

const josefinSans = Josefin_Sans({
    variable: "--font-josefin-sans",
    subsets: ["latin"],
});

const fredoka = Fredoka({
    variable: "--font-fredoka",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        template: "MetaDawgs | %s - Earn Crypto Rewards on Solana",
        default: siteConfig.title,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: { name: siteConfig.author, url: "https://metadawgs.com" },
    publisher: siteConfig.author,
    creator: "MetaDawgs Team",
    category: "Gaming, Cryptocurrency, Blockchain",
    classification: "Web3 Gaming Platform",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "https://metadawgs.com",
    },
    openGraph: {
        title: "MetaDawgs - Complete Quests & Earn Crypto Rewards | #1 Solana Gaming Platform",
        description:
            "🚀 Join 50,000+ players earning crypto on MetaDawgs! Complete quests, earn tokens, climb leaderboards. The ultimate gamified Web3 experience on Solana. Start earning today!",
        url: "https://metadawgs.com",
        siteName: "MetaDawgs",
        images: [
            {
                url: "https://res.cloudinary.com/kawojue/image/upload/v1748125049/MD1-1_kf4paa.png",
                width: 1200,
                height: 630,
                alt: "MetaDawgs - Complete Quests & Earn Crypto Rewards on Solana",
                type: "image/png",
            },
            {
                url: "https://res.cloudinary.com/kawojue/image/upload/v1748125049/MD1-1_kf4paa.png",
                width: 400,
                height: 400,
                alt: "MetaDawgs Logo - Crypto Gaming Platform",
                type: "image/png",
            },
        ],
        locale: "en_US",
        type: "website",
        countryName: "United States",
    },
    twitter: {
        card: "summary_large_image",
        title: "MetaDawgs - Complete Quests & Earn Crypto Rewards | #1 Solana Gaming Platform",
        description:
            "🚀 Join 50,000+ players earning crypto on MetaDawgs! Complete quests, earn tokens, climb leaderboards. The ultimate gamified Web3 experience on Solana. Start earning today!",
        site: "@Meta_Dawgs",
        creator: "@Meta_Dawgs",
        images: [
            {
                url: "https://res.cloudinary.com/kawojue/image/upload/v1748125049/MD1-1_kf4paa.png",
                alt: "MetaDawgs - Complete Quests & Earn Crypto Rewards on Solana",
                width: 1200,
                height: 630,
            },
        ],
    },
    icons: {
        icon: [
            { url: "/images/man-icon.png", type: "image/png", sizes: "32x32" },
            { url: "/images/man-icon.png", type: "image/png", sizes: "16x16" },
        ],
        apple: [
            {
                url: "/images/man-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
        shortcut: "/images/man-icon.png",
    },
    manifest: "/manifest.json",
    metadataBase: new URL("https://metadawgs.com"),
    applicationName: "MetaDawgs",
    referrer: "origin-when-cross-origin",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    other: {
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge",
        "theme-color": "#000000",
        "mobile-web-app-capable": "yes",
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "black-translucent",
        "apple-mobile-web-app-title": "MetaDawgs",
        "application-name": "MetaDawgs",
        "msapplication-TileColor": "#000000",
        "msapplication-config": "/browserconfig.xml",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${josefinSans.variable} ${geistMono.variable} ${fredoka.variable} antialiased`}
            >
                <JsonLd />
                <WalletConnectionProvider>
                    <SocketProvider>
                        <MainLayout>{children}</MainLayout>
                    </SocketProvider>
                </WalletConnectionProvider>

                <Toaster />
            </body>
        </html>
    );
}
