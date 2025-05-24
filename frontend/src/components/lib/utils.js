
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind classes without style conflicts
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

// TypeScript-only helper removed for JS compatibility