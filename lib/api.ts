"use client";

import { XUserAddress, XUserProfile, XUserToken } from "./values";

async function xFetch<T, K = undefined>(
  endpoint: string,
  options: RequestInit = {},
  body?: K,
  requiresAuth: boolean = true
): Promise<{ success: boolean; message: string; data: T }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (requiresAuth) {
    const authToken = localStorage.getItem(XUserToken);
    if (!authToken) {
      throw new Error("Unauthorized");
    }
    headers.Authorization = `Bearer ${JSON.parse(authToken)}`;
  }

  if (body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const mergedOptions: RequestInit = {
    ...options,
    headers,
  };

  if (body) {
    mergedOptions.body = JSON.stringify(body);
  }

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

export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; message: string; data: T }> {
  return xFetch<T>(endpoint, options, undefined, true);
}

export async function postWithAuth<T, K>(
  endpoint: string,
  body: K,
  options: RequestInit = {}
): Promise<{ success: boolean; message: string; data: T }> {
  return xFetch<T, K>(endpoint, options, body, true);
}

export function logoutUser() {
  localStorage.removeItem(XUserToken);
  localStorage.removeItem(XUserProfile);
  localStorage.removeItem(XUserAddress);
}
