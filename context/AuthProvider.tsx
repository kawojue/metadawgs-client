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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const profileRes = await fetch(`${apiUrl}/auth/profile`, {
        headers: { Authorization: `Bearer ${userToken}` },
        signal,
      });

      if (!profileRes.ok) {
        if (profileRes.status === 401 || profileRes.status === 403) {
          setUserProfile(null);
          setUserToken("");
          return;
        }

        try {
          const err = await profileRes.json();
          setError(err.message);
        } catch {}
        return;
      }

      const {data:profileData} = await profileRes.json();
      setUserProfile(profileData);

      fetch(`${apiUrl}/user/rank`, {
        headers: { Authorization: `Bearer ${userToken}` },
        signal,
      })
        .then(async (rankRes) => {
          if (rankRes.ok) {
            const {rank: rankData} = await rankRes.json();
            setUserProfile((prev) => ({
              ...prev,
              rank: rankData.rank,
            } as ProfileType));
          }
        })
        .catch(() => {});
    } catch (error) {
      console.error("Failed to fetch profile:", error);
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
  }, [userToken]);

  const login = () => {};

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

  return (
    <AuthContext.Provider value={auth}>
      {children}
      {!!error && (
        <QuestErrorAlert
          open={!!error}
          isOthers={true}
          isRobo={true}
          error={error}
          onClose={() => {
            setError(null);
          }}
        />
      )}
    </AuthContext.Provider>
  );
};
