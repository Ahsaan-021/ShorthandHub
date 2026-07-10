"use client";

import { useMemo, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

interface OutlineDisplayProps {
  outline: string;
  className?: string;
  compact?: boolean;
}

interface StrokeSeg {
  type: "vertical" | "horizontal" | "slant-down" | "slant-up" | "curve-down" | "curve-up" | "dot" | "circle";
  heavy: boolean;
  label: string;
  angle: number;
}

interface Point {
  x: number;
  y: number;
}

const STROKE_NAMES = ["NG", "NK", "CH", "SH", "TH", "DH", "ZH"];

const STROKE_MAP: Record<string, StrokeSeg> = {
  P: { type: "vertical", heavy: false, label: "P", angle: 90 },
  B: { type: "vertical", heavy: true, label: "B", angle: 90 },
  T: { type: "slant-down", heavy: false, label: "T", angle: 70 },
  D: { type: "slant-down", heavy: true, label: "D", angle: 70 },
  SH: { type: "slant-down", heavy: false, label: "SH", angle: 60 },
  ZH: { type: "slant-down", heavy: true, label: "ZH", angle: 60 },
  CH: { type: "slant-down", heavy: false, label: "CH", angle: 65 },
  J: { type: "slant-down", heavy: true, label: "J", angle: 65 },
  K: { type: "horizontal", heavy: false, label: "K", angle: 0 },
  G: { type: "horizontal", heavy: true, label: "G", angle: 0 },
  C: { type: "slant-down", heavy: false, label: "C", angle: 60 },
  F: { type: "slant-up", heavy: false, label: "F", angle: 30 },
  V: { type: "slant-up", heavy: true, label: "V", angle: 30 },
  TH: { type: "slant-up", heavy: false, label: "TH", angle: 45 },
  DH: { type: "slant-up", heavy: true, label: "DH", angle: 45 },
  R: { type: "slant-up", heavy: true, label: "R", angle: 35 },
  S: { type: "curve-up", heavy: false, label: "S", angle: 0 },
  Z: { type: "curve-up", heavy: true, label: "Z", angle: 0 },
  N: { type: "curve-down", heavy: false, label: "N", angle: 0 },
  M: { type: "curve-down", heavy: true, label: "M", angle: 0 },
  L: { type: "curve-down", heavy: false, label: "L", angle: 0 },
  NG: { type: "curve-down", heavy: false, label: "NG", angle: 0 },
  NK: { type: "curve-down", heavy: true, label: "NK", angle: 0 },
  W: { type: "curve-up", heavy: false, label: "W", angle: 0 },
  Y: { type: "curve-down", heavy: false, label: "Y", angle: 0 },
  H: { type: "dot", heavy: false, label: "H", angle: 0 },
};

function parsePitmanOutline(outline: string): StrokeSeg[] {
  const segs: StrokeSeg[] = [];
  const u = outline.toUpperCase();
  let i = 0;
  while (i < u.length) {
    const ch = u[i];
    if (ch === " " || ch === "/" || ch === ",") { i++; continue; }
    if (ch === "-") { i++; continue; }
    if (ch === ".") { segs.push({ type: "dot", heavy: false, label: ".", angle: 0 }); i++; continue; }
    if (ch === ":") { segs.push({ type: "dot", heavy: true, label: ":", angle: 0 }); i++; continue; }
    if (ch === "o" || ch === "O") { segs.push({ type: "circle", heavy: false, label: "○", angle: 0 }); i++; continue; }
    let matched = false;
    for (const name of STROKE_NAMES) {
      if (u.startsWith(name, i)) {
        const stroke = STROKE_MAP[name];
        if (stroke) { segs.push(stroke); i += name.length; matched = true; break; }
      }
    }
    if (matched) continue;
    const stroke = STROKE_MAP[ch];
    if (stroke) { segs.push(stroke); i++; continue; }
    i++;
  }
  return segs;
}

const STROKE_LEN = 32;

function strokePath(seg: StrokeSeg): string {
  const len = STROKE_LEN;
  switch (seg.type) {
    case "vertical":
      return `M 0,-${len/2} L 0,${len/2}`;
    case "horizontal":
      return `M -${len/2},0 L ${len/2},0`;
    case "slant-down": {
      const rad = (seg.angle * Math.PI) / 180;
      const dx = -Math.cos(rad) * len/2;
      const dy = Math.sin(rad) * len/2;
      return `M ${-dx},${-dy} L ${dx},${dy}`;
    }
    case "slant-up": {
      const rad = (seg.angle * Math.PI) / 180;
      const dx = Math.cos(rad) * len/2;
      const dy = -Math.sin(rad) * len/2;
      return `M ${-dx},${dy} L ${dx},${-dy}`;
    }
    case "curve-down":
      return `M -20,0 Q -14,18 20,0`;
    case "curve-up":
      return `M -20,0 Q -14,-18 20,0`;
    case "dot":
    case "circle":
      return "";
    default:
      return `M 0,-${len/2} L 0,${len/2}`;
  }
}

function strokeExit(seg: StrokeSeg): Point {
  const len = STROKE_LEN;
  switch (seg.type) {
    case "vertical": return { x: 0, y: len/2 };
    case "horizontal": return { x: len/2, y: 0 };
    case "slant-down": {
      const rad = (seg.angle * Math.PI) / 180;
      return { x: Math.cos(rad) * len/2, y: Math.sin(rad) * len/2 };
    }
    case "slant-up": {
      const rad = (seg.angle * Math.PI) / 180;
      return { x: Math.cos(rad) * len/2, y: -Math.sin(rad) * len/2 };
    }
    case "curve-down":
    case "curve-up":
      return { x: 20, y: 0 };
    case "dot":
    case "circle":
      return { x: 12, y: 0 };
    default: return { x: 0, y: len/2 };
  }
}

function strokeEntry(seg: StrokeSeg): Point {
  const len = STROKE_LEN;
  switch (seg.type) {
    case "vertical": return { x: 0, y: -len/2 };
    case "horizontal": return { x: -len/2, y: 0 };
    case "slant-down": {
      const rad = (seg.angle * Math.PI) / 180;
      return { x: -Math.cos(rad) * len/2, y: -Math.sin(rad) * len/2 };
    }
    case "slant-up": {
      const rad = (seg.angle * Math.PI) / 180;
      return { x: -Math.cos(rad) * len/2, y: Math.sin(rad) * len/2 };
    }
    case "curve-down":
    case "curve-up":
      return { x: -20, y: 0 };
    case "dot":
    case "circle":
      return { x: 0, y: 0 };
    default: return { x: 0, y: -len/2 };
  }
}

function StrokesRenderer({ strokes }: { strokes: StrokeSeg[] }) {
  const elements: React.ReactNode[] = [];

  // Ruled staves
  elements.push(
    <g key="lines">
      <line x1="0" y1="42" x2="10000" y2="42" className="stroke-muted/20" strokeWidth="0.4" strokeDasharray="3,4" />
      <line x1="0" y1="58" x2="10000" y2="58" className="stroke-muted/20" strokeWidth="0.4" strokeDasharray="3,4" />
      <line x1="0" y1="50" x2="10000" y2="50" className="stroke-muted/10" strokeWidth="0.2" />
    </g>
  );

  let prevExit: Point | null = null;
  let currentX = 10;

  strokes.forEach((seg, i) => {
    if (prevExit && currentX < prevExit.x + 3) currentX = prevExit.x + 3;

    const x = currentX;
    const sw = seg.heavy ? 3.8 : 1.5;
    const cls = seg.heavy ? "stroke-foreground" : "stroke-foreground/65";
    const path = strokePath(seg);

    // Connector from previous stroke exit to this stroke center
    if (prevExit && seg.type !== "dot" && seg.type !== "circle") {
      const entry = strokeEntry(seg);
      const absEntry = { x: x + entry.x, y: 50 + entry.y };
      const dx = absEntry.x - prevExit.x;
      const dy = absEntry.y - prevExit.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 1) {
        const cp1x = prevExit.x + dx * 0.5;
        const cp1y = prevExit.y + dy * 0.5 - 2;
        elements.push(
          <path
            key={`c-${i}`}
            d={`M ${prevExit.x} ${prevExit.y} Q ${cp1x} ${cp1y} ${absEntry.x} ${absEntry.y}`}
            className="fill-none stroke-foreground/35"
            strokeWidth={Math.min(sw, 2.5)}
            strokeLinecap="round"
          />
        );
      }
    }

    if (seg.type === "dot") {
      const r = seg.heavy ? 3.5 : 2;
      elements.push(
        <circle key={`s-${i}`} cx={x} cy={50} r={r} className={seg.heavy ? "fill-foreground" : "fill-foreground/60"} />
      );
      currentX = x + 8;
    } else if (seg.type === "circle") {
      elements.push(
        <circle key={`s-${i}`} cx={x + 10} cy={50} r={8} className="fill-none stroke-foreground/50" strokeWidth={1.2} />
      );
      currentX = x + 20;
    } else {
      currentX = x + 3;
      elements.push(
        <path
          key={`s-${i}`}
          d={path}
          className={cn("fill-none stroke-linecap-round", cls)}
          strokeWidth={sw}
          transform={`translate(${x}, 50)`}
        />
      );
    }

    const exit = strokeExit(seg);
    prevExit = { x: x + exit.x, y: 50 + exit.y };
  });

  return <g>{elements}</g>;
}

