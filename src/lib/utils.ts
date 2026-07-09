import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatReadingTime(minutes: number): string {
  return `${Math.ceil(minutes)} min read`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function generateInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function calculateXP(totalLessons: number, accuracy: number): number {
  return Math.round(totalLessons * 100 * (accuracy / 100));
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    beginner: "text-green-500",
    intermediate: "text-yellow-500",
    advanced: "text-red-500",
  };
  return colors[difficulty] ?? "text-gray-500";
}

export function getDifficultyBadgeColor(difficulty: string): string {
  const colors: Record<string, string> = {
    beginner: "bg-green-500/10 text-green-500 border-green-500/20",
    intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    advanced: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return colors[difficulty] ?? "bg-gray-500/10 text-gray-500";
}