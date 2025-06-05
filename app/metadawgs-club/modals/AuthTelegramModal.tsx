"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { postWithAuth } from "@/lib/api";
import Image from "next/image";
import useAuth from "@/hooks/use-auth";
import siteConfig from "@/lib/siteConfig";

function AuthTelegramModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  const [code, setCode] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [step2, setStep2] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { refetchProfile } = useAuth();

  async function validateCode() {
    setLoading(true);
    try {
      await postWithAuth("/auth/telegram/verify", {
        code: code,
      });

      await refetchProfile();
      onClose?.();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function getCode() {
    setLoading(true);
    try {
      const { message } = await postWithAuth("/auth/telegram/link", {
        username: username,
      });

      setMessage(message);

      setStep2(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  function willDoThatLater() {
    setUsername("");
    setCode("");
    setTimeout(() => onClose?.(), 0);
  }

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
        className="sm:max-w-[456px] bg-black text-white shadow-sm border  border-white/20 rounded-3xl"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-col justify-center gap-2 items-center">
          <div className="circle bg-white rounded-full p-2.5 mb-1">
            <Image
              src={"/images/man-avatar.png"}
              alt="man"
              width={100}
              height={100}
            />
          </div>
          <DialogTitle className="font-fredoka text-2xl text-center">
            Authenticate Telegram
          </DialogTitle>
          {!step2 && (
            <p className="text-center">
              If you {"haven't"} joined, please join:{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={siteConfig.socialLinks.telegram}
                className="text-semibold text-blue-400"
              >
                MetaDawgs
              </a>
              , then come back to authenticate.
            </p>
          )}
          {message && (
            <DialogDescription className="text-center text-white px-6">
              A link has been sent to the telegram group get your access code
              there.
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="grid gap-5 py-2 content">
          {!step2 && (
            <div className="row flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-base font-fredoka font-semibold"
              >
                Telegram Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                name="username"
                onInput={() => setError(null)}
                onChange={(x) => setUsername(x.target.value)}
                className="h-12 rounded-full w-full p-4 border border-[#9C9C9C] bg-white/10"
              />
              {!!error && <p className="error text-red-500 text-sm">{error}</p>}
            </div>
          )}

          {step2 && (
            <div className="row flex flex-col gap-2">
              <label
                htmlFor="code"
                className="text-base font-fredoka font-semibold"
              >
                Input Code
              </label>
              <input
                type="text"
                placeholder="Enter code"
                value={code}
                name="code"
                onInput={() => setError(null)}
                maxLength={6}
                onChange={(x) => setCode(x.target.value)}
                className="h-12 rounded-full w-full p-4 border border-[#9C9C9C] bg-white/10"
              />
              {!!error && <p className="error text-red-500 text-sm">{error}</p>}
            </div>
          )}
        </div>
        <DialogFooter className="w-full flex flex-col sm:flex-col gap-4 sm:justify-start">
          {!step2 && (
            <>
              <Button
                type="button"
                className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
                disabled={!!error || !username || loading}
                onClick={getCode}
              >
                {loading ? "Loading..." : "Get Code"}
              </Button>
              <Button
                type="button"
                disabled={loading}
                className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black disabled:cursor-not-allowed!"
                onClick={willDoThatLater}
              >
                Cancel
              </Button>
            </>
          )}
          {step2 && (
            <>
              <Button
                type="button"
                className="w-full py-6! rounded-full cursor-pointer bg-[#FFBE00] text-black disabled:cursor-not-allowed!"
                disabled={!!error || code.length < 6 || loading}
                onClick={validateCode}
              >
                {!loading ? "Confirm" : "Confirming"}
              </Button>
              <Button
                type="button"
                disabled={loading}
                className="w-full py-6! rounded-full cursor-pointer bg-[white] text-black disabled:cursor-not-allowed!"
                onClick={() => {
                  setStep2(false);
                  setUsername("");
                  setCode("");
                  onClose?.();
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AuthTelegramModal;
