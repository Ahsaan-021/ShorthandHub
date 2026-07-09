"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Lightbulb, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type ExerciseData = {
  id: string
  question: string
  answer: string
  hint: string | null
  order: number
}

type ExerciseProps = {
  exercise: ExerciseData
  onComplete?: (exerciseId: string) => void
}

export function Exercise({ exercise, onComplete }: ExerciseProps) {
  const [userAnswer, setUserAnswer] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const normalize = (s: string) => s.toLowerCase().trim().replace(/\s+/g, " ")
  const isCorrect = normalize(userAnswer) === normalize(exercise.answer)

  const handleCheck = () => {
    if (!userAnswer.trim() || submitted) return
    setSubmitted(true)
  }

  const handleContinue = () => {
    onComplete?.(exercise.id)
    setUserAnswer("")
    setSubmitted(false)
    setShowHint(false)
    setShowAnswer(false)
  }

  return (
    <div className="glass rounded-xl p-6 space-y-5">
      <h4 className="text-lg font-medium">{exercise.question}</h4>

      <div className="space-y-3">
        <Input
          placeholder="Type your answer here..."
          value={userAnswer}
          onChange={(e) => {
            if (!submitted) setUserAnswer(e.target.value)
          }}
          disabled={submitted}
        />

        <div className="flex flex-wrap gap-2">
          {exercise.hint && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHint(!showHint)}
            >
              {showHint ? <EyeOff className="mr-1 h-4 w-4" /> : <Lightbulb className="mr-1 h-4 w-4" />}
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? <EyeOff className="mr-1 h-4 w-4" /> : <Eye className="mr-1 h-4 w-4" />}
            {showAnswer ? "Hide Answer" : "Reveal Answer"}
          </Button>
        </div>

        <AnimatePresence>
          {showHint && exercise.hint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                <Lightbulb className="mr-1 inline h-4 w-4 text-yellow-500" />
                {exercise.hint}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <p className="rounded-lg border border-dashed p-3 text-sm">
                <span className="font-medium">Answer:</span> {exercise.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!submitted ? (
        <Button onClick={handleCheck} disabled={!userAnswer.trim()} className="w-full">
          Check Answer
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div
            className={cn(
              "rounded-lg p-4 text-center text-sm font-medium",
              isCorrect
                ? "bg-green-500/10 text-green-600"
                : "bg-red-500/10 text-red-600"
            )}
          >
            <div className="mb-2 flex justify-center">
              {isCorrect ? (
                <Check className="h-6 w-6" />
              ) : (
                <X className="h-6 w-6" />
              )}
            </div>
            {isCorrect
              ? "Great job! That's correct."
              : `Not quite. The correct answer is: ${exercise.answer}`}
          </div>

          <Button onClick={handleContinue} variant="outline" className="w-full">
            Continue
          </Button>
        </motion.div>
      )}
    </div>
  )
}
