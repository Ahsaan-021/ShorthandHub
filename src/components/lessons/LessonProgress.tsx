"use client"

import { motion } from "framer-motion"
import { Check, Zap, Circle } from "lucide-react"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type LessonProgressEntry = {
  lesson: { id: string; title: string }
  completed: boolean
  accuracy: number | null
}

type LessonProgressProps = {
  lessons: { id: string; title: string }[]
  progress: LessonProgressEntry[]
  totalXP: number
}

export function LessonProgress({ lessons, progress, totalXP }: LessonProgressProps) {
  const progressMap = new Map(progress.map((p) => [p.lesson.id, p]))
  const completedCount = progress.filter((p) => p.completed).length
  const totalCount = lessons.length
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="glass rounded-xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Course Progress</h3>
        <span className="flex items-center gap-1 text-sm font-medium text-primary">
          <Zap className="h-4 w-4" />
          {totalXP} XP
        </span>
      </div>

      <Progress value={percent}>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
        <span className="ml-auto text-sm text-muted-foreground tabular-nums">{percent}%</span>
      </Progress>

      <div className="flex items-center justify-between gap-1">
        {lessons.map((lesson, index) => {
          const entry = progressMap.get(lesson.id)
          const isCompleted = entry?.completed ?? false
          const isCurrent = !isCompleted && (index === 0 || progressMap.get(lessons[index - 1]?.id ?? "")?.completed)

          return (
            <div key={lesson.id} className="flex flex-col items-center gap-1.5">
              <motion.div
                initial={false}
                animate={{ scale: isCompleted ? 1 : isCurrent ? 1.15 : 1 }}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium transition-colors",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                      ? "border-primary text-primary"
                      : "border-muted-foreground/30 text-muted-foreground/50"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Circle className="h-2.5 w-2.5" />
                )}
              </motion.div>
              <span className="hidden text-[10px] text-muted-foreground sm:block truncate max-w-16 text-center leading-tight">
                {lesson.title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
