import type { Metadata } from "next";
import { Geist_Mono, Fredoka, Josefin_Sans } from "next/font/google";
import "./globals.css";
import MainLayout from "./MainLayout";
import { SocketProvider } from "./SocketProvider";
import WalletConnectionProvider from "./WalletProvider";
import siteConfig from "@/lib/siteConfig";
import { Toaster } from "@/components/ui/sonner";

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
        template: "Meta Dawgs | %s",
        default: "Meta Dawgs",
    },
    description: "Complete Quests & Earn MetaDawgs Token",
    keywords: siteConfig.keywords,
    authors: { name: siteConfig.author },
    twitter: {
        site: siteConfig.socialLinks.twitter,
        images: ["/images/man-avatar.png"],
        card: "summary",
    },

    openGraph: {
        type: "website",
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: siteConfig.title,
        images: ["/images/man-avatar.png"],
    },
    publisher: siteConfig.author,
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
