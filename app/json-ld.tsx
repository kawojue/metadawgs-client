import Script from "next/script";
import siteConfig from "@/lib/siteConfig";

export default function JsonLd() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "MetaDawgs",
        description: siteConfig.description,
        url: "https://metadawgs.com",
        applicationCategory: "GameApplication",
        operatingSystem: "Web Browser",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        author: {
            "@type": "Organization",
            name: "MetaDawgs Team",
            url: "https://metadawgs.com",
        },
        publisher: {
            "@type": "Organization",
            name: "MetaDawgs",
            logo: {
                "@type": "ImageObject",
                url: "https://res.cloudflare.com/kawojue/image/upload/v1748125049/MD1-1_kf4paa.png",
            },
        },
        sameAs: [
            "https://x.com/Meta_Dawgs",
            "https://t.me/Metadawgsportal",
            "https://www.youtube.com/@MetaDawgs",
        ],
    };

    return (
        <Script
            id="json-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData),
            }}
        />
    );
}
