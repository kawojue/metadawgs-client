import PasswordInput from "@/components/custom/PasswordInput";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { login } from "@/app/actions";

type SearchParams = Promise<{ error?: string }>;

async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const { error } = await searchParams;

  console.log("error", error);

  return (
    <div className="size-full flex flex-col justify-center items-center p-4 h-svh">
      <div className="login-modal bg-white rounded-2xl shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.1)] p-6 sm:p-8 w-md max-w-md flex flex-col gap-4 justify-center items-center">
        <Image src={"/images/logo2.svg"} alt="Logo" width={140} height={30} />
        <h1 className="text-3xl font-semibold font-fredoka">
          Login In To Continue
        </h1>
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg w-full text-sm">
            {decodeURIComponent(error)}
          </div>
        )}
        <form className="space-y-5 w-full" action={login}>
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
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="remember_me" id="remember_me" />
            <label htmlFor="remember_me">Remember me</label>
          </div>
          <Button
            className="bg-[#FFBE00] text-black font-medium w-full !py-7 tracking-wide rounded-full cursor-pointer disabled:cursor-not-allowed"
            type="submit"
          >
            Sign In
            <ArrowUpRightIcon />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
