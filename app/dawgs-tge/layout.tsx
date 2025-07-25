import type { Metadata } from "next";
import siteConfig from "@/lib/siteConfig";

export const metadata: Metadata = {
    title: "MetaDawgs TGE - Token Generation Event | Buy $MetaDawgs Tokens",
    description:
        "🚀 Join the MetaDawgs Token Generation Event! Buy $MetaDawgs tokens now and be part of the ultimate Solana gaming ecosystem. Early access, exclusive rewards, and community benefits await!",
    keywords: [
        ...siteConfig.keywords,
        "MetaDawgs TGE",
        "token generation event",
        "buy MetaDawgs token",
        "$MetaDawgs presale",
        "Solana token launch",
        "crypto token sale",
        "MetaDawgs ICO",
        "blockchain token event",
        "Web3 token launch",
        "DeFi token presale",
        "gaming token sale",
        "Solana ecosystem token",
    ],
    authors: { name: siteConfig.author, url: "https://metadawgs.com" },
    publisher: siteConfig.author,
    creator: "MetaDawgs Team",
    category: "Cryptocurrency, Token Sale, Blockchain",
    classification: "Token Generation Event",
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
        canonical: "https://metadawgs.com/dawgs-tge",
    },
    openGraph: {
        title: "MetaDawgs TGE - Token Generation Event | Buy $MetaDawgs Tokens Now",
        description:
            "🚀 Join the MetaDawgs Token Generation Event! Buy $MetaDawgs tokens and unlock exclusive gaming rewards on Solana. Early access, community benefits, and the future of Web3 gaming starts here!",
        url: "https://metadawgs.com/dawgs-tge",
        siteName: "MetaDawgs",
        images: [
            {
                url: "https://res.cloudinary.com/kawojue/image/upload/v1748125049/MD1-1_kf4paa.png",
                width: 1200,
                height: 630,
                alt: "MetaDawgs Token Generation Event - Buy $MetaDawgs Tokens",
                type: "image/png",
            },
            {
                url: "https://res.cloudinary.com/kawojue/image/upload/v1748125049/MD1-1_kf4paa.png",
                width: 400,
                height: 400,
                alt: "MetaDawgs TGE Logo - Token Generation Event",
                type: "image/png",
            },
        ],
        locale: "en_US",
        type: "website",
        countryName: "United States",
    },
    twitter: {
        card: "summary_large_image",
        title: "MetaDawgs TGE - Token Generation Event | Buy $MetaDawgs Tokens Now",
        description:
            "🚀 Join the MetaDawgs Token Generation Event! Buy $MetaDawgs tokens and unlock exclusive gaming rewards on Solana. Early access starts now!",
        site: "@Meta_Dawgs",
        creator: "@Meta_Dawgs",
        images: [
            {
                url: "https://res.cloudinary.com/kawojue/image/upload/v1748125049/MD1-1_kf4paa.png",
                alt: "MetaDawgs Token Generation Event - Buy $MetaDawgs Tokens",
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
        "apple-mobile-web-app-title": "MetaDawgs TGE",
        "application-name": "MetaDawgs TGE",
        "msapplication-TileColor": "#000000",
        "msapplication-config": "/browserconfig.xml",
        "ld+json": JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "MetaDawgs Token Generation Event",
            description:
                "Join the MetaDawgs Token Generation Event and buy $MetaDawgs tokens. Be part of the ultimate Solana gaming ecosystem with exclusive rewards and community benefits.",
            url: "https://metadawgs.com/dawgs-tge",
            startDate: new Date().toISOString(),
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            location: {
                "@type": "VirtualLocation",
                url: "https://metadawgs.com/dawgs-tge",
            },
            organizer: {
                "@type": "Organization",
                name: "MetaDawgs Team",
                url: "https://metadawgs.com",
            },
            offers: {
                "@type": "Offer",
                name: "$MetaDawgs Token",
                description: "MetaDawgs gaming tokens on Solana blockchain",
                url: "https://metadawgs.com/dawgs-tge",
                availability: "https://schema.org/InStock",
            },
            sameAs: [
                "https://x.com/Meta_Dawgs",
                "https://t.me/Metadawgsportal",
                "https://www.youtube.com/@MetaDawgs",
            ],
        }),
    },
};

export default function DawgsTGELayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
