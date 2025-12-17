import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatCurrency(amount: number | string, decimals = 2): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatNumber(num: number | string): string {
  const n = typeof num === "string" ? parseFloat(num) : num;
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

export function formatDateTime(date: Date | string | number): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "approved":
      return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
    case "rejected":
      return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30";
    case "pending":
    case "submitted":
      return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30";
    case "under_review":
      return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30";
    case "disputed":
      return "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30";
    case "expired":
      return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30";
    default:
      return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30";
  }
}
