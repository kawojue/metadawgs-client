"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import { useState } from "react";
import { PostType } from "@/lib/type";
import Image from "next/image";
import { SubmitEntryAlert } from "./modals/SubmitEntryAlert";
import { patchWithAuth } from "@/lib/api";
import { toast } from "sonner";

const PostCard = ({ post }: { post: PostType }) => {
  const [showEntryAlert, setShowEntryAlert] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(post.hasEngaged);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await patchWithAuth(`/posts/${post.id}/engage`, {});
      setShowEntryAlert(true);
      setSubmitted(true);
    } catch (error: unknown) {
      toast(error instanceof Error ? error.toString() : "Failed to submit.");
      console.error("Failed to submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card rounded-2xl col-span-1 grid bg-[#FBFBFB] border border-[#F5F5F5] overflow-hidden max-w-[320px]">
      <div className="relative banner aspect-video bg-[#E5E5E5] overflow-hidden">
        <Image
          src={post.imageUrl}
          width={360}
          height={280}
          alt="cover"
          className="object-cover"
        />
      </div>
      <div className="info space-y-3 p-4 sm:p-5">
        <div className="rounded-full w-fit overflow-hidden bg-[linear-gradient(90deg,_#FFBE00_0%,_#229EFF_100%)] p-[1px]">
          <div className="point-pill text-xs font-medium bg-[#dfebf5] p-1.5 px-3 rounded-full flex flex-nowrap items-center gap-0.5 text-nowrap">
            {post.point} MetaDwags
          </div>
        </div>
        <h3 className="title font-semibold font-fredoka text-xl ">
          Post Launch on X
        </h3>
        <p className="text-[#677697] text-[15px]">{post.description}</p>
        <div className="flex gap-3 items-center">
          <a
            href={post?.postUrl}
            className="block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="rounded-full !px-5 !py-4 font-normal text-[14px] cursor-pointer text-black bg-[#92A1C6]">
              <span>View Post</span> <ArrowUpRightIcon size={11} />
            </Button>
          </a>
          <Button
            className="rounded-full !px-5 !py-4 font-normal text-[14px] cursor-pointer text-black bg-[#FFBE00]"
            onClick={handleSubmit}
            disabled={submitted || isSubmitting}
          >
            {submitted
              ? "Submitted"
              : isSubmitting
              ? "Submitting..."
              : "Submit"}
          </Button>
        </div>
      </div>

      {showEntryAlert && (
        <SubmitEntryAlert
          open={showEntryAlert}
          onClose={() => setShowEntryAlert(false)}
        />
      )}
    </div>
  );
};

export default PostCard;
