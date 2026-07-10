"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface OutlineDisplayProps {
  outline: string;
  className?: string;
}

export function OutlineDisplay({ outline, className }: OutlineDisplayProps) {
  const segments = useMemo(() => {
    return outline.split("").map((ch, i) => {
      const x = 20 + i * 40;
      const isHeavy = /[bdgmvzBDGMVZ]/.test(ch);
      const isDot = ch === "." || ch === "'";
      const isCircle = ch === "o" || ch === "O" || ch === "0";

      if (isDot) {
        return { type: "dot" as const, x, y: 55, r: 4 };
      }
      if (isCircle) {
        return { type: "circle" as const, x: x + 8, y: 55, r: 8 };
      }

      const y1 = i % 2 === 0 ? 35 : 75;
      const y2 = i % 2 === 0 ? 75 : 35;
      return {
        type: "path" as const,
        d: `M ${x} ${y1} Q ${x + 15} ${(y1 + y2) / 2} ${x + 25} ${y2}`,
        weight: isHeavy ? 4 : 1.5,
      };
    });
  }, [outline]);

  return (
    <div className={cn("relative p-4 rounded-lg border bg-card/40", className)}>
      <svg viewBox="0 0 400 100" className="w-full h-24" xmlns="http://www.w3.org/2000/svg">
        {segments.map((s, i) => {
          if (s.type === "dot") {
            return <circle key={i} cx={s.x} cy={s.y} r={s.r} className="fill-foreground" />;
          }
          if (s.type === "circle") {
            return <circle key={i} cx={s.x} cy={s.y} r={s.r} className="fill-none stroke-foreground" strokeWidth="1.5" />;
          }
          return (
            <path
              key={i}
              d={s.d}
              className="fill-none stroke-foreground"
              strokeWidth={s.weight}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-mono tracking-wider">
        {outline}
      </div>
    </div>
  );
}