export function OutlineDisplay({ outline, className, compact }: OutlineDisplayProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const strokes = useMemo(() => parsePitmanOutline(outline), [outline]);
  const hasStrokes = strokes.length > 0;

  const estimatedWidth = useMemo(() => {
    if (!hasStrokes) return 400;
    let w = 10;
    const len = STROKE_LEN;
    strokes.forEach((seg) => {
      if (seg.type === "dot") w += 8;
      else if (seg.type === "circle") w += 20;
      else if (seg.type === "horizontal") w += len + 3;
      else if (seg.type === "curve-up" || seg.type === "curve-down") w += 23;
      else w += 3;
    });
    return Math.max(w + 20, 400);
  }, [strokes, hasStrokes]);

  const totalWidth = estimatedWidth;

  const downloadSVG = useCallback(() => {
    if (!svgRef.current) return;
    const clone = svgRef.current.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(clone);
    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pitman-${outline.replace(/[^a-zA-Z0-9]/g, "-")}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }, [outline]);

  return (
    <div className={cn("relative p-3 rounded-lg border bg-card/40", className)}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium text-muted-foreground">Shorthand Outline</h3>
        {hasStrokes && (
          <button
            onClick={downloadSVG}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title="Download SVG"
          >
            <Download className="w-3.5 h-3.5" />
            SVG
          </button>
        )}
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${totalWidth} 100`}
        className={cn("w-full", compact ? "h-16" : "h-24")}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMid meet"
      >
        {hasStrokes ? (
          <StrokesRenderer strokes={strokes} />
        ) : (
          <text x={totalWidth / 2} y="55" textAnchor="middle" className="fill-muted-foreground text-[11px] font-mono">
            {outline}
          </text>
        )}
      </svg>

      <div className="mt-0.5 text-center text-[10px] text-muted-foreground font-mono tracking-wider">
        {outline}
      </div>

      {hasStrokes && (
        <div className="mt-2 flex flex-wrap gap-1.5 justify-center">
          {strokes.map((s, i) => (
            <span
              key={i}
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono rounded-full border",
                s.heavy
                  ? "border-foreground/30 bg-foreground/5 text-foreground font-bold"
                  : "border-foreground/15 bg-transparent text-muted-foreground"
              )}
            >
              <span className={cn("inline-block w-2.5 rounded-full", s.heavy ? "bg-foreground h-1" : "bg-muted-foreground/50 h-0.5")} />
              {s.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
