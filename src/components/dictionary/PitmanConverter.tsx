"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { SentenceResult } from "@/app/(marketing)/dictionary/SentenceResult";
import { OutlineDisplay } from "./OutlineDisplay";
import type { SentenceOutlineResult } from "@/features/dictionary/pitman-sentence-generator";
import type { DictionaryEntry } from "@/types";

export function PitmanConverter() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ type: "sentence"; data: SentenceOutlineResult } | { type: "word"; data: DictionaryEntry } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    const text = input.trim();
    if (!text) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/dictionary?q=${encodeURIComponent(text)}`);
      const data = await res.json();
      if (data && data.type === "sentence") {
        const { type, ...rest } = data;
        setResult({ type: "sentence", data: rest as SentenceOutlineResult });
      } else if (Array.isArray(data) && data.length > 0) {
        setResult({ type: "word", data: data[0] as DictionaryEntry });
      } else {
        setError("Could not generate outlines. Try different wording.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a word, sentence, or paragraph here..."
          className="flex-1 min-h-[80px] p-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-y"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleConvert();
            }
          }}
        />
        <button
          onClick={handleConvert}
          disabled={loading || !input.trim()}
          className="self-end px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {result?.type === "sentence" && (
        <SentenceResult
          sentence={result.data.sentence}
          senseGroups={result.data.senseGroups}
          fullOutline={result.data.fullOutline}
        />
      )}

      {result?.type === "word" && result.data.outline && (
        <OutlineDisplay outline={result.data.outline} />
      )}
    </div>
  );
}
