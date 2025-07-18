"use client";

import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import { ReactNode } from "react";
import Veil from "./Veil";
import { usePathname } from "next/navigation";
import { SignupAlert } from "@/components/custom/modals/SignupAlert";
import useLocalStorage from "use-local-storage";
import {
    XComingSoonModal,
    XCompleteOnboarding,
    XOpenSignUpModal,
} from "@/lib/values";
import { cn } from "@/lib/utils";
import ComingSoonModal from "@/components/custom/modals/ComingSoonModal";
import CompleteOnboardingModal from "@/components/custom/modals/CompleteOnboardingModal";
import { AuthProvider } from "@/context/AuthProvider";

const IGNORED_ROUTE_PATTERNS = [
    /^\/auth/,
    /^\/collab-manager/,
    /^\/wherethemagicrestricted(\/.*)?$/,
    /^\/leaderboard(\/.*)?$/,
    /^\/dawgs-tge$/,
    /^\/dawg-bot$/,
];

function MainLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [openSignup, setOpenSignup] = useLocalStorage(
        XOpenSignUpModal,
        false
    );
    const [comingSoon, setComingSoon] = useLocalStorage(
        XComingSoonModal,
        false
    );
    const [completeOnboarding, setCompleteOnboarding] = useLocalStorage(
        XCompleteOnboarding,
        false
    );

    const isIgnoredRoute = IGNORED_ROUTE_PATTERNS.some((regex) =>
        regex.test(pathname!)
    );

    return (
        <AuthProvider>
            {isIgnoredRoute ? (
                <div className="font-sans content min-h-dch">{children}</div>
            ) : (
                <div className="font-sans">
                    <Navbar />
                    <div
                        className={cn(
                            "content min-h-dch",
                            "bg-black text-white overflow-hidden"
                        )}
                    >
                        {children}
                    </div>
                    {openSignup && (
                        <SignupAlert
                            open={openSignup}
                            onClose={() => setOpenSignup(false)}
                        />
                    )}
                    {comingSoon && (
                        <ComingSoonModal
                            open={comingSoon}
                            onClose={() => setComingSoon(false)}
                        />
                    )}
                    {completeOnboarding && (
                        <CompleteOnboardingModal
                            open={completeOnboarding}
                            onClose={() => setCompleteOnboarding(false)}
                        />
                    )}
                    <Footer />
                    <Veil />
                </div>
            )}
        </AuthProvider>
    );
}

export default MainLayout;
