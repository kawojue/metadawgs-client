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
    const checkClosed = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(checkClosed);
        console.log("Authentication window closed");

        setTimeout(() => {
          const currentToken = localStorage.getItem("userToken");
          if (currentToken) {
            window.location.reload();
          }
        }, 1000);
      }
    }, 500);

    setTimeout(() => {
      if (!authWindow.closed) {
        console.log("Auth window timeout - closing");
        authWindow.close();
      }
      clearInterval(checkClosed);
    }, 300000);
  } else {
    console.error("Failed to open authentication window");
    alert("Please allow popups for this site to enable authentication");
  }
}
