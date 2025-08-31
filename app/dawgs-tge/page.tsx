"use client";

import { Suspense, useState, useEffect } from "react";
import Claim from "@/components/custom/ClaimBtn";
import { FadeIn } from "@/components/custom/ScrollAnimation";
import PresaleForm from "@/views/PresaleForm";
import { useReferralCode } from "@/context/ReferralCodeContext";
import { MetricsProvider } from "@/context/MetricsProvider";
import { MobileWalletModal } from "@/components/custom/modals/MobileWalletModal";

function Page() {
    const isComingSoon = false;
    const { referralCode } = useReferralCode();
    const [showMobileModal, setShowMobileModal] = useState(false);

    useEffect(() => {
        // Show modal after page loads with reduced delay
        const timer = setTimeout(() => {
            setShowMobileModal(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <MetricsProvider>
            <div className="text-white relative" style={{ minHeight: "100vh" }}>
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: "url(/presale-bg.svg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                ></div>
                <div className="relative z-10">
                    <div className="p-4 sm:p-6 md:p-15 py-5 flex flex-col gap-5 justify-center items-center">
                        <FadeIn>
                            {isComingSoon && (
                                <h1 className="title md:text-[76px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka font-bold uppercase text-center">
                                    Metadawgs Token <br />
                                    Generation event <br />
                                    is coming...
                                </h1>
                            )}

                            {!isComingSoon && (
                                <h1 className="title md:text-[76px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka font-bold uppercase text-center">
                                    METADAWGS PUBLIC SALE IS LIVE..
                                </h1>
                            )}
                        </FadeIn>
                    </div>
                    <div className="flex items-center justify-center">
                        <Claim />
                    </div>
                    <div className="box md:p-[8%] p-6 md:pt-[5%] pt-10">
                        <Suspense fallback={<div>Loading...</div>}>
                            <PresaleForm
                                isComing={isComingSoon}
                                referralCode={referralCode}
                            />
                        </Suspense>
                    </div>
                </div>

                <MobileWalletModal
                    open={showMobileModal}
                    onClose={() => setShowMobileModal(false)}
                />
            </div>
        </MetricsProvider>
    );
}

export default Page;
