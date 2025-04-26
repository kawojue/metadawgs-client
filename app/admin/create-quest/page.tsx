"use client";

import NumberInput from "@/components/custom/NumberInput";
import { Button } from "@/components/ui/button";
import { postWithAuth } from "@/lib/api";
import { ArrowUpRightIcon } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";

function Page() {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [point, setPoint] = useState<string>("");

  async function submitQuest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const name = formData.get("name") as string;
      const description = formData.get("description") as string;
      const tweetUrl = formData.get("tweetUrl") as string;
      const imageUrl = formData.get("imageUrl") as string;

      await postWithAuth(
        "/posts/create",
        {
          name: name,
          description: description,
          postUrl: tweetUrl,
          imageUrl: imageUrl,
          point: Number(point),
        },
        {
          isAdmin: true,
        }
      );

      formRef.current?.reset();
      setPoint("");
      setSuccess(true);
    } catch (error: string | unknown) {
      console.error("Error creating quest:", error);
      setError(
        error?.toString().replace("Error:", "") ||
          "Failed to create quest. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const isValidInputs = useMemo(() => {
    if (!formRef.current) return false;

    const formData = new FormData(formRef.current);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const tweetUrl = formData.get("tweetUrl") as string;
    const imageUrl = formData.get("imageUrl") as string;

    return (
      name.trim() !== "" &&
      description.trim() !== "" &&
      tweetUrl.trim() !== "" &&
      imageUrl.trim() !== "" &&
      point !== "" &&
      !isNaN(Number(point)) &&
      Number(point) > 0
    );
  }, [point]);

  return (
    <div className="size-full flex flex-col justify-center items-center p-2 min-h-full">
      <div className="login-modal bg-white rounded-2xl shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.1)] p-6 sm:p-8 w-full max-w-md flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl font-semibold font-fredoka">Create Quest</h1>
        {success && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg w-full text-sm">
            Quest created successfully!
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg w-full text-sm">
            {decodeURIComponent(error)}
          </div>
        )}
        <form
          className="space-y-5 w-full"
          onSubmit={submitQuest}
          ref={formRef}
          onInput={() => {
            setError("");
            setSuccess(false);
          }}
        >
          <div className="div space-y-2">
            <label htmlFor="name" className="text-sm block font-fredoka">
              Quest Name
            </label>
            <input
              type="text"
              className="w-full rounded-full block px-5 h-[52px] border-2 border-[#F5F5F5]"
              name="name"
              placeholder="Name"
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
            <label htmlFor="tweetUrl" className="text-sm block font-fredoka">
              Tweet URL
            </label>
            <input
              type="text"
              className="w-full rounded-full block px-5 h-[52px] border-2 border-[#F5F5F5]"
              name="tweetUrl"
              placeholder="Enter post URL"
              required
            />
          </div>
          <div className="div space-y-2">
            <label htmlFor="imageUrl" className="text-sm block font-fredoka">
              Cover Image URL
            </label>
            <input
              type="text"
              className="w-full rounded-full block px-5 h-[52px] border-2 border-[#F5F5F5]"
              name="imageUrl"
              placeholder="Enter image URL"
              required
            />
          </div>
          <div className="div space-y-2">
            <label htmlFor="point" className="text-sm block font-fredoka">
              Point
            </label>
            <NumberInput
              onChange={setPoint}
              value={point}
              type="number"
              className="w-full rounded-full block px-5 h-[52px] border-2 border-[#F5F5F5]"
              name="point"
              placeholder="Point"
              required
            />
          </div>
          <Button
            className="bg-[#FFBE00] text-black font-medium w-full !py-7 tracking-wide rounded-full cursor-pointer disabled:cursor-not-allowed"
            type="submit"
            disabled={loading || !isValidInputs}
          >
            {loading ? "Creating..." : "Create Quest"}
            <ArrowUpRightIcon />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
