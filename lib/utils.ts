import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function authWithTwitter() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const authUrl = `${apiUrl}/auth/x/`;
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const authWindow = window.open(
        authUrl,
        "AuthWithX",
        `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars=yes,status=1`
    );

    if (authWindow) {
        const timer = setInterval(() => {
            if (authWindow.closed) {
                clearInterval(timer);
                console.log("Authentication window closed");
            }
        }, 500);
    } else {
        console.error("Failed to open authentication window");
    }
}

export const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
export const authUrl = `${apiUrl}/auth/x/`;
