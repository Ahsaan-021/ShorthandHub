"use client";

import { useRef, useCallback } from "react";
import { Download } from "lucide-react";
import { OutlineDisplay } from "@/components/dictionary/OutlineDisplay";
import type { SenseGroup } from "@/features/dictionary/pitman-sentence-generator";

interface SentenceResultProps {
  sentence: string;
  senseGroups: SenseGroup[];
  fullOutline: string;
}

export function SentenceResult({ sentence, senseGroups, fullOutline }: SentenceResultProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const downloadAll = useCallback(() => {
    if (!containerRef.current) return;
    const svgs = containerRef.current.querySelectorAll("svg");
    if (svgs.length === 0) return;

    // Combine all SVGs into one
    const totalHeight = senseGroups.length * 100;
    const combined = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    combined.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    combined.setAttribute("viewBox", `0 0 800 ${totalHeight + 40}`);
    combined.setAttribute("width", "800");
    combined.setAttribute("height", String(totalHeight + 40));

    svgs.forEach((svg, i) => {
      const clones = svg.querySelector("g")?.cloneNode(true) as SVGGElement;
      if (clones) {
        clones.setAttribute("transform", `translate(0, ${i * 100})`);
        combined.appendChild(clones);
      }
    });

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(combined);
    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pitman-sentence-${sentence.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 30)}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }, [sentence, senseGroups.length]);

  if (!senseGroups || senseGroups.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center text-muted-foreground">
        <p>No shorthand outline could be generated for this sentence.</p>
        <p className="text-sm mt-1">Try a simpler sentence with common words.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Sentence Outline</h2>
          {senseGroups.length > 1 && (
            <button
              onClick={downloadAll}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              title="Download All Outlines"
            >
              <Download className="w-3.5 h-3.5" />
              Download All
            </button>
          )}
        </div>

        <div className="text-sm text-muted-foreground mb-4 italic">
          &ldquo;{sentence}&rdquo;
        </div>

        <div ref={containerRef} className="space-y-6">
          {senseGroups.map((group, gi) => (
            <div key={gi}>
              {/* Sense group header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  Sense {gi + 1}
                </span>
                <span className="text-sm font-medium">{group.text}</span>
                <span className="text-[10px] text-muted-foreground/60 font-mono">
                  {group.combinedStrokes || "(no strokes)"}
                </span>
              </div>

              {/* Outline */}
              {group.combinedStrokes ? (
                <OutlineDisplay outline={group.combinedStrokes} />
              ) : (
                <div className="p-3 rounded-lg bg-muted/30 border border-dashed text-center text-xs text-muted-foreground">
                  No stroke outline for this sense group
                </div>
              )}

              {/* Word breakdown */}
              <div className="mt-1 flex flex-wrap gap-2 ml-1">
                {group.words.map((w, wi) => (
                  <span
                    key={wi}
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded"
                  >
                    {w.word}
                    {w.strokes && w.strokes !== "—" && (
                      <span className="text-[9px] text-muted-foreground/50">({w.strokes})</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
