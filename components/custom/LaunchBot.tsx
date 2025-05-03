"use client";

import { XComingSoonModal } from "@/lib/values";
import useLocalStorage from "use-local-storage";
import { Button } from "../ui/button";
import Link from "next/link";
import { BotIcon } from "lucide-react";

export default function LaunchBot() {
  const [, setComingSoon] = useLocalStorage(XComingSoonModal, false);

  function launchBot() {
    setComingSoon(true);
  }

  return (
    <Link href={"/leaderboard/telegram"} className="block">
      <Button
        className="rounded-full px-7! font-medium !py-6 bg-[#FFBE00] text-black"
        onClick={launchBot}
      >
        <BotIcon /> Launch Bot
      </Button>
    </Link>
  );
}
