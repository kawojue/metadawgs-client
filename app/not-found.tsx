export const runtime = "edge";

import { FadeInUp } from "@/components/custom/ScrollAnimation";
import { NotFoundSVG } from "@/lib/svgs";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-full grid place-content-center min-h-dch place-items-center p-4 sm:p-6 md:p-10">
            <FadeInUp className="content flex flex-col items-center justify-center text-center gap-4">
                <h1 className="text-5xl font-bold font-fredoka">Oops!</h1>
                <p className="text-lg text-[#ACACAC] max-w-sm">
                    Sorry, the page {"you're"} looking for {"doesn't"} exist.
                </p>

                <Link
                    href={"/"}
                    className="rounded-full px-5! flex items-center justify-center gap-2 font-medium !py-3 bg-[#FFC36C] text-black shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] hover:opacity-80"
                >
                    <span className="text-nowrap">Got To Homepage</span>
                    <ArrowUpRight size={16} strokeWidth={3} />
                </Link>
                <br />
                <br />
                <div className="w-full">
                    <NotFoundSVG />
                </div>
            </FadeInUp>
        </div>
    );
}
