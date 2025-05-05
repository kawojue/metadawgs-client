"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
import { ProfileType } from "@/lib/type";
import { useWallet } from "@solana/wallet-adapter-react";
import { XUserProfile, XUserToken } from "@/lib/values";
import { authWithTwitter } from "@/lib/utils";
import useLocalStorage from "use-local-storage";

interface AuthContextType {
  userToken: string;
  userProfile: ProfileType | null;
  setUserProfile: (profile: ProfileType | null) => void;
  isLoading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  setUserToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useLocalStorage<string>(XUserToken, "");
  const [userProfile, setUserProfile] = useLocalStorage<ProfileType | null>(
    XUserProfile,
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { disconnect } = useWallet();

  // Fetch user profile
  useEffect(() => {
    async function getProfile() {
      if (!userToken) return;

      try {
        setIsLoading(true);
        setError(null);

        // Use Promise.all to fetch data in parallel
        const [profileResponse, rankResponse] = await Promise.all([
          fetchWithAuth<ProfileType>("/auth/profile"),
          fetchWithAuth<{ rank: number }>("/user/rank"),
        ]);

        setUserProfile({
          ...profileResponse.data,
          rank: rankResponse.data.rank,
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Failed to load profile");
        setUserProfile(null);
        setUserToken("");
      } finally {
        setIsLoading(false);
      }
    }

    if (userToken) {
      getProfile();
    } else {
      setUserProfile(null);
    }
  }, [userToken]);

  const login = () => {
    authWithTwitter();
  };

  const logout = () => {
    setUserProfile(null);
    setUserToken("");
    disconnect();
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
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
