import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Join class names and resolve Tailwind conflicts (later classes win). */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
