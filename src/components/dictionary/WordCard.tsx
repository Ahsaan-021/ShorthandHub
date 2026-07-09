"use client";

import { useState } from "react";
import { Heart, ChevronDown, ChevronUp, Volume2 } from "lucide-react";
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
}: WordCardProps) {
  const [showRule, setShowRule] = useState(false);
  const [showRelated, setShowRelated] = useState(false);

  const relatedList = relatedWords ? relatedWords.split(",").map((w) => w.trim()) : [];

  return (
    <div className={cn("rounded-lg border bg-card overflow-hidden", className)}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{word}</h2>
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
              "p-2 rounded-full transition-colors",
              isFavorited
                ? "text-red-500 hover:text-red-600"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Heart className={cn("w-5 h-5", isFavorited && "fill-current")} />
          </button>
        </div>

        <p className="mt-4 text-muted-foreground">{meaning}</p>

        {outline && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Shorthand Outline</h3>
            <OutlineDisplay outline={outline} />
          </div>
        )}

        {rule && (
          <div className="mt-4">
            <button
              onClick={() => setShowRule(!showRule)}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {showRule ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              Rule Explanation
            </button>
            {showRule && (
              <div className="mt-2 p-3 rounded-md bg-muted text-sm">
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
