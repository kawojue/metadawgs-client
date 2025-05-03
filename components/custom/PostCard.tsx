"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { PostType, ProfileType } from "@/lib/type";
import Image from "next/image";
import { SubmitQuestAlert } from "./modals/SubmitQuestAlert";
import { patchWithAuth } from "@/lib/api";
import { toast } from "sonner";
import useLocalStorage from "use-local-storage";
import { XCompleteOnboarding, XUserProfile } from "@/lib/values";

const PostCard = ({ post }: { post: PostType }) => {
  const [showEntryAlert, setShowEntryAlert] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(post.hasEngaged);
  const [userProfile] = useLocalStorage<ProfileType | null>(XUserProfile, null);
  const [, setCompleteOnboarding] = useLocalStorage(XCompleteOnboarding, false);

  const isOnboardingCompleted = useMemo(
    () => !userProfile?.eligibleToUseReferralCode,
    [userProfile?.eligibleToUseReferralCode]
  );

  const handleSubmit = async () => {
    if (!isOnboardingCompleted) {
      setCompleteOnboarding(true);
      return;
    }

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
            {post.point} Points
          </div>
        </div>
        <h3 className="title font-semibold font-fredoka text-xl line-clamp-2">
          {post.name}
        </h3>
        <p className="text-white text-[15px] line-clamp-4">
          {post.description}
        </p>
        <div className="flex gap-3 items-center">
          <a
            href={post?.postUrl}
            className="block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="rounded-full !px-5 !py-4 font-medium text-[14px] cursor-pointer text-black bg-[#92A1C6]">
              <span>View</span> <ArrowUpRightIcon size={11} />
            </Button>
          </a>
          <Button
            className="rounded-full !px-5 !py-4 font-medium text-[14px] cursor-pointer text-black bg-[#FFBE00]"
            onClick={handleSubmit}
            disabled={submitted || isSubmitting}
          >
            Done
          </Button>
        </div>
      </div>

      {showEntryAlert && (
        <SubmitQuestAlert
          open={showEntryAlert}
          onClose={() => setShowEntryAlert(false)}
        />
      )}
    </div>
  );
};

export default PostCard;
