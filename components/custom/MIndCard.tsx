"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import { useState } from "react";
import { MindShareType } from "@/lib/type";
import { SubmitQuestAlert } from "./modals/SubmitQuestAlert";
import { patchWithAuth } from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/use-auth";
import { QuestErrorAlert } from "./modals/QuestErrorAlert";
import { ViewWarningModal } from "./modals/ViewWarningModal";
import { TikTokIcon, TwitterIcon, YoutubeIcon } from "@/lib/icons";
import { XUserToken } from "@/lib/values";

const MindCard = ({ post }: { post: MindShareType }) => {
    const { refetchProfile } = useAuth();
    const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
    const [showEntryAlert, setShowEntryAlert] = useState<boolean>(false);
    const [viewing, setViewing] = useState<boolean>(false);
    const [ignoring, setIgnoring] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(post.hasEngaged);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [showViewWarning, setShowViewWarning] = useState<boolean>(false);

    const handleClaim = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const token = localStorage.getItem(XUserToken);
        if (!token) return;

        setIsSubmitting(true);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/posts/mindshare/entries/${post.id}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "Claim",
                }),
            }
        );

        const { message } = await res.json();

        setIsSubmitting(false);
        setAlertMessage(message);

        if (!res.ok) {
            if ([409, 429].includes(res.status)) {
                setShowErrorAlert(true);
            } else {
                toast(message || "Failed to claim.");
            }
            return;
        } else {
            setSubmitted(true);
            await refetchProfile();
            return;
        }
    };

    const handleReport = async () => {
        const token = localStorage.getItem(XUserToken);
        if (!token) return;

        setIgnoring(true);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/posts/mindshare/entries/${post.id}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "Report",
                }),
            }
        );

        const { message } = await res.json();

        setIgnoring(false);
        setAlertMessage(message);

        if (!res.ok) {
            if ([409, 429].includes(res.status)) {
                setShowErrorAlert(true);
            } else {
                toast(message || "Failed to report.");
            }
            return;
        } else {
            await refetchProfile();
            toast("Report sent. Thank you!");
            return;
        }
    };

    const reportPost = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleReport();
    };

    const handleView = async (e?: React.MouseEvent) => {
        e?.preventDefault();
        e?.stopPropagation();
        setViewing(true);
        try {
            await patchWithAuth(`/posts/mindshare/entries/${post.id}`, {
                action: "View",
            });

            await refetchProfile();
        } catch (error: unknown) {
            toast(error instanceof Error ? error.message : "Failed to view.");
            console.error("Failed to view:", error);
        } finally {
            setViewing(false);
        }
    };

    const handleViewClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowViewWarning(true);
    };

    const proceedWithView = () => {
        handleView();
        window.open(post?.postUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="card rounded-2xl col-span-1 grid after:rounded-2xl max-w-[320px] mx-auto pool overflow-hidden">
            {/* <div className="banner aspect-video overflow-hidden rounded-t-2xl pool after:bg-[#101928]! after:bottom-0! text-transparent after:rounded-t-2xl">
                <Image
                    src={post.imageUrl}
                    width={360}
                    height={280}
                    alt="cover"
                    className="object-cover"
                />
            </div> */}
            <div className="info space-y-3 p-4 sm:p-5">
                <div className="rounded-full w-fit overflow-hidden bg-[linear-gradient(90deg,_#FFBE00_0%,_#229EFF_100%)] p-[1px]">
                    <div className="point-pill text-xs font-medium bg-[#101928] p-1.5 px-3 rounded-full flex flex-nowrap items-center gap-0.5 text-nowrap">
                        {post.bones} Bones
                    </div>
                </div>

                {post.special && (
                    <div className="rounded-full w-fit overflow-hidden bg-[linear-gradient(90deg,_#FFBE00_0%,_#229EFF_100%)] p-[1px] right-4 top-5 absolute">
                        <div className="point-pill text-xs font-medium bg-[#101928] p-1.5 px-3 rounded-full flex flex-nowrap items-center gap-0.5 text-nowrap">
                            Special
                        </div>
                    </div>
                )}
                <div className="flex flex-col gap-4 py-2">
                    <div className="platform">
                        {post.platform === "TikTok" && <TikTokIcon />}
                        {post.platform === "Youtube" && <YoutubeIcon />}
                        {post.platform === "Tweet" && <TwitterIcon />}
                    </div>
                    <div className="space-y-0">
                        <p className="text-white text-[15px] line-clamp-4">
                            {new Date(post?.createdAt).toDateString()}
                        </p>
                        <h3 className="title font-semibold font-fredoka text-xl line-clamp-2">
                            {post?.username}&apos;s Tweet
                        </h3>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                    {post.buttons.map((btn, index) => {
                        if (btn === "View")
                            return (
                                <Button
                                    key={index}
                                    type="button"
                                    className={cn(
                                        "rounded-full !px-5 !py-4 font-medium text-[14px] cursor-pointer text-black bg-[#92A1C6] flex gap-2 items-center",
                                        viewing && "cursor-wait"
                                    )}
                                    onClick={handleViewClick}
                                    disabled={viewing}
                                >
                                    <span>{viewing ? "Viewing" : "View"}</span>
                                    <ArrowUpRightIcon size={11} />
                                </Button>
                            );

                        if (btn === "Claim")
                            return (
                                <Button
                                    key={index}
                                    type="button"
                                    className={cn(
                                        "rounded-full !px-5 !py-4 font-medium text-[14px] cursor-pointer text-black bg-[#FFBE00]",
                                        isSubmitting && "cursor-wait"
                                    )}
                                    onClick={(e) => handleClaim(e)}
                                    disabled={submitted || isSubmitting}
                                >
                                    {isSubmitting ? "Claiming..." : "Claim"}
                                </Button>
                            );

                        if (btn === "Report")
                            return (
                                <Button
                                    key={index}
                                    type="button"
                                    className={cn(
                                        "rounded-full !px-5 !py-4 font-medium text-[14px] cursor-pointer text-white bg-[#aa2e09]",
                                        ignoring && "cursor-wait"
                                    )}
                                    //TODO: ignore fr
                                    disabled={ignoring || post.hasEngaged}
                                    onClick={reportPost}
                                >
                                    {ignoring ? "Reporting" : "Report"}
                                </Button>
                            );
                    })}
                </div>
            </div>

            {showEntryAlert && (
                <SubmitQuestAlert
                    open={showEntryAlert}
                    message={alertMessage}
                    onClose={() => setShowEntryAlert(false)}
                />
            )}

            {showErrorAlert && (
                <QuestErrorAlert
                    open={showErrorAlert}
                    isRobo={false}
                    error={alertMessage}
                    isOthers={true}
                    onClose={() => {
                        setAlertMessage("");
                        setShowErrorAlert(false);
                    }}
                />
            )}

            <ViewWarningModal
                open={showViewWarning}
                onClose={() => setShowViewWarning(false)}
                onProceed={proceedWithView}
            />
        </div>
    );
};

export default MindCard;
