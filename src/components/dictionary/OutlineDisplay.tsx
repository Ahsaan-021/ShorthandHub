"use client";

import { useMemo, useCallback } from "react";
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
  const displayText = text || outline || "";
  const strokeSequence = outline || "";

  const svgDataUrl = useMemo(() => {
    if (!strokeSequence) return null;
    const result = renderPitmanOutline({ strokeOutline: strokeSequence, scale: compact ? 0.6 : 1 });
    if (!result.svg) return null;
    return svgToDataUrl(result.svg);
  }, [strokeSequence, compact]);

  const downloadSvg = useCallback(() => {
    if (!svgDataUrl) return;
    const a = document.createElement("a");
    a.href = svgDataUrl;
    a.download = `pitman-${displayText.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 30)}.svg`;
    a.click();
  }, [svgDataUrl, displayText]);

  return (
    <div className={cn("relative p-3 rounded-lg border bg-card/40", className)}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium text-muted-foreground">Pitman Shorthand</h3>
        {svgDataUrl && (
          <button
            onClick={downloadSvg}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title="Download SVG"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        )}
      </div>

      <div className={cn("flex items-center justify-center", compact ? "min-h-[40px]" : "min-h-[80px]")}>
        {svgDataUrl ? (
          <img
            src={svgDataUrl}
            alt={`Pitman shorthand: ${displayText}`}
            className="max-w-full h-auto"
          />
        ) : (
          <span className="text-xs text-muted-foreground">
            {displayText ? "No outline generated" : "Enter text to see Pitman shorthand"}
          </span>
        )}
      </div>

      <div className="mt-1 text-center text-[10px] text-muted-foreground font-mono tracking-wider">
        {displayText}
      </div>

      {outline && (
        <div className="mt-1 text-center text-[9px] text-muted-foreground/50 font-mono">
          Strokes: {outline}
        </div>
      )}
    </div>
  );
}
