"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ChevronDown, ChevronUp, Play, BookOpen, Lightbulb, Award } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  theory: string | null;
  rules: string | null;
  difficulty: string;
  courseType: string;
  lessonType: string;
  order: number;
  xpReward: number;
  published: boolean;
  imageUrl: string | null;
  svgStrokes: string | null;
  examples: any;
  category: { id: string; name: string; slug: string } | null;
  exercises: any[];
  quizzes: any[];
}

export function LessonDetailContent({ lesson }: { lesson: Lesson }) {
  const [showTheory, setShowTheory] = useState(true);
  const [showRules, setShowRules] = useState(true);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [quizResults, setQuizResults] = useState<Record<string, "correct" | "wrong" | null>>({});

  const difficultyColor = {
    BEGINNER: "text-green-500 bg-green-500/10",
    INTERMEDIATE: "text-yellow-500 bg-yellow-500/10",
    ADVANCED: "text-red-500 bg-red-500/10",
  }[lesson.difficulty] || "text-muted-foreground bg-muted";

  const toggleExercise = (id: string) => {
    setCompletedExercises((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleExercise = (id: string) => {
    toggleExercise(id);
  };

  const handleQuizAnswer = (quizId: string, selectedIndex: number, correctIndex: string) => {
    setSelectedQuizAnswers((prev) => ({ ...prev, [quizId]: selectedIndex }));
    setQuizResults((prev) => ({
      ...prev,
      [quizId]: selectedIndex === Number(correctIndex) ? "correct" : "wrong",
    }));
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          href="/courses/pitman"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Course
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className={cn("px-2.5 py-0.5 text-xs font-medium rounded-full", difficultyColor)}>
            {lesson.difficulty}
          </span>
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
            {lesson.lessonType}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Award className="h-3.5 w-3.5" /> {lesson.xpReward} XP
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>
        <p className="text-lg text-muted-foreground">{lesson.description}</p>
      </motion.div>

      {lesson.theory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-xl border bg-card overflow-hidden"
        >
          <button
            onClick={() => setShowTheory(!showTheory)}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Theory</h2>
            </div>
            {showTheory ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          {showTheory && (
            <div className="p-4 pt-0 border-t">
              <div className="prose prose-sm dark:prose-invert max-w-none mt-4">
                {lesson.theory.split('\n').map((line, i) => (
                  <p key={i} className="mb-2">{line}</p>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {lesson.rules && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="rounded-xl border bg-card overflow-hidden"
        >
          <button
            onClick={() => setShowRules(!showRules)}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <h2 className="text-lg font-semibold">Key Rules</h2>
            </div>
            {showRules ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          {showRules && (
            <div className="p-4 pt-0 border-t">
              <ul className="mt-4 space-y-2">
                {lesson.rules.split('\n').filter(Boolean).map((rule, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {rule.replace(/^\d+\.\s*/, '')}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {lesson.content && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-xl border bg-card p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Lesson Content</h2>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {lesson.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h3 key={i} className="text-base font-semibold mt-4 mb-2">{line.replace('## ', '')}</h3>;
              }
              if (line.startsWith('**')) {
                return <h4 key={i} className="font-medium mt-3 mb-1">{line.replace(/\*\*/g, '')}</h4>;
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="text-sm ml-4">{line.replace('- ', '')}</li>;
              }
              if (line.trim() === '') return <div key={i} className="h-2" />;
              return <p key={i} className="text-sm mb-2">{line}</p>;
            })}
          </div>
        </motion.div>
      )}

      {lesson.exercises.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="rounded-xl border bg-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Play className="h-5 w-5 text-green-500" />
            <h2 className="text-lg font-semibold">Exercises</h2>
            <span className="text-xs text-muted-foreground">
              {completedExercises.length}/{lesson.exercises.length} completed
            </span>
          </div>
          <div className="space-y-3">
            {lesson.exercises.map((ex: any) => (
              <div
                key={ex.id}
                className={cn(
                  "p-4 rounded-lg border transition-colors cursor-pointer",
                  completedExercises.includes(ex.id)
                    ? "border-green-500/30 bg-green-500/5"
                    : "hover:bg-muted/30"
                )}
                onClick={() => handleExercise(ex.id)}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle
                    className={cn(
                      "h-5 w-5 mt-0.5 shrink-0 transition-colors",
                      completedExercises.includes(ex.id)
                        ? "text-green-500 fill-green-500/20"
                        : "text-muted-foreground"
                    )}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{ex.question}</p>
                    {completedExercises.includes(ex.id) && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        <span className="text-green-500 font-medium">Answer:</span> {ex.answer}
                      </p>
                    )}
                    {ex.hint && !completedExercises.includes(ex.id) && (
                      <p className="mt-1 text-xs text-muted-foreground italic">Hint: {ex.hint}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {lesson.quizzes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-xl border bg-card p-6"
        >
          <h2 className="text-lg font-semibold mb-6">Quick Quiz</h2>
          <div className="space-y-6">
            {lesson.quizzes.map((q: any) => {
              const options = typeof q.options === "string" ? JSON.parse(q.options) : q.options;
              const selected = selectedQuizAnswers[q.id];
              const result = quizResults[q.id];
              return (
                <div key={q.id}>
                  <p className="font-medium mb-3">{q.question}</p>
                  <div className="space-y-2">
                    {options.map((opt: string, idx: number) => {
                      const isCorrect = result === "correct" && selected === idx;
                      const isWrong = result === "wrong" && selected === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleQuizAnswer(q.id, idx, q.correct)}
                          disabled={result !== null}
                          className={cn(
                            "w-full text-left p-3 rounded-lg border text-sm transition-colors",
                            isCorrect && "border-green-500 bg-green-500/10 text-green-700 dark:text-green-300",
                            isWrong && "border-red-500 bg-red-500/10 text-red-700 dark:text-red-300",
                            !result && "hover:border-primary hover:bg-muted/30",
                            selected === idx && !result && "border-primary bg-primary/5"
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {result === "correct" && (
                    <p className="mt-2 text-xs text-green-500 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Correct!
                    </p>
                  )}
                  {result === "wrong" && (
                    <p className="mt-2 text-xs text-red-500">
                      Incorrect. Correct answer: <span className="font-medium">{options[Number(q.correct)]}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex justify-center pt-4"
      >
        <Link href="/courses/pitman">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Course Overview
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}