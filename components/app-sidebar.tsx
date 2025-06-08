"use client";

import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOutIcon, LucideCreativeCommons } from "lucide-react";
import useLocalStorage from "use-local-storage";
import { XAdminProfile, XAdminToken } from "@/lib/values";
import { AdminProfileType } from "@/lib/type";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const [, setAdminToken] = useLocalStorage(XAdminToken, "");
    const [adminProfile, setAdminProfile] = useLocalStorage<
        AdminProfileType | undefined
    >(XAdminProfile, undefined);

    function logout() {
        localStorage.clear();
        setAdminToken(undefined);
        setAdminProfile(undefined);
    }

    return (
        <Sidebar collapsible="icon" className="z-[999]!" {...props}>
            <SidebarHeader className="p-5 h-22">
                <div className="flex items-center gap-2">
                    <Avatar
                        className="w-10 h-10 min-w-10 min-h-10"
                        suppressHydrationWarning
                    >
                        {/* <AvatarImage src={userProfile?.user.avatar} /> */}
                        <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500"></AvatarFallback>
                    </Avatar>
                    <div className="div -space-y-1">
                        <h4 className="font-medium line-clamp-1">
                            Hi, {adminProfile?.username}
                        </h4>
                        {/* <p className="text-sm-text-gray-400 line-clamp-1">dom@gmail.com</p> */}
                    </div>
                </div>
            </SidebarHeader>
            <hr />
            <SidebarContent className="p-6 py-8">
                <h5 className="text-base text-[#5F80A0] px-6 mb-2">MENU</h5>

                <ul className="flex flex-col gap-2">
                    <li>
                        <Link
                            href={"/wherethemagicrestricted"}
                            className={cn(
                                "flex items-center gap-3 p-4 px-6 rounded-full hover:opacity-80",
                                pathname === "/wherethemagicrestricted" &&
                                    "bg-[#FFBE00] text-black shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] shadow-[#000000]/20",
                                pathname !== "/wherethemagicrestricted" &&
                                    "text-[#5F80A0]"
                            )}
                        >
                            <svg
                                width="16"
                                height="14"
                                viewBox="0 0 16 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.6667 14H3.33335C3.15654 14 2.98697 13.9298 2.86195 13.8048C2.73692 13.6797 2.66669 13.5102 2.66669 13.3334V7.33336H0.666687L7.55135 1.07469C7.67409 0.963013 7.83407 0.901123 8.00002 0.901123C8.16597 0.901123 8.32595 0.963013 8.44869 1.07469L15.3334 7.33336H13.3334V13.3334C13.3334 13.5102 13.2631 13.6797 13.1381 13.8048C13.0131 13.9298 12.8435 14 12.6667 14ZM4.00002 12.6667H12V6.10469L8.00002 2.46869L4.00002 6.10469V12.6667ZM5.33335 10H10.6667V11.3334H5.33335V10Z"
                                    fill={
                                        pathname === "/wherethemagicrestricted"
                                            ? "black"
                                            : "#5F80A0"
                                    }
                                />
                            </svg>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={"/wherethemagicrestricted/users"}
                            className={cn(
                                "flex items-center gap-3 p-4 px-6 rounded-full hover:opacity-80",
                                pathname.startsWith(
                                    "/wherethemagicrestricted/users"
                                ) &&
                                    "bg-[#FFBE00] text-black shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] shadow-[#000000]/20",
                                !pathname.startsWith(
                                    "/wherethemagicrestricted/users"
                                ) && "text-[#5F80A0]"
                            )}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.36665 6.66658C4.53822 6.66658 3.86665 5.99499 3.86665 5.16658C3.86665 4.33816 4.53822 3.66658 5.36665 3.66658C6.19505 3.66658 6.86665 4.33816 6.86665 5.16658C6.86665 5.99499 6.19505 6.66658 5.36665 6.66658ZM5.66665 12.1653V9.93325C5.66665 9.60765 5.76278 9.30838 5.93605 9.04152C5.73911 9.01412 5.53785 8.99992 5.33331 8.99992C4.28799 8.99992 3.32911 9.37005 2.58059 9.98638C3.29937 11.048 4.3906 11.8368 5.66665 12.1653ZM1.96855 8.77325C2.90953 8.07778 4.0734 7.66658 5.33331 7.66658C6.02898 7.66658 6.69538 7.79192 7.31111 8.02132C7.89645 7.79245 8.59491 7.66658 9.33331 7.66658C10.4398 7.66658 11.4566 7.94918 12.1373 8.43745C12.265 7.98012 12.3333 7.49798 12.3333 6.99992C12.3333 4.0544 9.94551 1.66659 6.99998 1.66659C4.05446 1.66659 1.66665 4.0544 1.66665 6.99992C1.66665 7.62158 1.77302 8.21845 1.96855 8.77325ZM11.5862 9.72385C11.3241 9.36832 10.4472 8.99992 9.33331 8.99992C7.99591 8.99992 6.99998 9.53105 6.99998 9.93325V12.3333C8.95031 12.3333 10.6562 11.2863 11.5862 9.72385ZM6.99998 13.6666C3.31808 13.6666 0.333313 10.6818 0.333313 6.99992C0.333313 3.31802 3.31808 0.333252 6.99998 0.333252C10.6818 0.333252 13.6666 3.31802 13.6666 6.99992C13.6666 10.6818 10.6818 13.6666 6.99998 13.6666ZM9.33331 7.33325C8.59691 7.33325 7.99998 6.73632 7.99998 5.99992C7.99998 5.26354 8.59691 4.66658 9.33331 4.66658C10.0697 4.66658 10.6666 5.26354 10.6666 5.99992C10.6666 6.73632 10.0697 7.33325 9.33331 7.33325Z"
                                    fill={
                                        pathname.startsWith(
                                            "/wherethemagicrestricted/users"
                                        )
                                            ? "black"
                                            : "#5F80A0"
                                    }
                                />
                            </svg>
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={"/wherethemagicrestricted/creators-request"}
                            className={cn(
                                "flex items-center gap-3 p-4 px-6 rounded-full hover:opacity-80",
                                pathname.startsWith(
                                    "/wherethemagicrestricted/creators-request"
                                ) &&
                                    "bg-[#FFBE00] text-black shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] shadow-[#000000]/20",
                                !pathname.startsWith(
                                    "/wherethemagicrestricted/creators-request"
                                ) && "text-[#5F80A0]"
                            )}
                        >
                            <LucideCreativeCommons size={16} />
                            Creators Requests
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={"/wherethemagicrestricted/quests"}
                            className={cn(
                                "flex items-center gap-3 p-4 px-6 rounded-full hover:opacity-80",
                                pathname.startsWith(
                                    "/wherethemagicrestricted/quests"
                                ) &&
                                    "bg-[#FFBE00] text-black shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] shadow-[#000000]/20",
                                !pathname.startsWith(
                                    "/wherethemagicrestricted/quests"
                                ) && "text-[#5F80A0]"
                            )}
                        >
                            <svg
                                width="14"
                                height="16"
                                viewBox="0 0 14 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.00002 0.666748L13.3334 4.33341V11.6667L7.00002 15.3334L0.666687 11.6667V4.33341L7.00002 0.666748ZM7.00002 2.20741L2.00002 5.10215V10.898L7.00002 13.7927L12 10.898V5.10215L7.00002 2.20741ZM7.00002 10.6667C5.52726 10.6667 4.33335 9.47281 4.33335 8.00008C4.33335 6.52732 5.52726 5.33342 7.00002 5.33342C8.47275 5.33342 9.66669 6.52732 9.66669 8.00008C9.66669 9.47281 8.47275 10.6667 7.00002 10.6667ZM7.00002 9.33342C7.73642 9.33342 8.33335 8.73648 8.33335 8.00008C8.33335 7.26368 7.73642 6.66675 7.00002 6.66675C6.26362 6.66675 5.66669 7.26368 5.66669 8.00008C5.66669 8.73648 6.26362 9.33342 7.00002 9.33342Z"
                                    fill={
                                        pathname.startsWith(
                                            "/wherethemagicrestricted/quests"
                                        )
                                            ? "black"
                                            : "#5F80A0"
                                    }
                                />
                            </svg>
                            Manage Quests
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={"/wherethemagicrestricted/entries"}
                            className={cn(
                                "flex items-center gap-3 p-4 px-6 rounded-full hover:opacity-80",
                                pathname.startsWith(
                                    "/wherethemagicrestricted/entries"
                                ) &&
                                    "bg-[#FFBE00] text-black shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] shadow-[#000000]/20",
                                !pathname.startsWith(
                                    "/wherethemagicrestricted/entries"
                                ) && "text-[#5F80A0]"
                            )}
                        >
                            <svg
                                width="16"
                                height="12"
                                viewBox="0 0 16 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.00327 0.668457C12.0533 0.668457 15.3366 2.45932 15.3366 4.66845V7.33512C15.3366 9.54425 12.0533 11.3351 8.00327 11.3351C4.0255 11.3351 0.787429 9.60765 0.673049 7.45305L0.669922 7.33512V4.66845C0.669922 2.45932 3.95317 0.668457 8.00327 0.668457ZM8.00327 8.66845C5.52296 8.66845 3.33025 7.99678 2.00311 6.96878L2.00326 7.33512C2.00326 8.58992 4.59168 10.0018 8.00327 10.0018C11.3437 10.0018 13.8951 8.64812 13.9999 7.41372L14.0033 7.33512L14.0041 6.96825C12.677 7.99658 10.484 8.66845 8.00327 8.66845ZM8.00327 2.00179C4.59168 2.00179 2.00326 3.41366 2.00326 4.66845C2.00326 5.92325 4.59168 7.33512 8.00327 7.33512C11.4149 7.33512 14.0033 5.92325 14.0033 4.66845C14.0033 3.41366 11.4149 2.00179 8.00327 2.00179Z"
                                    fill={
                                        pathname.startsWith(
                                            "/wherethemagicrestricted/entries"
                                        )
                                            ? "black"
                                            : "#5F80A0"
                                    }
                                />
                            </svg>
                            Entries
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={"/wherethemagicrestricted/create-quest"}
                            className={cn(
                                "flex items-center gap-3 p-4 px-6 rounded-full hover:opacity-80",
                                pathname.startsWith(
                                    "/wherethemagicrestricted/create-quest"
                                ) &&
                                    "bg-[#FFBE00] text-black shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] shadow-[#000000]/20",
                                !pathname.startsWith(
                                    "/wherethemagicrestricted/create-quest"
                                ) && "text-[#5F80A0]"
                            )}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.3334 2.66675C13.5425 2.66675 15.3334 4.45761 15.3334 6.66675V9.33342C15.3334 11.5425 13.5425 13.3334 11.3334 13.3334H4.66669C2.45755 13.3334 0.666687 11.5425 0.666687 9.33342V6.66675C0.666687 4.45761 2.45755 2.66675 4.66669 2.66675H11.3334ZM11.3334 4.00008H4.66669C3.23855 4.00008 2.07263 5.12273 2.00329 6.53365L2.00002 6.66675V9.33342C2.00002 10.7615 3.12267 11.9275 4.53359 11.9968L4.66669 12.0001H11.3334C12.7615 12.0001 13.9274 10.8774 13.9968 9.46648L14 9.33342V6.66675C14 5.23861 12.8774 4.07269 11.4664 4.00335L11.3334 4.00008ZM6.66669 6.00008V7.33342H8.00002V8.66675H6.66602L6.66669 10.0001H5.33335L5.33269 8.66675H4.00002V7.33342H5.33335V6.00008H6.66669ZM12 8.66675V10.0001H10.6667V8.66675H12ZM10.6667 6.00008V7.33342H9.33335V6.00008H10.6667Z"
                                    fill={
                                        pathname.startsWith(
                                            "/wherethemagicrestricted/create-quest"
                                        )
                                            ? "black"
                                            : "#5F80A0"
                                    }
                                />
                            </svg>
                            Create Quest
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={"/wherethemagicrestricted/list-special-quest"}
                            className={cn(
                                "flex items-center gap-3 p-4 px-6 rounded-full hover:opacity-80",
                                pathname.startsWith(
                                    "/wherethemagicrestricted/list-special-quest"
                                ) &&
                                    "bg-[#FFBE00] text-black shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] shadow-[#000000]/20",
                                !pathname.startsWith(
                                    "/wherethemagicrestricted/list-special-quest"
                                ) && "text-[#5F80A0]"
                            )}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.3334 2.66675C13.5425 2.66675 15.3334 4.45761 15.3334 6.66675V9.33342C15.3334 11.5425 13.5425 13.3334 11.3334 13.3334H4.66669C2.45755 13.3334 0.666687 11.5425 0.666687 9.33342V6.66675C0.666687 4.45761 2.45755 2.66675 4.66669 2.66675H11.3334ZM11.3334 4.00008H4.66669C3.23855 4.00008 2.07263 5.12273 2.00329 6.53365L2.00002 6.66675V9.33342C2.00002 10.7615 3.12267 11.9275 4.53359 11.9968L4.66669 12.0001H11.3334C12.7615 12.0001 13.9274 10.8774 13.9968 9.46648L14 9.33342V6.66675C14 5.23861 12.8774 4.07269 11.4664 4.00335L11.3334 4.00008ZM6.66669 6.00008V7.33342H8.00002V8.66675H6.66602L6.66669 10.0001H5.33335L5.33269 8.66675H4.00002V7.33342H5.33335V6.00008H6.66669ZM12 8.66675V10.0001H10.6667V8.66675H12ZM10.6667 6.00008V7.33342H9.33335V6.00008H10.6667Z"
                                    fill={
                                        pathname.startsWith(
                                            "/wherethemagicrestricted/list-special-quest"
                                        )
                                            ? "black"
                                            : "#5F80A0"
                                    }
                                />
                            </svg>
                            List Special Quest
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={
                                "/wherethemagicrestricted/create-special-quest"
                            }
                            className={cn(
                                "flex items-center gap-3 p-4 px-6 rounded-full hover:opacity-80",
                                pathname.startsWith(
                                    "/wherethemagicrestricted/create-special-quest"
                                ) &&
                                    "bg-[#FFBE00] text-black shadow-[inset_0px_-3px_3px_0px_rgba(0,0,0,0.4)] shadow-[#000000]/20",
                                !pathname.startsWith(
                                    "/wherethemagicrestricted/create-special-quest"
                                ) && "text-[#5F80A0]"
                            )}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.3334 2.66675C13.5425 2.66675 15.3334 4.45761 15.3334 6.66675V9.33342C15.3334 11.5425 13.5425 13.3334 11.3334 13.3334H4.66669C2.45755 13.3334 0.666687 11.5425 0.666687 9.33342V6.66675C0.666687 4.45761 2.45755 2.66675 4.66669 2.66675H11.3334ZM11.3334 4.00008H4.66669C3.23855 4.00008 2.07263 5.12273 2.00329 6.53365L2.00002 6.66675V9.33342C2.00002 10.7615 3.12267 11.9275 4.53359 11.9968L4.66669 12.0001H11.3334C12.7615 12.0001 13.9274 10.8774 13.9968 9.46648L14 9.33342V6.66675C14 5.23861 12.8774 4.07269 11.4664 4.00335L11.3334 4.00008ZM6.66669 6.00008V7.33342H8.00002V8.66675H6.66602L6.66669 10.0001H5.33335L5.33269 8.66675H4.00002V7.33342H5.33335V6.00008H6.66669ZM12 8.66675V10.0001H10.6667V8.66675H12ZM10.6667 6.00008V7.33342H9.33335V6.00008H10.6667Z"
                                    fill={
                                        pathname.startsWith(
                                            "/wherethemagicrestricted/create-special-quest"
                                        )
                                            ? "black"
                                            : "#5F80A0"
                                    }
                                />
                            </svg>
                            Create Special Quest
                        </Link>
                    </li>
                </ul>
            </SidebarContent>
            <SidebarFooter className="p-4 pb-6">
                <Button
                    variant={"ghost"}
                    className="cursor-pointer p-5! px-6! text-[red] rounded-full hover:opacity-80"
                    onClick={logout}
                >
                    <LogOutIcon /> Logout
                </Button>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
