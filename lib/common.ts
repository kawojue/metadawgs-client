/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last time it was invoked.
 *
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version of the function with a cancel method
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}

// Throttle function to ensure a function is executed at most once in a specified time
export function throttle<T extends (...args: T[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastFunc: ReturnType<typeof setTimeout> | null = null;
  let lastRan: number | null = null;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (!lastRan || now - lastRan >= limit) {
      func(...args);
      lastRan = now;
    } else {
      if (lastFunc) clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        func(...args);
        lastRan = Date.now();
      }, limit - (now - lastRan));
    }
  };
}

// Function to copy text to clipboard
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}

// Function to format a date to a readable string
export function formatDate(date: Date, locale: string = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Function to generate a random string of specified length
export function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to hash an address by showing the first and last n (6) characters
export function hashAddress(address: string, at: number = 6): string {
  const start = address.slice(0, at);
  const end = address.slice(-at);
  return `${start}...${end}`;
}

// Function to get the ordinal suffix of a number
export function getNumberSuffix(num: number): string {
  const remainder = num % 100;
  if (remainder >= 11 && remainder <= 13) {
    return "th";
  }
  switch (num % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

// Function to format a number with commas as thousand separators
export function formatNumberWithCommas(
  num: number,
  shorten: boolean = false
): string {
  if (!num || num === 0) return "0";

  if (shorten) {
    if (num >= 1_000_000_000)
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  const [intPart, decimalPart] = num.toString().split(".");
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimalPart ? `${formattedInt}.${decimalPart}` : formattedInt;
}

export function getTimeRemaining(joinedAt: string): {
  hours: number;
  minutes: number;
  seconds: number;
  hasPassed: boolean;
} {
  const joinedDate = new Date(joinedAt);
  const now = new Date();
  const diff = Math.max(
    0,
    24 * 60 * 60 * 1000 - (now.getTime() - joinedDate.getTime())
  );

  const hasPassed = diff <= 0;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, hasPassed };
}

export const formatTime = (seconds: number) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else {
    return `${minutes}m ${secs}s`;
  }
};
