"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Clock, Headphones, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PracticeTimer } from "@/components/practice/PracticeTimer";
import { DictationPlayer } from "@/components/practice/DictationPlayer";

const sampleDictationText = "The quick brown fox jumps over the lazy dog. She sells seashells by the seashore. How much wood would a woodchuck chuck if a woodchuck could chuck wood.";

const practiceModes = [
  { id: "timed", label: "Timed", icon: Clock },
  { id: "dictation", label: "Dictation", icon: Headphones },
  { id: "daily", label: "Daily Challenge", icon: Zap },
];

interface DashboardPracticeContentProps {
  sessions: any[];
}

export function DashboardPracticeContent({ sessions }: DashboardPracticeContentProps) {
  const [activeMode, setActiveMode] = useState<string | null>(null);

  const handleTimerComplete = useCallback((duration: number) => {
    console.log("Session completed:", duration);
  }, []);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Practice</h1>
        <p className="text-muted-foreground">
          Train your shorthand skills with timed exercises, dictation, and challenges.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex gap-2"
      >
        {practiceModes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(isActive ? null : mode.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              <Icon className="h-4 w-4" />
              {mode.label}
            </button>
          );
        })}
      </motion.div>

      {activeMode === "timed" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border bg-card p-8 flex justify-center"
        >
          <PracticeTimer onComplete={handleTimerComplete} />
        </motion.div>
      )}

      {activeMode === "dictation" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border bg-card p-8"
        >
          <DictationPlayer text={sampleDictationText} wordsPerMinute={60} />
        </motion.div>
      )}

      {activeMode === "daily" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border bg-card p-12 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Daily Challenge</h2>
          <p className="text-muted-foreground mb-6">
            Complete today&apos;s challenge to earn bonus XP.
          </p>
          <div className="text-4xl font-bold gradient-text">Ready</div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">Session History</h2>
        {sessions.length > 0 ? (
          <div className="rounded-xl border bg-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Duration</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">WPM</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Accuracy</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s: any) => (
                  <tr key={s.id} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium">{s.type}</td>
                    <td className="px-4 py-3 text-sm">{s.duration}s</td>
                    <td className="px-4 py-3 text-sm">{s.wpm ?? "-"}</td>
                    <td className="px-4 py-3 text-sm">{s.accuracy ? `${Math.round(s.accuracy)}%` : "-"}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
            No practice sessions yet. Start a practice above!
          </div>
        )}
      </motion.div>
    </div>
  );
}
