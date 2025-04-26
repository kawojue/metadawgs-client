"use client";

import {
  XAdminToken,
  XUserAddress,
  XUserProfile,
  XUserToken,
} from "@/lib/values";

async function xFetch<T, K = undefined>(
  endpoint: string,
  options: RequestInit & { baseUrl?: string; isAdmin?: boolean } = {},
  body?: K,
  requiresAuth: boolean = true
): Promise<{ success: boolean; message: string; data: T }> {
  const apiUrl = options.baseUrl || process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (requiresAuth) {
    const authToken = localStorage.getItem(XUserToken);
    const adminAuthToken = localStorage.getItem(XAdminToken);

    if (options.isAdmin) {
      if (!adminAuthToken) {
        throw new Error("Unauthorized");
      }

      headers.Authorization = `Bearer ${JSON.parse(adminAuthToken)}`;
    } else {
      if (!authToken) {
        throw new Error("Unauthorized");
      }

      headers.Authorization = `Bearer ${JSON.parse(authToken)}`;
    }
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
    .then(async (response) => {
      if (!response.ok) {
        const res = await response.json();
        if ([401, 403].includes(response.status)) {
          localStorage.removeItem(options.isAdmin ? XAdminToken : XUserToken);
        }
        throw new Error(res.message || "Something unexpected occurred");
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}

export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit & { baseUrl?: string; isAdmin?: boolean } = {}
): Promise<{ success: boolean; message: string; data: T }> {
  return xFetch<T>(endpoint, options, undefined, true);
}

export async function postWithAuth<T, K>(
  endpoint: string,
  body: K,
  options: RequestInit & { baseUrl?: string; isAdmin?: boolean } = {}
): Promise<{ success: boolean; message: string; data: T }> {
  return xFetch<T, K>(endpoint, { ...options, method: "POST" }, body, true);
}

export async function patchWithAuth<T, K>(
  endpoint: string,
  body: K,
  options: RequestInit & { baseUrl?: string; isAdmin?: boolean } = {}
): Promise<{ success: boolean; message: string; data: T }> {
  return xFetch<T, K>(endpoint, { ...options, method: "PATCH" }, body, true);
}

export async function deleteWithAuth<T, K>(
  endpoint: string,
  options: RequestInit & { baseUrl?: string; isAdmin?: boolean } = {}
): Promise<{ success: boolean; message: string; data: T }> {
  return xFetch<T, K>(
    endpoint,
    { ...options, method: "DELETE" },
    undefined,
    true
  );
}

export function logoutUser() {
  localStorage.removeItem(XUserToken);
  localStorage.removeItem(XUserProfile);
  localStorage.removeItem(XUserAddress);
}
