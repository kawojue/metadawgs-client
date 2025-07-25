"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ReferralCodeContextType {
    referralCode: string;
    setReferralCode: (code: string) => void;
}

const ReferralCodeContext = createContext<ReferralCodeContextType | undefined>(
    undefined
);

export function ReferralCodeProvider({ children }: { children: ReactNode }) {
    const [referralCode, setReferralCode] = useState<string>("");

    return (
        <ReferralCodeContext.Provider value={{ referralCode, setReferralCode }}>
            {children}
        </ReferralCodeContext.Provider>
    );
}

export function useReferralCode() {
    const context = useContext(ReferralCodeContext);
    if (context === undefined) {
        throw new Error(
            "useReferralCode must be used within a ReferralCodeProvider"
        );
    }
    return context;
}

export default ReferralCodeContext;
