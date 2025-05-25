"use client";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useRef,
} from "react";
import { fetchWithAuth } from "@/lib/api";
import { ProfileType } from "@/lib/type";
import { XUserProfile, XUserToken } from "@/lib/values";
// import { authWithTwitter } from "@/lib/utils";
import useLocalStorage from "use-local-storage";

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

  const fetchProfile = async () => {
    if (!userToken) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      setIsLoading(true);
      setError(null);
      const signal = abortControllerRef.current.signal;

      const [profileResponse, rankResponse] = await Promise.all([
        fetchWithAuth<ProfileType>("/auth/profile", { signal }),
        fetchWithAuth<{ rank: number }>("/user/rank", { signal }),
      ]);

      setUserProfile({
        ...profileResponse.data,
        rank: rankResponse.data.rank,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Failed to fetch profile:", error);
        setError("Failed to load profile");
        setUserProfile(null);
        setUserToken("");
      }
    } finally {
      if (abortControllerRef.current?.signal.aborted === false) {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    }
  };

  const refetchProfile = async () => {
    await fetchProfile();
  };

  useEffect(() => {
    if (userToken) {
      fetchProfile();
    } else {
      setUserProfile(null);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  const login = () => {
    // authWithTwitter();
  };

  const logout = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
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

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
