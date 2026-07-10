"use client";

import { useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { renderPitmanOutline, svgToDataUrl } from "@/features/dictionary/pitman-renderer";

interface OutlineDisplayProps {
  outline?: string;
  text?: string;
  className?: string;
  compact?: boolean;
}

export function OutlineDisplay({ outline, text, className, compact }: OutlineDisplayProps) {
  const strokeSequence = outline || "";

  const svgDataUrl = useMemo(() => {
    if (!strokeSequence) return null;
    const result = renderPitmanOutline({ strokeOutline: strokeSequence, scale: compact ? 0.6 : 1 });
    if (!result.svg) return null;
    return svgToDataUrl(result.svg);
  }, [strokeSequence, compact]);

  const downloadImage = useCallback(() => {
    if (!svgDataUrl) return;
    const a = document.createElement("a");
    a.href = svgDataUrl;
    a.download = `pitman-${strokeSequence.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 30)}.svg`;
    a.click();
  }, [svgDataUrl, strokeSequence]);

  return (
    <div className={cn("relative p-3 rounded-lg border bg-card/40", className)}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium text-muted-foreground">Pitman Shorthand</h3>
        {svgDataUrl && (
          <button
            onClick={downloadImage}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title="Download SVG"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        )}
      </div>

      <div className={cn("flex items-center justify-center", compact ? "min-h-[40px]" : "min-h-[80px]")}>
        {svgDataUrl && (
          <img src={svgDataUrl} alt={`Pitman: ${text || strokeSequence}`} className="max-w-full h-auto" />
        )}

        {!svgDataUrl && strokeSequence && (
          <span className="text-xs text-muted-foreground font-mono">{strokeSequence}</span>
        )}

        {!svgDataUrl && !strokeSequence && (
          <span className="text-xs text-muted-foreground">Enter text to see Pitman shorthand</span>
        )}
      </div>

      <div className="mt-1 text-center text-[10px] text-muted-foreground font-mono tracking-wider">
        {text || strokeSequence}
      </div>

      {outline && (
        <div className="mt-1 text-center text-[9px] text-muted-foreground/50 font-mono">
          Strokes: {outline}
        </div>
      )}
    </div>
  );
}
