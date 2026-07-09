"use client";

import { cn } from "@/lib/utils";

interface OutlineDisplayProps {
  outline: string;
  className?: string;
}

export function OutlineDisplay({ outline, className }: OutlineDisplayProps) {
  const strokes = outline.split("").map((char, i) => ({
    char,
    x: 20 + i * 40,
    y: 50,
  }));

  const pathCommands = strokes.map((s, i) => {
    const next = strokes[i + 1];
    if (!next) return "";
    const midX = (s.x + next.x) / 2;
    const midY = s.y - 20 + Math.random() * 40;
    return `M ${s.x} ${s.y} Q ${midX} ${midY} ${next.x} ${next.y}`;
  });

  return (
    <div className={cn("relative p-4 rounded-lg border bg-muted/30", className)}>
      <svg
        viewBox="0 0 200 100"
        className="w-full h-24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`.outline-stroke { fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }`}
          </style>
        </defs>
        {pathCommands.map((cmd, i) => (
          <path key={i} d={cmd} className="outline-stroke text-primary" />
        ))}
        {strokes.map((s) => (
          <circle
            key={s.char}
            cx={s.x}
            cy={s.y}
            r="3"
            className="fill-primary/40"
          />
        ))}
      </svg>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
        {outline}
      </div>
    </div>
  );
}
