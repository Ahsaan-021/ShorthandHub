"use client";

import { useState, useRef, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface DictationPlayerProps {
  text: string;
  wordsPerMinute?: number;
  className?: string;
}

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5] as const;

export function DictationPlayer({ text, wordsPerMinute = 60, className }: DictationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [wpm, setWpm] = useState(wordsPerMinute);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const words = text.split(/\s+/);
  const wordDelay = (60000 / (wpm * speed));

  const play = useCallback(() => {
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev >= words.length - 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, wordDelay);
  }, [wordDelay, words.length]);

  const pause = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
    setCurrentWordIndex(0);
  }, []);

  const changeSpeed = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const newDelay = 60000 / (wpm * newSpeed);
      intervalRef.current = setInterval(() => {
        setCurrentWordIndex((prev) => {
          if (prev >= words.length - 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, newDelay);
    }
  }, [isPlaying, wpm, words.length]);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          WPM: {wpm}
        </span>
        <div className="flex items-center gap-1">
          {SPEED_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => changeSpeed(s)}
              className={cn(
                "px-2 py-1 text-xs rounded-md transition-colors",
                speed === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setCurrentWordIndex((i) => Math.max(0, i - 5))}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <SkipBack className="w-5 h-5" />
        </button>
        <button
          onClick={toggle}
          className="p-4 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={() => setCurrentWordIndex((i) => Math.min(words.length - 1, i + 5))}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 rounded-lg border bg-card">
        <div className="flex flex-wrap gap-1 leading-relaxed text-lg">
          {words.map((word, i) => (
            <span
              key={i}
              className={cn(
                "px-0.5 rounded transition-colors duration-150",
                i === currentWordIndex && isPlaying
                  ? "bg-primary/20 text-primary font-semibold"
                  : i < currentWordIndex
                  ? "text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        {currentWordIndex + 1} / {words.length} words
      </div>
    </div>
  );
}
