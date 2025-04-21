"use client";

import { XUserProfile, XUserToken } from "./values";

export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; message: string; data: T }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const authToken = localStorage.getItem(XUserToken);
  if (!authToken) {
    throw new Error("Authentication token is not available in localStorage");
  }

  const defaultOptions: RequestInit = {
    // credentials: "include",
    headers: {
      Authorization: `Bearer ${JSON.parse(authToken)}`,
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  return fetch(`${apiUrl}${endpoint}`, mergedOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error during fetch:", error);
      throw error;
    });
}

export function logoutUser() {
  localStorage.removeItem(XUserToken);
  localStorage.removeItem(XUserProfile);
}
