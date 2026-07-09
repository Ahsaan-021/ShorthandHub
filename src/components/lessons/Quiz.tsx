"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Zap, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

type QuizQuestion = {
  id: string
  question: string
  options: string[]
  correct: number
}

type QuizProps = {
  questions: QuizQuestion[]
  onComplete?: (score: number, total: number) => void
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null))
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[current]
  const isCorrect = selected === question.correct

  const handleSubmit = () => {
    if (selected === null || submitted) return
    setSubmitted(true)
    const correct = selected === question.correct
    if (correct) setScore((s) => s + 1)
    setAnswers((prev) => {
      const next = [...prev]
      next[current] = selected
      return next
    })
  }

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1)
      setSelected(null)
      setSubmitted(false)
    } else {
      setFinished(true)
      onComplete?.(score + (isCorrect ? 1 : 0), questions.length)
    }
  }

  const handleRetry = () => {
    setCurrent(0)
    setSelected(null)
    setSubmitted(false)
    setAnswers(questions.map(() => null))
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    const xpEarned = score * 20

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-xl p-8 text-center"
      >
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          {pct >= 70 ? (
            <Check className="h-8 w-8 text-green-500" />
          ) : (
            <X className="h-8 w-8 text-red-500" />
          )}
        </div>

        <h3 className="text-2xl font-bold">Quiz Complete!</h3>
        <p className="mt-2 text-muted-foreground">
          You scored {score} out of {questions.length} ({pct}%)
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-lg font-semibold text-primary">
          <Zap className="h-5 w-5" />
          +{xpEarned} XP
        </div>

        <Button onClick={handleRetry} variant="outline" className="mt-6">
          <RotateCcw className="mr-2 h-4 w-4" />
          Retry Quiz
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="glass rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Question {current + 1} of {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 w-6 rounded-full transition-colors",
                i < current
                  ? answers[i] === questions[i].correct
                    ? "bg-green-500"
                    : "bg-red-500"
                  : i === current
                    ? "bg-primary"
                    : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
        >
          <h4 className="text-lg font-medium">{question.question}</h4>

          <RadioGroup
            value={selected?.toString() ?? ""}
            onValueChange={(val) => {
              if (!submitted) setSelected(Number(val))
            }}
            className="mt-4"
          >
            {question.options.map((option, i) => (
              <label
                key={i}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors",
                  submitted && i === question.correct && "border-green-500 bg-green-500/10",
                  submitted && i === selected && i !== question.correct && "border-red-500 bg-red-500/10",
                  !submitted && "hover:bg-muted"
                )}
              >
                <RadioGroupItem value={i.toString()} disabled={submitted} />
                {option}
              </label>
            ))}
          </RadioGroup>

          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "mt-4 rounded-lg p-3 text-sm font-medium",
                  isCorrect ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                )}
              >
                {isCorrect ? "Correct!" : `Incorrect. The answer was: ${question.options[question.correct]}`}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          disabled={selected === null || submitted}
          className="flex-1"
        >
          {submitted ? "Submitted" : "Submit Answer"}
        </Button>
        {submitted && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <Button onClick={handleNext} variant="outline" className="flex-1">
              {current < questions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
