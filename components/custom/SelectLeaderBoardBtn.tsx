"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStringQuery } from "@/hooks/use-query";
import { LeaderboardType } from "@/lib/type";

const options: LeaderboardType[] = [
    "overall",
    "referrals",
    "grinders",
    "creators",
    "telegram",
];

export default function SelectLeaderboardBtn() {
    const [selected, setSelected] = useStringQuery<LeaderboardType>(
        "type",
        "overall"
    );
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = (option: LeaderboardType) => {
        setSelected(option);
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Capitalize the option label for display
    const displayLabel = (opt: string) =>
        opt.charAt(0).toUpperCase() + opt.slice(1);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <Button
                onClick={() => setIsOpen((prev) => !prev)}
                className="bg-[#FFBE00] text-black rounded-full !p-5 py-4! hover:bg-[#FFBE00]/80 flex items-center gap-2"
            >
                <span>{displayLabel(selected)} Leaderboard</span>
                <ChevronDown
                    size={16}
                    className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </Button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-full bg-black py-2 text-white border border-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="px-4 py-2 text-sm hover:opacity-80 text-center w-full cursor-pointer"
                        >
                            {displayLabel(option)} Leaderboard
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
