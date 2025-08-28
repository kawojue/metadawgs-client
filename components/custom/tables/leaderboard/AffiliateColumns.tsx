import { InfoIcon } from "lucide-react";
import { AffiliateLeaderboardType } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";

export const affiliate_columns: ColumnDef<AffiliateLeaderboardType>[] = [
    {
        accessorKey: "rank",
        header: () => (
            <div className="text-white flex items-center">
                Rank
                <InfoIcon className="ml-2 h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => {
            const index = row.index + 1;
            const suffix =
                index === 1
                    ? "st"
                    : index === 2
                    ? "nd"
                    : index === 3
                    ? "rd"
                    : "th";
            return (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold text-sm">
                        {index}
                    </div>
                    <span className="text-white font-medium">
                        {index}
                        {suffix} Place
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "address",
        header: () => <div className="text-white">Wallet Address</div>,
        cell: ({ row }) => {
            const address = row.getValue("address") as string;
            const shortAddress = `${address.slice(0, 6)}...${address.slice(
                -4
            )}`;
            return (
                <div className="text-white font-mono">
                    <span className="bg-gray-800 px-2 py-1 rounded text-sm">
                        {shortAddress}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "referralCount",
        header: () => <div className="text-white">Referrals</div>,
        cell: ({ row }) => (
            <div className="text-white flex items-center gap-2">
                <span>🔗</span>
                <span className="font-semibold">
                    {row.getValue("referralCount")}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "totalEarned",
        header: () => <div className="text-white">Total SOL Earned</div>,
        cell: ({ row }) => {
            const totalEarned = row.getValue("totalEarned") as number;
            return (
                <div className="text-white flex items-center gap-2">
                    <span>💰</span>
                    <span className="font-semibold">
                        $
                        {totalEarned.toLocaleString("en-US", {
                            minimumFractionDigits: 4,
                            maximumFractionDigits: 4,
                        })}
                    </span>
                </div>
            );
        },
    },
];
