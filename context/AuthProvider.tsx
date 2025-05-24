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
import { authWithTwitter } from "@/lib/utils";
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
  const [userToken, setUserTokenStorage] = useLocalStorage<string>(
    XUserToken,
    ""
  );
  const [userProfile, setUserProfile] = useLocalStorage<ProfileType | null>(
    XUserProfile,
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenState, setTokenState] = useState(userToken);
  const abortControllerRef = useRef<AbortController | null>(null);

  const setUserToken = (token: string) => {
    setTokenState(token);
    setUserTokenStorage(token);
  };

  const fetchProfile = async (token?: string) => {
    const currentToken = token || tokenState || userToken;
    if (!currentToken) return;

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

        // Only clear token if it's actually invalid (401/403)
        if (error.status === 401 || error.status === 403) {
          setUserProfile(null);
          setTokenState("");
          setUserTokenStorage("");
        }
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
    const handleAuthMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "AUTH_SUCCESS" && event.data.token) {
        console.log("Received auth success message");
        setUserToken(event.data.token);
      } else if (event.data.type === "AUTH_ERROR") {
        console.error("Auth error from popup:", event.data.error);
        setError(event.data.error || "Authentication failed");
      }
    };

    window.addEventListener("message", handleAuthMessage);
    return () => window.removeEventListener("message", handleAuthMessage);
  }, []);

  // Effect for token changes - use tokenState for immediate response
  useEffect(() => {
    if (tokenState) {
      fetchProfile(tokenState);
    } else {
      setUserProfile(null);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [tokenState]);

  // Sync tokenState with storage changes
  useEffect(() => {
    setTokenState(userToken);
  }, [userToken]);

  const login = () => {
    setError(null); // Clear any previous errors
    authWithTwitter();
  };

  const logout = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setUserProfile(null);
    setTokenState("");
    setUserTokenStorage("");
    setError(null);
  };

  const auth = {
    userToken: tokenState,
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
