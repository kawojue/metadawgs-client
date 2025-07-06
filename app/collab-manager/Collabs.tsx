"use client";

import { FadeInUp } from "@/components/custom/ScrollAnimation";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { postWithAuth } from "@/lib/api";
import { authUrl, cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const defaultFormData = {
  link: "",
  telegram_handle: "",
  about: "",
};

function CollabsPage() {
  const { userProfile } = useAuth();
  const [formData, setFormData] = useState(defaultFormData);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    !userProfile ? "Connect X account to fill form." : ""
  );

  async function handleSubmit() {
    setLoading(true);
    try {
      await postWithAuth("/user/collab-application", {
        answer: formData.about,
        telegramHandle: formData.telegram_handle,
        otherUrl: formData.link,
      });

      setSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  const handleTwitterConnect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get("ref");

    let connectUrl;
    if (ref) {
      connectUrl = `${authUrl}?ref=${ref}`;
    } else {
      connectUrl = authUrl;
    }

    sessionStorage.setItem("authFrom", "/collab-manager");

    window.location.href = connectUrl;
  };

  return (
    <div className={cn("content", "bg-black text-white overflow-hidden")}>
      <div className="flex flex-col-reverse md:grid md:grid-cols-2 min-h-svh gap-y-6">
        <div className="col-span-1 flex-1 flex justify-center items-center flex-col">
          <div className="info flex flex-col gap-1 p-6 py-8">
            <h1 className="text-4xl font-bold pb-2">Benefits</h1>
            {/* <div className="hidden md:block">
              <Link href={"/"} className="logo">
                <Image
                  src="/images/logo.svg"
                  alt="MetaDawgs"
                  width={150}
                  height={35}
                />
              </Link>
              <br />
            </div> */}
            <div className="bg-black text-white flex flex-col gap-6 md:gap-12 justify-center items-center">
              <FadeInUp className="flex flex-col gap-6 md:gap-12 justify-center items-center">
                <ul className="grid gap-4 max-w-xl mx-auto">
                  <li className="flex gap-3 pool rounded-2xl after:rounded-2xl p-4 sm:p-6">
                    <div className="border-2 mt-0.5 font-medium shadow-[inset_0px_-1.5px_3px_0px_rgba(0,0,0,0.4)] rounded-full size-[30px] min-w-[30px] border-[#FFBE00]">
                      <Image
                        width={30}
                        height={30}
                        alt="A"
                        className="object-cover"
                        src={"/images/man-avatar.png"}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold font-fredoka text-lg md:text-xl">
                        Get Access to Metadawgs Team Benefit
                      </span>
                      <span className="text-[#ACACAC] md:text-lg text-base">
                        Outstanding performance can earn you an exclusive
                        invitation to join the Metadawgs core team
                      </span>
                    </div>
                  </li>

                  <li className="flex gap-3 pool rounded-2xl after:rounded-2xl p-4 sm:p-6">
                    <div className="border-2 mt-0.5 font-medium shadow-[inset_0px_-1.5px_3px_0px_rgba(0,0,0,0.4)] rounded-full size-[30px] min-w-[30px] border-[#A078FF]">
                      <Image
                        width={30}
                        height={30}
                        alt="A"
                        className="object-cover"
                        src={"/images/man-avatar.png"}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold font-fredoka text-lg md:text-xl">
                        Get Early Access to Metadawgs Info-fi affiliate program
                      </span>
                      <span className="text-[#ACACAC] md:text-lg text-base">
                        Metadawgs is pioneering the first Info-fi application on
                        Solana. Get early access to earn from the Metadawgs
                        upcoming Info-fi affiliate program.
                      </span>
                    </div>
                  </li>

                  <li className="flex gap-3 pool rounded-2xl after:rounded-2xl p-4 sm:p-6">
                    <div className="border-2 mt-0.5 font-medium shadow-[inset_0px_-1.5px_3px_0px_rgba(0,0,0,0.4)] rounded-full size-[30px] min-w-[30px] border-[#00C159]">
                      <Image
                        width={30}
                        height={30}
                        alt="A"
                        className="object-cover"
                        src={"/images/man-avatar.png"}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold font-fredoka text-lg md:text-xl">
                        Get special Solana reward at TGE
                      </span>
                      <span className="text-[#ACACAC] md:text-lg text-base">
                        Participate actively and qualify for exclusive
                        Solana-based rewards during the Token Generation Event
                        (TGE) our way of recognizing early contributors and
                        community champions.
                      </span>
                    </div>
                  </li>

                  <li className="flex gap-3 pool rounded-2xl after:rounded-2xl p-4 sm:p-6">
                    <div className="border-2 mt-0.5 font-medium shadow-[inset_0px_-1.5px_3px_0px_rgba(0,0,0,0.4)] rounded-full size-[30px] min-w-[30px] border-[#c12700]">
                      <Image
                        width={30}
                        height={30}
                        alt="A"
                        className="object-cover"
                        src={"/images/man-avatar.png"}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold font-fredoka text-lg md:text-xl">
                        Earn Exclusive Token Rewards
                      </span>
                      <span className="text-[#ACACAC] md:text-lg text-base">
                        Stand out as a top contributor and earn exclusive token
                        rewards. Your efforts won’t go unnoticed get rewarded
                        directly in our native token for driving impact across
                        the Metadawgs ecosystem.
                      </span>
                    </div>
                  </li>
                </ul>
              </FadeInUp>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex-1 flex justify-center items-center flex-col">
          <div className="info flex flex-col gap-3 p-6 py-8 md:pb-8 pb-0 w-full max-w-lg mx-auto">
            <div className="md:hidden block pb-2">
              <Link href={"/"} className="logo">
                <Image
                  src="/images/logo.svg"
                  alt="MetaDawgs"
                  width={150}
                  height={35}
                />
              </Link>
              <br />
            </div>
            {!success && (
              <>
                <h2 className="text-4xl font-bold">Form</h2>
                {error && (
                  <div className="error-box bg-red-100/5 text-red-100 rounded px-4 py-2.5 text-sm grid items-center">
                    {error}
                  </div>
                )}
                <form
                  className="grid gap-6 w-full"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!userProfile) return;
                    await handleSubmit();
                  }}
                >
                  <div className="grid gap-2">
                    <label htmlFor="about">Tell us about yourself:</label>
                    <textarea
                      name="about"
                      required
                      disabled={!userProfile}
                      id="about"
                      value={formData.about}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          about: e.currentTarget.value,
                        })
                      }
                      className="bg-white/10 text-white disabled:cursor-not-allowed disabled:bg-white/20 min-h-18 h-full px-4 py-4 min-w-full max-h-40 rounded-sm"
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="telegram_handle">Telegram Handle</label>
                    <input
                      type="text"
                      name="telegram_handle"
                      required
                      disabled={!userProfile}
                      id="telegram_handle"
                      value={formData.telegram_handle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          telegram_handle: e.currentTarget.value.trim(),
                        })
                      }
                      className="bg-white/10 text-white disabled:cursor-not-allowed disabled:bg-white/20 h-12 px-4 min-w-full rounded-sm"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="link">
                      Submit a link to your social or any relevant link
                      (Optional)
                    </label>
                    <input
                      type="url"
                      name="link"
                      disabled={!userProfile}
                      id="link"
                      value={formData.link}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          link: e.currentTarget.value.trim(),
                        })
                      }
                      className="bg-white/10 text-white disabled:cursor-not-allowed disabled:bg-white/20 h-12 px-4 min-w-full rounded-sm"
                    />
                  </div>

                  {!userProfile && (
                    <Button
                      className="py-6! bg-[#FFBE00] text-black disabled:opacity-80"
                      disabled={loading}
                      onClick={handleTwitterConnect}
                      type="button"
                    >
                      Connect X
                    </Button>
                  )}

                  {userProfile && (
                    <Button
                      className="py-6! bg-[#FFBE00] text-black disabled:opacity-80"
                      disabled={loading}
                      type="submit"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  )}
                </form>
              </>
            )}

            {success && (
              <>
                <div className="bg-black text-white border-white/20 rounded-2xl p-8 flex flex-col items-center">
                  <div className="flex flex-col justify-center items-center gap-4">
                    <div className="circle bg-white rounded-full p-2.5 mb-1">
                      <Image
                        src={"/images/check.svg"}
                        alt="check"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="text-center font-fredoka text-3xl px-10 capitalize">
                      Collabs Application Submitted
                    </div>
                    <div className="text-center max-w-[380px] text-white text-base">
                      {`An Admin will review your submission, and if you're selected, you will be tagged in the group.`}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-6 w-full items-center justify-center">
                    <button
                      className="w-full py-3.5 rounded-full text-sm font-medium h-fit cursor-pointer bg-[#FFBE00] text-black shadow-[black]/40 flex items-center gap-2 justify-center shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] hover:opacity-80"
                      onClick={() => {
                        window.open("https://t.me/+LiGTsDTk4YwyYzRk", "_blank");

                        // update to the right place
                      }}
                      type="button"
                    >
                      Join Collab Request Group
                      <svg
                        width="15"
                        height="15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M7 17L17 7M7 7h10v10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollabsPage;
