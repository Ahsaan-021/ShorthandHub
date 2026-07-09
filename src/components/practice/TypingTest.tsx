"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TypingTestProps {
  text: string;
  onComplete?: (result: { wpm: number; accuracy: number; mistakes: number; duration: number }) => void;
  className?: string;
}

export function TypingTest({ text, onComplete, className }: TypingTestProps) {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const words = text.split(" ");
  const inputWords = input.split(/\s+/);
  const elapsed = startTime && !endTime ? (Date.now() - startTime) / 1000 : 0;

  const currentWPM = elapsed > 0
    ? Math.round((inputWords.filter((w) => w.length > 0).length / elapsed) * 60)
    : 0;

  const correctChars = input.split("").filter((char, i) => char === text[i]).length;
  const totalChars = input.length;
  const currentAccuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;

      if (!startTime && value.length > 0) {
        setStartTime(Date.now());
      }

      if (value.length >= text.length) {
        setIsComplete(true);
        const end = Date.now();
        setEndTime(end);
        const duration = (end - (startTime ?? end)) / 1000;
        const typedWords = value.split(/\s+/).filter((w) => w.length > 0).length;
        const wpm = Math.round((typedWords / duration) * 60);
        const chars = value.split("");
        const correct = chars.filter((c, i) => c === text[i]).length;
        const accuracy = Math.round((correct / value.length) * 100);
        const mistakes = value.length - correct;
        onComplete?.({ wpm, accuracy, mistakes, duration: Math.round(duration) });
        return;
      }

      setInput(value);
    },
    [text, startTime, onComplete]
  );

  useEffect(() => {
    if (inputRef.current && !isComplete) {
      inputRef.current.focus();
    }
  }, [isComplete]);

  if (isComplete) {
    const duration = (endTime! - (startTime ?? endTime!)) / 1000;
    const typedWords = input.split(/\s+/).filter((w) => w.length > 0).length;
    const finalWPM = Math.round((typedWords / duration) * 60);
    const chars = input.split("");
    const correct = chars.filter((c, i) => c === text[i]).length;
    const finalAccuracy = Math.round((correct / input.length) * 100);

    return (
      <div className={cn("space-y-4 p-6 rounded-lg border bg-card", className)}>
        <h3 className="text-xl font-bold">Results</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-primary/10">
            <div className="text-2xl font-bold text-primary">{finalWPM}</div>
            <div className="text-sm text-muted-foreground">WPM</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-green-500/10">
            <div className="text-2xl font-bold text-green-500">{finalAccuracy}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-destructive/10">
            <div className="text-2xl font-bold text-destructive">{input.length - correct}</div>
            <div className="text-sm text-muted-foreground">Mistakes</div>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Duration: {Math.round(duration)}s
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="text-lg font-mono tabular-nums">
          WPM: <span className="font-bold">{currentWPM}</span>
        </div>
        <div className="text-lg font-mono tabular-nums">
          Accuracy: <span className={cn("font-bold", currentAccuracy >= 90 ? "text-green-500" : currentAccuracy >= 70 ? "text-yellow-500" : "text-red-500")}>{currentAccuracy}%</span>
        </div>
      </div>

      <div className="p-4 rounded-lg border bg-card text-lg leading-relaxed font-mono">
        {text.split("").map((char, i) => {
          const typed = input[i];
          let className = "text-muted-foreground";
          if (typed === undefined) className = "text-foreground";
          else if (typed === char) className = "text-green-500";
          else className = "text-destructive bg-destructive/10";
          return (
            <span key={i} className={cn(className, "transition-colors")}>
              {char}
            </span>
          );
        })}
      </div>

      <textarea
        ref={inputRef}
        value={input}
        onChange={handleChange}
        placeholder="Start typing here..."
        className="w-full h-24 p-3 rounded-lg border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary font-mono"
      />
    </div>
  );
}
