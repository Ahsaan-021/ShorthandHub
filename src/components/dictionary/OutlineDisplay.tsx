"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface OutlineDisplayProps {
  outline: string;
  className?: string;
}

interface StrokeSeg {
  type: "line" | "curve" | "dot" | "circle" | "hook";
  dir: "down" | "up" | "left" | "right";
  heavy: boolean;
}

function parsePitmanOutline(outline: string): StrokeSeg[] {
  const segs: StrokeSeg[] = [];
  const u = outline.toUpperCase();

  const strokeMap: Record<string, StrokeSeg> = {
    P: { type: "line", dir: "down", heavy: false },
    B: { type: "line", dir: "down", heavy: true },
    T: { type: "line", dir: "down", heavy: false },
    D: { type: "line", dir: "down", heavy: true },
    C: { type: "line", dir: "down", heavy: false },
    J: { type: "line", dir: "down", heavy: true },
    K: { type: "line", dir: "down", heavy: false },
    G: { type: "line", dir: "down", heavy: true },
    F: { type: "line", dir: "up", heavy: false },
    V: { type: "line", dir: "up", heavy: true },
    L: { type: "curve", dir: "down", heavy: false },
    R: { type: "curve", dir: "up", heavy: true },
    M: { type: "curve", dir: "down", heavy: true },
    N: { type: "curve", dir: "down", heavy: false },
    W: { type: "hook", dir: "up", heavy: false },
    Y: { type: "hook", dir: "down", heavy: false },
    H: { type: "dot", dir: "down", heavy: false },
  };

  let i = 0;
  while (i < u.length) {
    const ch = u[i];
    const next = u[i + 1];

    if (ch === ".") {
      segs.push({ type: "dot", dir: "down", heavy: false });
      i++;
      continue;
    }

    if (ch === "o" || ch === "O") {
      segs.push({ type: "circle", dir: "down", heavy: false });
      i++;
      continue;
    }

    if ((ch === "T" && next === "H") || (ch === "D" && next === "H")) {
      const heavy = ch === "D";
      segs.push({ type: "line", dir: "up", heavy });
      i += 2;
      continue;
    }

    if ((ch === "S" && next === "H") || (ch === "Z" && next === "H")) {
      const heavy = ch === "Z";
      segs.push({ type: "line", dir: "up", heavy });
      i += 2;
      continue;
    }

    if (ch === "S") {
      segs.push({ type: "circle", dir: "down", heavy: false });
      i++;
      continue;
    }

    if (ch === "Z") {
      segs.push({ type: "curve", dir: "up", heavy: true });
      i++;
      continue;
    }

    const stroke = strokeMap[ch];
    if (stroke) {
      segs.push(stroke);
      i++;
      continue;
    }

    i++;
  }

  return segs;
}

function StrokeSVG({ seg, x }: { seg: StrokeSeg; x: number }) {
  const sw = seg.heavy ? 4 : 1.5;

  if (seg.type === "dot") {
    return <circle cx={x} cy="55" r="4" className="fill-foreground" />;
  }

  if (seg.type === "circle") {
    return <circle cx={x + 8} cy="55" r="9" className="fill-none stroke-foreground" strokeWidth="1.5" />;
  }

  if (seg.type === "hook") {
    const d = seg.dir === "up"
      ? `M ${x} 55 Q ${x + 15} 40 ${x + 20} 55`
      : `M ${x} 55 Q ${x + 15} 70 ${x + 20} 55`;
    return <path d={d} className="fill-none stroke-foreground" strokeWidth={sw} strokeLinecap="round" />;
  }

  if (seg.type === "line") {
    const y1 = seg.dir === "down" ? 35 : 75;
    const y2 = seg.dir === "down" ? 75 : 35;
    return <path d={`M ${x} ${y1} L ${x} ${y2}`} className="fill-none stroke-foreground" strokeWidth={sw} strokeLinecap="round" />;
  }

  if (seg.type === "curve") {
    const ya = seg.dir === "down" ? 35 : 70;
    const yb = seg.dir === "down" ? 70 : 35;
    return <path d={`M ${x - 10} ${ya} Q ${x + 15} ${(ya + yb) / 2} ${x + 20} ${yb}`} className="fill-none stroke-foreground" strokeWidth={sw} strokeLinecap="round" />;
  }

  return null;
}

export function OutlineDisplay({ outline, className }: OutlineDisplayProps) {
  const strokes = useMemo(() => parsePitmanOutline(outline), [outline]);

  return (
    <div className={cn("relative p-4 rounded-lg border bg-card/40", className)}>
      <svg viewBox="0 0 400 100" className="w-full h-24" xmlns="http://www.w3.org/2000/svg">
        {strokes.length > 0 ? (
          strokes.map((s, i) => (
            <g key={i} transform={`translate(${15 + i * 50}, 5)`}>
              <StrokeSVG seg={s} x={0} />
            </g>
          ))
        ) : (
          <>
            <text x="200" y="55" textAnchor="middle" className="fill-muted-foreground text-[11px] font-mono">
              {outline}
            </text>
            <text x="200" y="75" textAnchor="middle" className="fill-muted-foreground/60 text-[9px]">
              stroke outline
            </text>
          </>
        )}
      </svg>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-mono tracking-wider">
        {outline}
      </div>
    </div>
  );
}