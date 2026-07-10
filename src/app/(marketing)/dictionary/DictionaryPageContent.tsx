"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Search, X, Keyboard, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { WordCard } from "@/components/dictionary/WordCard";
import { SentenceResult } from "./SentenceResult";
import type { DictionaryEntry } from "@/types";
import type { SentenceOutlineResult } from "@/features/dictionary/pitman-sentence-generator";

const COURSE_TABS = [
  { label: "All", value: "" },
  { label: "Pitman", value: "PITMAN" },
  { label: "Gregg", value: "GREGG" },
  { label: "Teeline", value: "TEELINE" },
] as const;

interface Props {
  initialEntries: DictionaryEntry[];
}

type SearchMode = "word" | "sentence" | "browse";

export function DictionaryPageContent({ initialEntries }: Props) {
  const [query, setQuery] = useState("");
  const [courseType, setCourseType] = useState("");
  const [wordResults, setWordResults] = useState<DictionaryEntry[]>(initialEntries);
  const [sentenceResult, setSentenceResult] = useState<SentenceOutlineResult | null>(null);
  const [searchMode, setSearchMode] = useState<SearchMode>("browse");
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    if (courseType) params.set("courseType", courseType);
    fetch(`/api/dictionary?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.type === "sentence") {
          const { type, ...rest } = data;
          setSentenceResult(rest as SentenceOutlineResult);
          setWordResults([]);
          setSearchMode("sentence");
        } else if (Array.isArray(data)) {
          setWordResults(data);
          setSentenceResult(null);
          setSearchMode(debouncedQuery ? "word" : "browse");
        }
      })
      .finally(() => setLoading(false));
  }, [debouncedQuery, courseType]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const displayResults = showFavorites
    ? wordResults.filter((r) => favorites.includes(r.id))
    : wordResults;

  const isSingleWordLookup = searchMode === "word" && !debouncedQuery.includes(" ");
  const isSingleResult = isSingleWordLookup && displayResults.length === 1;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-4">Shorthand Dictionary</h1>
        <p className="text-muted-foreground">
          Type a word for its Pitman shorthand outline, or type a full sentence to see phrase-connected outlines.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="max-w-2xl mx-auto space-y-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a word or sentence for Pitman shorthand outlines..."
            className="w-full pl-10 pr-20 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-base"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {query && debouncedQuery.includes(" ") && (
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono rounded bg-primary/10 text-primary border border-primary/20">
                <Type className="w-2.5 h-2.5" />
                Sentence
              </span>
            )}
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono rounded border bg-muted text-muted-foreground">
              <Keyboard className="w-2.5 h-2.5" />
              <span>⌘K</span>
            </kbd>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {COURSE_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setCourseType(tab.value)}
                className={cn(
                  "px-3 py-1.5 text-xs rounded-full transition-colors font-medium",
                  courseType === tab.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full transition-colors font-medium",
              showFavorites
                ? "bg-red-500/10 text-red-500"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <Heart className={cn("h-3.5 w-3.5", showFavorites && "fill-current")} />
            Favorites
          </button>
        </div>

        {debouncedQuery && debouncedQuery.includes(" ") && (
          <div className="bg-muted/50 rounded-lg p-3 border text-xs text-muted-foreground">
            <p className="font-medium mb-1">How sentence mode works:</p>
            <p>The sentence is split into <strong>sense groups</strong> (natural Pitman phrases). Each sense group shows its connected stroke outline. Common phrases like &ldquo;I have been&rdquo;, &ldquo;in the&rdquo;, or &ldquo;there is&rdquo; are recognized and joined automatically.</p>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Searching...</div>
        ) : searchMode === "sentence" && sentenceResult ? (
          <SentenceResult
            sentence={sentenceResult.sentence}
            senseGroups={sentenceResult.senseGroups}
            fullOutline={sentenceResult.fullOutline}
          />
        ) : displayResults.length > 0 ? (
          <div className={cn(isSingleResult ? "" : "grid md:grid-cols-2 gap-4")}>
            {displayResults.map((entry) => (
              <WordCard
                key={entry.id}
                word={entry.word}
                pronunciation={entry.pronunciation}
                meaning={entry.meaning}
                outline={entry.outline}
                rule={entry.rule}
                relatedWords={entry.relatedWords}
                isFavorited={favorites.includes(entry.id)}
                onToggleFavorite={() => toggleFavorite(entry.id)}
                isGenerated={entry.isGenerated}
                singleResult={isSingleResult}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground max-w-md mx-auto space-y-2">
            <p className="text-lg">
              {query
                ? `No results for "${query}"`
                : "Type a word or sentence above to see Pitman shorthand outlines"}
            </p>
            {!query && (
              <p className="text-sm text-muted-foreground/70">
                Type any English word to generate its Pitman shorthand stroke sequence, or type a full sentence to see phrase-connected outlines with sense groups.
              </p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
