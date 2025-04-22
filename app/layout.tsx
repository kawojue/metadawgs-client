import type { Metadata } from "next";
import { Geist_Mono, Fredoka, Josefin_Sans } from "next/font/google";
import "./globals.css";
import MainLayout from "./MainLayout";
import { SocketProvider } from "./SocketProvider";
import WalletConnectionProvider from "./WalletProvider";
import siteConfig from "@/lib/siteConfig";

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
  title: "Meta Dawgs",
  description: "Complete Quests, Collect Sparks & Earn MetaDawgs Token",
  keywords: siteConfig.keywords,
  authors: { name: siteConfig.author },
  twitter: {
    site: siteConfig.socialLinks.twitter,
    images: ["/images/paw.svg"],
    card: "app",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: ["/images/paw.svg"],
  },
  publisher: siteConfig.author,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} ${geistMono.variable} ${fredoka.variable} antialiased`}
      >
        <WalletConnectionProvider>
          <SocketProvider>
            <MainLayout>{children}</MainLayout>
          </SocketProvider>
        </WalletConnectionProvider>
      </body>
    </html>
  );
}
