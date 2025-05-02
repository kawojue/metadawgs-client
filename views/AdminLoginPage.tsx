"use client";

import PasswordInput from "@/components/custom/PasswordInput";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import useLocalStorage from "use-local-storage";
import { XAdminToken } from "@/lib/values";

function LoginPage() {
  // const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setAdminToken] = useLocalStorage<string | null>(XAdminToken, null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Clear any previous errors

    const form = e.currentTarget;
    const formData = new FormData(form);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const rememberMe = formData.has("remember_me");

    if (!username || !password) {
      setError("Username and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/auth/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = (await response.json()) as {
        success: boolean;
        message: string;
        data: { token: string };
      };

      if (!response.ok) {
        const errorMessage =
          data.message || "Login failed. Please check your credentials.";
        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      if (data.data.token) {
        setAdminToken(data.data.token);

        if (rememberMe) {
          const thirtyDaysFromNow = new Date();
          thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
          localStorage.setItem(
            "admin-token-expiry",
            thirtyDaysFromNow.toISOString()
          );
        }

        // router.replace("/admin");
        return;
      }

      setError("Authentication failed. Please try again.");
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="size-full flex flex-col justify-center items-center p-4 h-svh">
      <div className="login-modal bg-white rounded-2xl shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.1)] p-6 sm:p-8 w-full max-w-md flex flex-col gap-4 justify-center items-center">
        <Image src={"/images/logo2.svg"} alt="Logo" width={140} height={30} />
        <h1 className="text-3xl font-semibold font-fredoka">
          Login In To Continue
        </h1>
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg w-full text-sm">
            {error}
          </div>
        )}
        <form className="space-y-5 w-full" onSubmit={handleSubmit}>
          <div className="div space-y-2">
            <label htmlFor="username" className="text-sm block font-fredoka">
              Username
            </label>
            <input
              type="text"
              className="w-full rounded-full block px-5 h-[52px] border-2 border-[#F5F5F5]"
              name="username"
              placeholder="Username"
              required
            />
          </div>
          <div className="div space-y-2">
            <label htmlFor="password" className="text-sm block font-fredoka">
              Password
            </label>
            <PasswordInput
              type="password"
              className="w-full rounded-full block px-5 h-[52px] border-2 border-[#F5F5F5]"
              name="password"
              placeholder="Password"
              required
              showEye
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="remember_me" id="remember_me" />
            <label htmlFor="remember_me">Remember me</label>
          </div>
          <Button
            className="bg-[#FFBE00] text-black font-medium w-full !py-7 tracking-wide rounded-full cursor-pointer disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
            {!isLoading && <ArrowUpRightIcon />}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
