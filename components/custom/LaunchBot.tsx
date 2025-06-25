"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { BotIcon } from "lucide-react";

export default function LaunchBot() {
    function launchBot() {
        window.open("https://t.me/metadawgs_terminal_bot", "_blank");
    }

    return (
        <Link href={"#"} className="block">
            <Button
                className="rounded-full px-7! font-medium !py-6 bg-[#FFBE00] text-black"
                onClick={launchBot}
            >
                <BotIcon /> Launch Bot
            </Button>
        </Link>
    );
}
