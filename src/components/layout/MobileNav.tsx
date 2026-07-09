"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Home,
  BookMarked,
  GraduationCap,
  PenTool,
  BookText,
  Trophy,
  Sun,
  Moon,
  Mail,
  DollarSign,
  Globe,
} from "lucide-react";
import { NAV_LINKS, APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const iconMap: Record<string, typeof Home> = {
  Home,
  "Pitman Course": BookOpen,
  "Gregg (Coming Soon)": BookMarked,
  "Teeline (Coming Soon)": BookMarked,
  Dictionary: BookText,
  Practice: GraduationCap,
  Blog: Globe,
  Pricing: DollarSign,
  Contact: Mail,
};

interface MobileNavProps {
  onNavClick: () => void;
}

export function MobileNav({ onNavClick }: MobileNavProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border p-4">
        <BookOpen className="size-5 text-primary" />
        <span className="font-bold text-base gradient-text">{APP_NAME}</span>
      </div>

      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-4">
          {NAV_LINKS.map((link, i) => {
            const Icon = iconMap[link.label] ?? BookOpen;
            const isDisabled = link.label.includes("Coming Soon");
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
              >
                <Link
                  href={link.href}
              onClick={(e) => {
                if (isDisabled) e.preventDefault();
                else onNavClick();
              }}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                    isDisabled && "cursor-not-allowed opacity-50 hover:bg-transparent hover:text-muted-foreground"
                  )}
                >
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  {link.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="mt-auto border-t border-border p-4">
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start gap-3"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="text-sm">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </Button>
      </div>
    </div>
  );
}