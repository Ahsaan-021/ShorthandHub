"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchResult {
  id: string;
  word: string;
  pronunciation: string | null;
  meaning: string;
}

interface SearchBarProps {
  onSearch?: (query: string, courseType?: string) => Promise<SearchResult[]>;
  onSelect?: (word: SearchResult) => void;
  className?: string;
}

const COURSE_TABS = [
  { label: "All", value: "" },
  { label: "Pitman", value: "PITMAN" },
  { label: "Gregg", value: "GREGG" },
  { label: "Teeline", value: "TEELINE" },
] as const;

export function SearchBar({ onSearch, onSelect, className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [courseType, setCourseType] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery || !onSearch) {
      setResults([]);
      return;
    }

    setLoading(true);
    onSearch(debouncedQuery, courseType || undefined)
      .then(setResults)
      .finally(() => setLoading(false));
  }, [debouncedQuery, courseType, onSearch]);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      onSelect?.(result);
      setShowResults(false);
      setQuery("");
    },
    [onSelect]
  );

  return (
    <div className={cn("relative", className)}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder="Search dictionary..."
            className="w-full pl-10 pr-8 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-secondary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-1 mt-2">
        {COURSE_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setCourseType(tab.value)}
            className={cn(
              "px-3 py-1 text-xs rounded-full transition-colors",
              courseType === tab.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {showResults && (query || loading) && (
        <div className="absolute z-50 w-full mt-1 rounded-lg border bg-popover shadow-lg max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="px-4 py-3 hover:bg-accent cursor-pointer transition-colors border-b last:border-b-0"
                >
                  <div className="font-medium">{result.word}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {result.pronunciation && <span className="italic mr-2">{result.pronunciation}</span>}
                    {result.meaning}
                  </div>
                </li>
              ))}
            </ul>
          ) : debouncedQuery ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No results found
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
