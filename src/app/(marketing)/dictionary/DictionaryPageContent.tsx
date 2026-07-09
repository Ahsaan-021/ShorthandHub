"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { WordCard } from "@/components/dictionary/WordCard";
import type { DictionaryEntry } from "@/types";

const COURSE_TABS = [
  { label: "All", value: "" },
  { label: "Pitman", value: "PITMAN" },
  { label: "Gregg", value: "GREGG" },
  { label: "Teeline", value: "TEELINE" },
] as const;

export function DictionaryPageContent() {
  const [query, setQuery] = useState("");
  const [courseType, setCourseType] = useState("");
  const [results, setResults] = useState<DictionaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }
    setLoading(true);
    const params = new URLSearchParams({ q: debouncedQuery });
    if (courseType) params.set("courseType", courseType);
    fetch(`/api/dictionary?${params}`)
      .then((r) => r.json())
      .then(setResults)
      .finally(() => setLoading(false));
  }, [debouncedQuery, courseType]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const displayResults = showFavorites
    ? results.filter((r) => favorites.includes(r.id))
    : results;

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
          Search thousands of words with Pitman, Gregg, and Teeline outlines,
          pronunciations, and rule explanations.
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a word..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Searching...</div>
        ) : !query ? (
          <div className="text-center py-12 text-muted-foreground">
            Start typing to search the dictionary
          </div>
        ) : displayResults.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
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
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No results found for &quot;{query}&quot;
          </div>
        )}
      </motion.div>
    </div>
  );
}
