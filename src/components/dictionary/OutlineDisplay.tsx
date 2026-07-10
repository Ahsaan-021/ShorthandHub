"use client";

import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface OutlineDisplayProps {
  outline: string;
  className?: string;
}

interface Stroke {
  type: "line" | "curve" | "dot" | "circle";
  weight: "light" | "heavy";
}

function textToStrokes(text: string): Stroke[] {
  const strokes: Stroke[] = [];
  for (const ch of text.toLowerCase()) {
    if (ch === "." || ch === "'") {
      strokes.push({ type: "dot", weight: "light" });
    } else if (ch === "o" || ch === "0") {
      strokes.push({ type: "circle", weight: "light" });
    } else if (/[bdgmvz]/.test(ch)) {
      strokes.push({ type: "curve", weight: "heavy" });
    } else {
      strokes.push({ type: "light", weight: "light" });
    }
  }
  return strokes;
}

function strokePath(stroke: Stroke, x: number, i: number): string {
  if (stroke.type === "dot") {
    return `M ${x} 55 L ${x} 55`;
  }
  if (stroke.type === "circle") {
    return `M ${x} 55 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0`;
  }
  const isEven = i % 2 === 0;
  const amp = isEven ? -25 : 25;
  const curve = stroke.type === "curve" ? `Q ${x + 15} ${55 + amp * 0.5}` : `Q ${x + 10} ${55 + amp * 0.3}`;
  const end = isEven ? `${x + 25} ${55 + amp}` : `${x + 25} ${55 - amp}`;
  return `M ${x} 55 ${curve} ${end}`;
}

export function OutlineDisplay({ outline, className }: OutlineDisplayProps) {
  const strokes = useMemo(() => textToStrokes(outline), [outline]);

  return (
    <div className={cn("relative p-4 rounded-lg border bg-card/40", className)}>
      <svg viewBox="0 0 400 100" className="w-full h-24" xmlns="http://www.w3.org/2000/svg">
        {strokes.map((s, i) => {
          const x = 20 + i * 40;
          if (s.type === "dot") {
            return <circle key={i} cx={x} cy="55" r="4" className="fill-foreground" />;
          }
          if (s.type === "circle") {
            return <circle key={i} cx={x + 8} cy="55" r="8" className="fill-none stroke-foreground" strokeWidth="1.5" />;
          }
          return (
            <path
              key={i}
              d={strokePath(s, x, i)}
              className="fill-none stroke-foreground"
              strokeWidth={s.weight === "heavy" ? 4 : 1.5}
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