"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import { useState } from "react";
import { PostType } from "@/lib/type";
import Image from "next/image";
import { SubmitQuestAlert } from "./modals/SubmitQuestAlert";
import { patchWithAuth } from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/use-auth";
import VerifyQuestCode from "./modals/VerifyQuestCode";

const PostCard = ({ post }: { post: PostType }) => {
  const { refetchProfile } = useAuth();
  const [showEntryAlert, setShowEntryAlert] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [viewing, setViewing] = useState<boolean>(false);
  const [openVerifyCode, setOpenVerifyCode] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(post.hasEngaged);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await patchWithAuth(`/posts/${post.id}/engage`, {});
      setSubmitted(true);
      setShowEntryAlert(true);

      await refetchProfile();
    } catch (error: unknown) {
      toast(error instanceof Error ? error.message : "Failed to submit.");
      console.error("Failed to submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyCode = async () => {
    setOpenVerifyCode(true);
  };

  const joinQuest = async () => {};

  const handleView = async () => {
    setViewing(true);
    try {
      await patchWithAuth(`/posts/${post.id}/click`, {});

      await refetchProfile();
    } catch (error: unknown) {
      toast(error instanceof Error ? error.message : "Failed to view.");
      console.error("Failed to view:", error);
    } finally {
      setViewing(false);
    }
  };

  return (
    <div className="card rounded-2xl col-span-1 grid after:rounded-2xl max-w-[320px] pool overflow-hidden">
      <div className="banner aspect-video overflow-hidden rounded-t-2xl pool after:bg-[#101928]! after:bottom-0! text-transparent after:rounded-t-2xl">
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
          <div className="point-pill text-xs font-medium bg-[#101928] p-1.5 px-3 rounded-full flex flex-nowrap items-center gap-0.5 text-nowrap">
            {post.point} Bones
          </div>
        </div>
        <h3 className="title font-semibold font-fredoka text-xl line-clamp-2">
          {post.name}
        </h3>
        <p className="text-white text-[15px] line-clamp-4">
          {post.description}
        </p>
        <div className="flex gap-3 items-center">
          {post.buttons.map((btn, index) => {
            if (btn === "View")
              return (
                <a
                  key={index}
                  href={post?.postUrl}
                  className="block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className={cn(
                      "rounded-full !px-5 !py-4 font-medium text-[14px] cursor-pointer text-black bg-[#92A1C6] flex gap-2 items-center",
                      viewing && "cursor-wait"
                    )}
                    onClick={handleView}
                    disabled={viewing}
                  >
                    <span>{viewing ? "Viewing" : "View"}</span>
                    <ArrowUpRightIcon size={11} />
                  </Button>
                </a>
              );

            if (btn === "Claim")
              return (
                <Button
                  key={index}
                  className={cn(
                    "rounded-full !px-5 !py-4 font-medium text-[14px] cursor-pointer text-black bg-[#FFBE00]",
                    isSubmitting && "cursor-wait"
                  )}
                  onClick={handleSubmit}
                  disabled={submitted || isSubmitting}
                >
                  Claim
                </Button>
              );

            if (btn === "Verify Code")
              return (
                <Button
                  key={index}
                  className={cn(
                    "rounded-full !px-5 !py-4 font-medium text-[14px] cursor-pointer text-black bg-[#FFBE00]",
                    isSubmitting && "cursor-wait"
                  )}
                  onClick={verifyCode}
                  disabled={submitted || isSubmitting}
                >
                  VerifyCode
                </Button>
              );

            if (btn === "Done")
              return (
                <Button
                  key={index}
                  className={cn(
                    "rounded-full !px-5 !py-4 font-medium text-[14px] cursor-pointer text-black bg-[#FFBE00]",
                    isSubmitting && "cursor-wait"
                  )}
                  onClick={handleView}
                  disabled={submitted || isSubmitting}
                >
                  Done
                </Button>
              );

            if (btn === "Join")
              return (
                <Button
                  key={index}
                  className={cn(
                    "rounded-full !px-5 !py-4 font-medium text-[14px] cursor-pointer text-black bg-[#92A1C6] ",
                    isSubmitting && "cursor-wait"
                  )}
                  onClick={joinQuest}
                  disabled={submitted || isSubmitting}
                >
                  Join
                </Button>
              );
          })}
        </div>
      </div>

      {showEntryAlert && (
        <SubmitQuestAlert
          open={showEntryAlert}
          onClose={() => setShowEntryAlert(false)}
        />
      )}

      <VerifyQuestCode
        open={openVerifyCode}
        post_id={post.id}
        onClose={() => setOpenVerifyCode(false)}
      />
    </div>
  );
};

export default PostCard;
