"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import React, { useState } from "react";

function Page() {
  const [error] = useState<string>("");

  return (
    <div className="size-full flex flex-col justify-center items-center p-4 min-h-full">
      <div className="login-modal bg-white rounded-2xl shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.1)] p-6 sm:p-8 w-md max-w-md flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl font-semibold font-fredoka">Create Quest</h1>
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg w-full text-sm">
            {decodeURIComponent(error)}
          </div>
        )}
        <form className="space-y-5 w-full" action="/api/login">
          {" "}
          {/* replace with correct endpoint */}
          <div className="div space-y-2">
            <label htmlFor="name" className="text-sm block font-fredoka">
              Quest Name
            </label>
            <input
              type="text"
              className="w-full rounded-full block px-5 h-[52px] border-2 border-[#F5F5F5]"
              name="name"
              placeholder="name"
              required
            />
          </div>
          <div className="div space-y-2">
            <label htmlFor="description" className="text-sm block font-fredoka">
              Description
            </label>
            <textarea
              className="w-full rounded-xl min-h-24 max-h-32 p-3 scroll-y-none block px-5 h-[52px] border-2 border-[#F5F5F5]"
              rows={4}
              name="description"
              placeholder="Write about the quest"
              required
            />
          </div>
          <div className="div space-y-2">
            <label htmlFor="tweet_url" className="text-sm block font-fredoka">
              Tweet URL
            </label>
            <input
              type="text"
              className="w-full rounded-full block px-5 h-[52px] border-2 border-[#F5F5F5]"
              name="tweet_url"
              placeholder="Enter post URL"
              required
            />
          </div>
          <div className="div space-y-2">
            <label htmlFor="image_url" className="text-sm block font-fredoka">
              Cover Image URL
            </label>
            <input
              type="text"
              className="w-full rounded-full block px-5 h-[52px] border-2 border-[#F5F5F5]"
              name="image_url"
              placeholder="Enter image URL"
              required
            />
          </div>
          <Button
            className="bg-[#FFBE00] text-black font-medium w-full !py-7 tracking-wide rounded-full cursor-pointer disabled:cursor-not-allowed"
            type="submit"
          >
            Create Quest
            <ArrowUpRightIcon />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
