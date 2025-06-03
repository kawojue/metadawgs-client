"use client";
import React, {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useRef,
} from "react";
import { ProfileType } from "@/lib/type";
import { XUserProfile, XUserToken } from "@/lib/values";
import useLocalStorage from "use-local-storage";
import { QuestErrorAlert } from "@/components/custom/modals/QuestErrorAlert";

export interface AuthContextType {
    userToken: string;
    userProfile: ProfileType | null;
    setUserProfile: (profile: ProfileType | null) => void;
    isLoading: boolean;
    error: string | null;
    login: () => void;
    logout: () => void;
    setUserToken: (token: string) => void;
    refetchProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userToken, setUserToken] = useLocalStorage<string>(XUserToken, "");
    const [userProfile, setUserProfile] = useLocalStorage<ProfileType | null>(
        XUserProfile,
        null
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const handleApiError = async (response: Response) => {
        if (response.status === 401 || response.status === 403) {
            setUserProfile(null);
            setUserToken("");
            return true;
        }

        try {
            const err = await response.json();
            setError(err.message);
        } catch {}
        return false;
    };

    const fetchWithAuth = async (endpoint: string) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}${endpoint}`, {
            headers: { Authorization: `Bearer ${userToken}` },
            signal: abortControllerRef.current?.signal,
        });

        if (!response.ok) {
            await handleApiError(response);
            return null;
        }

        return response.json();
    };

    const fetchProfile = async () => {
        if (!userToken) return;

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        try {
            setIsLoading(true);
            setError(null);

            const profileData = await fetchWithAuth("/auth/profile");
            if (!profileData) return;

            const { data: profile } = profileData as { data: ProfileType };
            setUserProfile(profile);

            const rankData = await fetchWithAuth("/user/rank");
            if (rankData) {
                const {
                    data: { rank, overallPoints },
                } = rankData as { data: { rank: number, overallPoints: number } };
                console.log('overallPoints', overallPoints)
                setUserProfile((prev) => (prev ? { ...prev, rank, overallPoints: overallPoints  } : null));
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        } finally {
            if (abortControllerRef.current?.signal.aborted === false) {
                setIsLoading(false);
                abortControllerRef.current = null;
            }
        }
    };

    const refetchProfile = () => fetchProfile();

    useEffect(() => {
        if (userToken) {
            fetchProfile();
        } else {
            setUserProfile(null);
        }

        return () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = null;
        };
    }, [userToken]);

    const login = () => {};

    const logout = () => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = null;
        setUserProfile(null);
        setUserToken("");
    };

    const auth = {
        userToken,
        userProfile,
        setUserProfile,
        isLoading,
        error,
        login,
        logout,
        setUserToken,
        refetchProfile,
    };

    return (
        <AuthContext.Provider value={auth}>
            {children}
            {error && (
                <QuestErrorAlert
                    open={!!error}
                    isOthers={true}
                    isRobo={true}
                    error={error}
                    onClose={() => setError(null)}
                />
            )}
        </AuthContext.Provider>
    );
};
