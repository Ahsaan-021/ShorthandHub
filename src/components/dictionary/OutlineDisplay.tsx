"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Download, Loader2 } from "lucide-react";
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

  // API-based rendering (primary)
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    if (!displayText.trim()) { setLoading(false); return; }

    setLoading(true);
    setApiError(false);
    setImgSrc(null);

    const ac = new AbortController();

    fetch(`/api/pitman-image?text=${encodeURIComponent(displayText.trim())}`, { signal: ac.signal })
      .then((r) => { if (!r.ok) throw new Error(); return r.blob(); })
      .then((blob) => { setImgSrc(URL.createObjectURL(blob)); setLoading(false); })
      .catch((e) => { if (e.name !== "AbortError") { setApiError(true); setLoading(false); } });

    return () => ac.abort();
  }, [displayText]);

  // SVG fallback (self-contained)
  const svgDataUrl = useMemo(() => {
    if (!apiError || !strokeSequence) return null;
    const result = renderPitmanOutline({ strokeOutline: strokeSequence, scale: compact ? 0.6 : 1 });
    if (!result.svg) return null;
    return svgToDataUrl(result.svg);
  }, [apiError, strokeSequence, compact]);

  const downloadImage = useCallback(() => {
    const src = imgSrc || svgDataUrl;
    if (!src) return;
    const a = document.createElement("a");
    a.href = src;
    const ext = imgSrc ? "gif" : "svg";
    a.download = `pitman-${displayText.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 30)}.${ext}`;
    a.click();
  }, [imgSrc, svgDataUrl, displayText]);

  const hasContent = imgSrc || svgDataUrl;

  return (
    <div className={cn("relative p-3 rounded-lg border bg-card/40", className)}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium text-muted-foreground">Pitman Shorthand</h3>
        {hasContent && (
          <button
            onClick={downloadImage}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title={`Download ${imgSrc ? "GIF" : "SVG"}`}
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        )}
      </div>

      <div className={cn("flex items-center justify-center", compact ? "min-h-[40px]" : "min-h-[80px]")}>
        {loading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Rendering...
          </div>
        )}

        {imgSrc && (
          <img src={imgSrc} alt={`Pitman: ${displayText}`} className="max-w-full h-auto" style={{ imageRendering: "pixelated" }} />
        )}

        {!imgSrc && svgDataUrl && (
          <img src={svgDataUrl} alt={`Pitman: ${displayText}`} className="max-w-full h-auto" />
        )}

        {!loading && !hasContent && displayText && (
          <span className="text-xs text-muted-foreground font-mono">{outline || displayText}</span>
        )}

        {!loading && !hasContent && !displayText && (
          <span className="text-xs text-muted-foreground">Enter text to see Pitman shorthand</span>
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
