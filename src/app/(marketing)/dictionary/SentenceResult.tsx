"use client";

import { OutlineDisplay } from "@/components/dictionary/OutlineDisplay";
import type { SenseGroup } from "@/features/dictionary/pitman-sentence-generator";

interface SentenceResultProps {
  sentence: string;
  senseGroups: SenseGroup[];
  fullOutline: string;
}

export function SentenceResult({ sentence, senseGroups, fullOutline }: SentenceResultProps) {
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
        <div className="mb-4">
          <h2 className="font-semibold text-lg">Connected Pitman Outline</h2>
          <p className="text-sm text-muted-foreground italic mt-1">
            &ldquo;{sentence}&rdquo;
          </p>
        </div>

        {fullOutline ? (
          <OutlineDisplay outline={fullOutline} />
        ) : (
          <div className="p-4 rounded-lg bg-muted/30 border border-dashed text-center text-sm text-muted-foreground">
            No stroke outline for this input
          </div>
        )}
      </div>

      {senseGroups.length > 1 && (
        <div className="rounded-lg border bg-card/50 p-4">
          <h3 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
            Sense Group Breakdown
          </h3>
          <div className="space-y-2">
            {senseGroups.map((group, gi) => (
              <div key={gi} className="flex items-start gap-2 text-sm">
                <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded mt-0.5 shrink-0">
                  {gi + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-medium">{group.text}</span>
                  {group.combinedStrokes && (
                    <span className="ml-2 text-[10px] font-mono text-muted-foreground/60">
                      {group.combinedStrokes}
                    </span>
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-0.5">
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
