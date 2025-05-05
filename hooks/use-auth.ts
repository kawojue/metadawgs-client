"use client";

import { useAuthContext } from '@/context/AuthProvider';
import { useContext } from "react";

export const useAuth = (): AuthContextType => {
  const context = useContext(useAuthContext);
  if (!context) {
    throw new Error("useAtuht must be used within an AuthProvider");
  }
  return context;
};



export default useAuth;
