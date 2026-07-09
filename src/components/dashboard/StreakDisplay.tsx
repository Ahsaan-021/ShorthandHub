"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakDisplayProps {
  currentStreak: number;
  bestStreak: number;
  weekData?: boolean[];
  className?: string;
}

export function StreakDisplay({
  currentStreak,
  bestStreak,
  weekData = [],
  className,
}: StreakDisplayProps) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className={cn("rounded-xl border bg-card p-6", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-orange-500/10">
          <Flame className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <div className="text-2xl font-bold tabular-nums">{currentStreak}</div>
          <div className="text-sm text-muted-foreground">day streak</div>
        </div>
      </div>

      <div className="flex gap-2 justify-center mb-4">
        {days.map((day, i) => {
          const active = weekData[i] ?? false;
          const isToday = i === new Date().getDay() - 1;
          return (
            <div key={day} className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors",
                  active
                    ? "bg-orange-500 text-white"
                    : isToday
                    ? "border-2 border-dashed border-orange-300 text-muted-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {day[0]}
              </div>
              <span className="text-[10px] text-muted-foreground">{day}</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-3 border-t">
        <span className="text-sm text-muted-foreground">Best streak</span>
        <div className="flex items-center gap-1">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="font-bold tabular-nums">{bestStreak}</span>
        </div>
      </div>
    </div>
  );
}
