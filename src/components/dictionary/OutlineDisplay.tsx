"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Download, Loader2 } from "lucide-react";

interface OutlineDisplayProps {
  outline?: string;
  text?: string;
  className?: string;
  compact?: boolean;
}

export function OutlineDisplay({ outline, text, className, compact }: OutlineDisplayProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const displayText = text || outline || "";

  useEffect(() => {
    if (!displayText.trim()) return;

    setLoading(true);
    setError(false);
    setImgSrc(null);

    const controller = new AbortController();

    fetch(`/api/pitman-image?text=${encodeURIComponent(displayText.trim())}`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.blob();
      })
      .then((blob) => {
        setImgSrc(URL.createObjectURL(blob));
        setLoading(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setError(true);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [displayText]);

  const downloadImage = useCallback(() => {
    if (!imgSrc) return;
    const a = document.createElement("a");
    a.href = imgSrc;
    a.download = `pitman-${displayText.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 30)}.gif`;
    a.click();
  }, [imgSrc, displayText]);

  return (
    <div className={cn("relative p-3 rounded-lg border bg-card/40", className)}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium text-muted-foreground">Pitman Shorthand</h3>
        {imgSrc && (
          <button
            onClick={downloadImage}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title="Download GIF"
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

        {error && displayText && (
          <span className="text-xs text-muted-foreground font-mono">
            {outline || displayText}
          </span>
        )}

        {imgSrc && (
          <img
            ref={imgRef}
            src={imgSrc}
            alt={`Pitman shorthand for: ${displayText}`}
            className="max-w-full h-auto"
            style={{ imageRendering: "pixelated" }}
          />
        )}

        {!loading && !error && !imgSrc && !displayText && (
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
