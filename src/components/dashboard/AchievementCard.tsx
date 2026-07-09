"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Award, Lock, Star } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface AchievementCardProps {
  icon?: string;
  title: string;
  description: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string | null;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Award,
  Star,
  Lock,
};

export function AchievementCard({
  icon = "Award",
  title,
  description,
  xpReward,
  unlocked,
  unlockedAt,
  className,
}: AchievementCardProps) {
  const IconComponent = iconMap[icon] ?? Award;

  return (
    <motion.div
      whileHover={unlocked ? { scale: 1.02 } : undefined}
      className={cn(
        "relative rounded-xl border p-5 transition-all duration-200",
        unlocked
          ? "bg-card hover:shadow-md"
          : "bg-muted/30 opacity-60",
        className
      )}
    >
      {!unlocked && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-[1px] flex items-center justify-center z-10">
          <Lock className="w-8 h-8 text-muted-foreground/40" />
        </div>
      )}

      <div className="flex items-start gap-4">
        <div
          className={cn(
            "p-2.5 rounded-lg",
            unlocked ? "bg-primary/10" : "bg-muted"
          )}
        >
          <IconComponent
            className={cn(
              "w-6 h-6",
              unlocked ? "text-primary" : "text-muted-foreground"
            )}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-semibold",
              unlocked ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 text-xs font-medium text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3" />
              {xpReward} XP
            </div>
            {unlockedAt && (
              <span className="text-xs text-muted-foreground">
                Unlocked {new Date(unlockedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
