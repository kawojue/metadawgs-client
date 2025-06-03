"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const username = formData.get("username");
    const password = formData.get("password");
    const rememberMe = formData.has("remember_me");

    if (!username || !password) {
        return redirect(
            `/wherethemagicrestricted/auth?error=${encodeURIComponent(
                "Username and password are required."
            )}`
        );
    }

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            console.error(
                "NEXT_PUBLIC_API_URL environment variable is not defined"
            );
            return redirect(
                `/wherethemagicrestricted/auth?error=${encodeURIComponent(
                    "Server configuration error."
                )}`
            );
        }

        const response = await fetch(`${apiUrl}/auth/admin/admin/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
            cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage =
                data.message || "Login failed. Please check your credentials.";
            return redirect(
                `/wherethemagicrestricted/auth?error=${encodeURIComponent(errorMessage)}`
            );
        }

        if (data.token) {
            (await cookies()).set("auth_token", data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: rememberMe ? 30 * 24 * 60 * 60 : undefined,
            });

            redirect("/wherethemagicrestricted");
        }

        return redirect(
            `/wherethemagicrestricted/auth?error=${encodeURIComponent(
                "Authentication failed. Please try again."
            )}`
        );
    } catch (error) {
        console.error("Login error:", error);
        return redirect(
            `/wherethemagicrestricted/auth?error=${encodeURIComponent(
                "An unexpected error occurred."
            )}`
        );
    }
}
