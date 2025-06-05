"use client";

import NumberInput from "@/components/custom/NumberInput";
import { Button } from "@/components/ui/button";
import { putWithAuth } from "@/lib/api";
import { Quest } from "@/lib/type";
import { ArrowUpRightIcon } from "lucide-react";
import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generateRandomString } from "@/lib/common";
import useLocalStorage from "use-local-storage";
import { XRefreshTable } from "@/lib/values";
import { toast } from "sonner";

function QuestFormModal({
  quest,
  open,
  onClose,
}: {
  quest: Quest;
  open: boolean;
  onClose?: () => void;
}) {
  const [error, setError] = useState<string>("");
  const [tweetError, setTweetError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [point, setPoint] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [imageUrlPreview, setImageUrlPreview] = useState<string>("");
  const [, setRefreshTable] = useLocalStorage<string>(XRefreshTable, "");

  // Initialize form fields with quest data
  useEffect(() => {
    if (quest && open) {
      setPoint(quest.point?.toString() || "");
      setDuration(quest.duration?.toString() || "");
      setImageUrlPreview(quest.imageUrl || "");
      setError("");
      setTweetError("");
      setImageError("");
      setSuccess(false);
    }
  }, [quest, open]);

  async function submitQuest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const name = formData.get("name") as string;
      const code = formData.get("code") as string;
      const description = formData.get("description") as string;
      const tweetUrl = formData.get("tweetUrl") as string;
      const imageUrl = formData.get("imageUrl") as string;

      await putWithAuth(
        `/posts/update/${quest.id}`,
        {
          id: quest.id,
          name: name,
          description: description,
          postUrl: tweetUrl,
          imageUrl: imageUrl,
          point: Number(point),
          special: true,
          duration: Number(duration),
          code: code,
        },
        {
          isAdmin: true,
        }
      );

      setRefreshTable(generateRandomString(10));
      setSuccess(true);
      onClose?.();
    } catch (error: string | unknown) {
      console.error("Error editing quest:", error);
      toast(
        error?.toString().replace("Error:", "") ||
          "Failed to edit quest. Please try again."
      );
      setError(
        error?.toString().replace("Error:", "") ||
          "Failed to edit quest. Please try again."
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
    const code = formData.get("code") as string;

    return (
      name.trim() !== "" &&
      code.trim() !== "" &&
      description.trim() !== "" &&
      tweetUrl.trim() !== "" &&
      imageUrl.trim() !== "" &&
      point !== "" &&
      !isNaN(Number(point)) &&
      Number(point) > 0 &&
      duration !== "" &&
      !isNaN(Number(duration)) &&
      Number(duration) > 0
    );
  }, [point, duration]);

  return (
    <Dialog
      open={open}
      onOpenChange={(x) => {
        if (!x) {
          onClose?.();
        }
      }}
    >
      <DialogContent
        className="sm:max-w-[456px] bg-white text-black shadow-lg border border-gray-200 rounded-3xl z-[9999] overflow-auto max-h-[90svh] scroll"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-col justify-center gap-2 items-center">
          <DialogTitle className="font-semibold text-xl text-center text-black">
            <h1 className="text-3xl font-semibold font-fredoka">
              Edit Special Quest
            </h1>

            {success && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg w-full text-sm">
                Special Quest updated successfully!
              </div>
            )}
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg w-full text-sm">
                {decodeURIComponent(error)}
              </div>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="size-full flex flex-col justify-center items-center p-2 min-h-full">
          <div className="edit-quest-modal bg-white rounded-2xl shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.1)] p-6 sm:p-8 w-full max-w-lg flex flex-col gap-4 justify-center items-center">
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
                  defaultValue={quest?.name || ""}
                  required
                />
              </div>
              <div className="div space-y-2">
                <label
                  htmlFor="description"
                  className="text-sm block font-fredoka"
                >
                  Description
                </label>
                <textarea
                  className="w-full rounded-xl min-h-24 max-h-32 p-3 scroll-y-none block px-5 h-[52px] border-2 border-[#F5F5F5]"
                  rows={4}
                  name="description"
                  placeholder="Write about the quest"
                  defaultValue={quest?.description || ""}
                  required
                />
              </div>
              <div className="div space-y-2">
                <label
                  htmlFor="tweetUrl"
                  className="text-sm block font-fredoka"
                >
                  Tweet URL
                </label>
                <input
                  type="text"
                  className="w-full rounded-full block px-5 h-[52px] border-2 border-[#F5F5F5]"
                  name="tweetUrl"
                  placeholder="Enter post URL"
                  defaultValue={quest?.postUrl || ""}
                  required
                  onChange={(e) => {
                    const url = e.target.value;
                    const twitterRegex =
                      /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.+$/;
                    if (!twitterRegex.test(url)) {
                      setTweetError("Please enter a valid Twitter (X) URL.");
                    } else {
                      setTweetError("");
                    }
                  }}
                />
                {tweetError && (
                  <p className="text-red-500 text-sm mt-1">{tweetError}</p>
                )}
              </div>
              {imageUrlPreview && !imageError && (
                <div className="div space-y-2">
                  <label className="text-sm block font-fredoka">
                    Image Preview
                  </label>
                  <div className="relative w-full border-2 border-[#F5F5F5] aspect-video rounded-lg overflow-hidden">
                    <img
                      src={imageUrlPreview}
                      width={500}
                      height={250}
                      alt="Preview"
                      className=" object-cover"
                    />
                  </div>
                </div>
              )}
              <div className="div space-y-2">
                <label
                  htmlFor="imageUrl"
                  className="text-sm block font-fredoka"
                >
                  Cover Image URL
                </label>
                <input
                  type="text"
                  className="w-full rounded-full block px-5 h-[52px] border-2 border-[#F5F5F5]"
                  name="imageUrl"
                  placeholder="Enter image URL"
                  defaultValue={quest?.imageUrl || ""}
                  required
                  onChange={(e) => {
                    const url = e.target.value;
                    setImageUrlPreview(url);
                    setImageError("");

                    // Validate the image URL
                    const img = new Image();
                    img.onload = () => setImageError(""); // Clear error if image loads
                    img.onerror = () =>
                      setImageError(
                        "The image URL is invalid or the image does not exist."
                      );
                    img.src = url;
                  }}
                />
                {imageError && (
                  <p className="text-red-500 text-sm mt-1">{imageError}</p>
                )}
              </div>

              <div className="div space-y-2">
                <label htmlFor="point" className="text-sm block font-fredoka">
                  Verification Point
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
              <div className="div space-y-2">
                <label htmlFor="code" className="text-sm block font-fredoka">
                  Code
                </label>
                <input
                  type="string"
                  className="w-full rounded-full block px-5 h-[52px] border-2 border-[#F5F5F5]"
                  name="code"
                  placeholder="Code"
                  defaultValue={quest?.code || ""}
                  required
                />
              </div>
              <div className="div space-y-2">
                <label
                  htmlFor="duration"
                  className="text-sm block font-fredoka"
                >
                  Duration
                </label>
                <NumberInput
                  onChange={setDuration}
                  value={duration}
                  step={1}
                  type="number"
                  className="w-full rounded-full block px-5 h-[52px] border-2 border-[#F5F5F5]"
                  name="duration"
                  placeholder="Duration"
                  required
                />
              </div>
              <Button
                className="bg-[#FFBE00] text-black font-medium w-full !py-7 tracking-wide rounded-full cursor-pointer disabled:cursor-not-allowed"
                type="submit"
                disabled={loading || !isValidInputs}
              >
                {loading ? "Updating..." : "Update Special Quest"}
                <ArrowUpRightIcon />
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default QuestFormModal;
