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
import { XUserToken } from "@/lib/values";
import { QuestErrorAlert } from "./modals/QuestErrorAlert";

const PostCard = ({ post }: { post: PostType }) => {
    const { refetchProfile } = useAuth();
    const [isRobo, setIsRobo] = useState<boolean>(false);
    const [roboMessage, setRoboMessage] = useState<string>("");
    const [showEntryAlert, setShowEntryAlert] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [viewing, setViewing] = useState<boolean>(false);
    const [openVerifyCode, setOpenVerifyCode] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(post.hasEngaged);
    const [alertMessage, setAlertMessage] = useState<string>("");

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const token = localStorage.getItem(XUserToken);
        if (!token) return;

        setIsSubmitting(true);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}/engage`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const { message } = await res.json();

        setIsSubmitting(false);

        if (res.status === 429) {
            setIsRobo(true);
            setRoboMessage(message);
            return;
        }

        if (!res.ok) {
            toast(message || "Failed to submit.");
        } else {
            setSubmitted(true);
            setAlertMessage(message);
            setShowEntryAlert(true);
        }

        // try {
        //     const { message } = await patchWithAuth(
        //         `/posts/${post.id}/engage`,
        //         {}
        //     );
        //     setSubmitted(true);
        //     setAlertMessage(message);
        //     setShowEntryAlert(true);
        // } catch (error: unknown) {
        //     console.log(error);
        //     toast(error instanceof Error ? error.message : "Failed to submit.");
        //     console.error("Failed to submit:", error);
        //     // if ((error as { status: number }).status === 429) {
        //     //     setIsRobo(true);
        //     //     setRoboMessage((error as { message: string })?.message || "");
        //     // } else {
        //     // }
        // } finally {
        //     setIsSubmitting(false);
        // }
    };

    const verifyCode = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenVerifyCode(true);
    };

    const handleView = async (e?: React.MouseEvent) => {
        e?.preventDefault();
        e?.stopPropagation();
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
                                <Button
                                    key={index}
                                    type="button"
                                    className={cn(
                                        "rounded-full !px-5 !py-4 font-medium text-[14px] cursor-pointer text-black bg-[#92A1C6] flex gap-2 items-center",
                                        viewing && "cursor-wait"
                                    )}
                                    onClick={(e) => {
                                        handleView(e);
                                        window.open(
                                            post?.postUrl,
                                            "_blank",
                                            "noopener,noreferrer"
                                        );
                                    }}
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
                                    onClick={(e) => handleSubmit(e)}
                                    disabled={submitted || isSubmitting}
                                >
                                    Claim
                                </Button>
                            );

                        if (btn === "Verify Code")
                            return (
                                <Button
                                    key={index}
                                    type="button"
                                    className={cn(
                                        "rounded-full !px-5 !py-4 font-medium text-[14px] cursor-pointer text-black bg-[#FFBE00]",
                                        isSubmitting && "cursor-wait"
                                    )}
                                    onClick={verifyCode}
                                    disabled={post.hasVerified}
                                >
                                    Verify Code
                                </Button>
                            );

                        if (btn === "Done")
                            return (
                                <Button
                                    key={index}
                                    type="button"
                                    className={cn(
                                        "rounded-full !px-5 !py-4 font-medium text-[14px] cursor-pointer text-black bg-[#FFBE00]",
                                        isSubmitting && "cursor-wait"
                                    )}
                                    onClick={(e) => handleSubmit(e)}
                                    disabled={submitted || isSubmitting}
                                >
                                    Done
                                </Button>
                            );

                        if (btn === "Join")
                            return (
                                <Button
                                    key={index}
                                    type="button"
                                    className={cn(
                                        "rounded-full !px-5 !py-4 font-medium text-[14px] cursor-pointer text-black bg-[#92A1C6] flex gap-2 items-center",
                                        viewing && "cursor-wait"
                                    )}
                                    onClick={(e) => {
                                        handleView(e);
                                        window.open(
                                            post?.postUrl,
                                            "_blank",
                                            "noopener,noreferrer"
                                        );
                                    }}
                                    disabled={viewing}
                                >
                                    <span>{viewing ? "Joining" : "Join"}</span>
                                    <ArrowUpRightIcon size={11} />
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

            {isRobo && (
                <QuestErrorAlert
                    open={!!roboMessage}
                    isRobo={isRobo}
                    error={roboMessage as string}
                    onClose={() => {
                        setRoboMessage("");
                    }}
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
