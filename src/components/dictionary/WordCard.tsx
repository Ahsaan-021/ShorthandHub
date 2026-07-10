"use client";

import { useState } from "react";
import { Heart, ChevronDown, ChevronUp, Volume2, Sparkles, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { OutlineDisplay } from "./OutlineDisplay";

interface WordCardProps {
  word: string;
  pronunciation?: string | null;
  meaning: string;
  outline?: string | null;
  rule?: string | null;
  relatedWords?: string | null;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
  className?: string;
  isGenerated?: boolean;
  singleResult?: boolean;
}

export function WordCard({
  word,
  pronunciation,
  meaning,
  outline,
  rule,
  relatedWords,
  isFavorited = false,
  onToggleFavorite,
  className,
  isGenerated,
  singleResult,
}: WordCardProps) {
  const [showRule, setShowRule] = useState(!!isGenerated);
  const [showRelated, setShowRelated] = useState(false);

  const relatedList = relatedWords ? relatedWords.split(",").map((w) => w.trim()) : [];

  return (
    <div className={cn(
      "rounded-lg border bg-card overflow-hidden",
      singleResult && "max-w-2xl mx-auto",
      className
    )}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className={cn("font-bold", singleResult ? "text-3xl" : "text-2xl")}>{word}</h2>
              {isGenerated && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="w-3 h-3" />
                  Generated
                </span>
              )}
              {singleResult && !isGenerated && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                  <BookOpen className="w-3 h-3" />
                  Dictionary Entry
                </span>
              )}
            </div>
            {pronunciation && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Volume2 className="w-4 h-4" />
                <span className="italic">{pronunciation}</span>
              </div>
            )}
          </div>
          <button
            onClick={onToggleFavorite}
            className={cn(
              "p-2 rounded-full transition-colors shrink-0",
              isFavorited
                ? "text-red-500 hover:text-red-600"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Heart className={cn("w-5 h-5", isFavorited && "fill-current")} />
          </button>
        </div>

        <p className="mt-4 text-muted-foreground">{meaning}</p>

        {outline && outline !== "—" && (
          <div className="mt-6">
            <OutlineDisplay outline={outline} text={word} />
          </div>
        )}

        {(!outline || outline === "—") && (
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-dashed text-center">
            <p className="text-sm text-muted-foreground">
              No stroke outline available for this word. Try a different word or check the lessons for stroke patterns.
            </p>
          </div>
        )}

        {rule && (
          <div className="mt-4">
            <button
              onClick={() => setShowRule(!showRule)}
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors",
                showRule ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {showRule ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              Rule Explanation
            </button>
            {showRule && (
              <div className="mt-2 p-4 rounded-md bg-muted/70 text-sm whitespace-pre-line leading-relaxed border border-muted">
                {rule}
              </div>
            )}
          </div>
        )}

        {relatedList.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setShowRelated(!showRelated)}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {showRelated ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              Related Words ({relatedList.length})
            </button>
            {showRelated && (
              <div className="mt-2 flex flex-wrap gap-2">
                {relatedList.map((w) => (
                  <span
                    key={w}
                    className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                  >
                    {w}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
